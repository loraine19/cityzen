import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Option, Select, Card, CardBody, CardHeader, Chip, Textarea, Typography } from '@material-tailwind/react';
import NavBarTop from '../../../components/UIX/NavBarTop';
import SubHeader from '../../../components/UIX/SubHeader';
import ServiceIssueCard from '../../../components/servicesComps/ServiceIssueCard';
import CTAMines from '../../../components/UIX/CTAMines';
import UserContext from '../../../contexts/user.context';
import { Issue, Profile, Service, ServiceType } from '../../../types/class';
import { deleteIssue, getIssueById } from '../../../functions/API/issuesAPI';
import { GenereMyActions } from '../../../functions/GetDataFunctions';
import { getProfiles } from '../../../functions/API/profilesApi';
import Skeleton from 'react-loading-skeleton';

export default function IssueDetailPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const [service, setService] = useState<Service>({} as Service)
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [issue, setIssue] = useState<Issue>({} as Issue);
    const [modos, setModos] = useState<Profile[]>([])
    const MyActions = GenereMyActions(issue, "probleme", deleteIssue, undefined)

    const haveImage = issue.image ? true : false
    const fetch = async () => {
        setLoading(true);
        const idS = id ? parseInt(id) : 0;
        const issue = await getIssueById(idS);
        const modos = await getProfiles()
        console.log('issue', issue)
        setIssue(issue);
        setService(issue.Service);
        issue && setLoading(false)
        setModos(modos)
        console.log('modi', issue.UserModo2.Profile.firstName)
    };

    useEffect(() => { fetch() }, []);
    const { createdAt, description, image } = issue
    const { title } = service
    const [open, setOpen] = useState(false);

    return (

        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={"probleme"} place={` sur ${issue.Service?.type === ServiceType.GET ? "une demande" : "une offre"} de service  ${user.id === service.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`} closeBtn />
            </header>
            <main className={`flex flex-1 pb-2 ' ${haveImage && "pt-[1.5rem]"}`}>
                {loading ? <Skeleton className="w-respLarge" /> : <Card className=" w-respLarge FixCard">
                    <CardHeader className={"FixCardHeaderNoImage  justify-between shadow-none flex "}
                        floated={false}>
                        <Typography variant="lead" color="blue-gray" >
                            description du problème
                        </Typography>
                        <Chip value={(new Date(createdAt ? createdAt : new Date())).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                    </CardHeader>
                    <CardBody className='FixCardBody '>
                        <div className='CardOverFlow h-full justify-between gap-4 !pb-4'>
                            <div className='flex  h-full'>
                                <div className='flex flex-col flex-1'>
                                    <Textarea rows={2} resize={true} variant="static" label="Description" name="description" className="rounded-2xl p-4 shadow-sm w-full focus:outline-none min-h-full  "
                                        value={description}
                                        disabled={true}
                                        containerProps={{
                                            className: "grid h-full",
                                        }} labelProps={{
                                            className: "before:content-none after:content-none",
                                        }} />
                                </div>
                                <div className="flex w-max max-w-[50%] px-4 pt-1 relative justify-end items-end h-full rounded-2xl">
                                    {image &&
                                        <img
                                            src={image as string}
                                            alt={title}
                                            className="h-full  flex-1  rounded-2xl object-cover"
                                        />
                                    }
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <Select className="rounded-full flex shadow  bg-white border-none capitalize"
                                    label={`Modérateur de ${service.User.Profile.firstName}`}
                                    name={"category"}
                                    labelProps={{ className: `before:border-none after:border-none ` }}
                                    disabled={false}
                                    value={issue.UserModo.Profile.firstName}
                                    onChange={() => { }}
                                >
                                    <Option className={"rounded-full my-1 capitalize"}
                                        value={issue.UserModo.Profile.firstName} >
                                        {issue.UserModo.Profile.firstName}
                                    </Option>
                                </Select>
                                <Select className="rounded-full shadow  bg-white border-none capitalize"
                                    label={`Modérateur de ${service.UserResp.Profile.firstName}`}
                                    name={"category"}
                                    labelProps={{ className: `before:border-none after:border-none ` }}
                                    disabled={false}
                                    value={issue.UserModo2.Profile.firstName}
                                    onChange={() => { }}
                                >
                                    <Option className={"rounded-full my-1 capitalize"}
                                        value={issue.UserModo2.Profile.firstName} >
                                        {issue.UserModo2.Profile.firstName}
                                    </Option>
                                </Select>
                            </div>
                            <ServiceIssueCard service={service} />
                        </div>
                    </CardBody>
                </Card>}
            </main>
            <footer className="w-respLarge">
                {user.id === issue.userId ?
                    <CTAMines actions={MyActions} /> :
                    <CTAMines actions={MyActions} disabled1={true} />
                }
            </footer>
        </div >
    )
}

