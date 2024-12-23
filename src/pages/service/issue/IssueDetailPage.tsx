import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../../components/NavBarTop';
import SubHeader from '../../../components/SubHeader';
import { Option, Select, Card, CardBody, CardHeader, Chip, Textarea, Typography } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import UserContext from '../../../contexts/user.context';
import DataContext from '../../../contexts/data.context';
import { Issue, Profile, Service } from '../../../types/class';
import ServiceIssueCard from '../../../components/servicesComps/ServiceIssueCard';
import { ConfirmModal } from '../../../components/ConfirmModal';
import CTAMines from '../../../components/CATMines';

export default function IssueEditPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const { data, setDataInLocal } = useContext(DataContext)
    const { services, issues, profiles } = data
    const elementFound = issues.find((element: Issue) => element.id === Number(id));
    const issue = elementFound ? elementFound : {} as Issue;
    const service = services.find((element: Service) => element.id === issue.service_id)
    const navigate = useNavigate();

    const haveImage = issue.image ? true : false

    const { created_at } = issue
    const { description, image } = issue
    const { title } = service
    const modo = profiles.filter((profile: Profile) => profile.user_id !== service.user_id && profile.user_id !== service.user_id_resp)
    const [open, setOpen] = useState(false);
    function saveIssue() {
        data.issues.push(service as Issue)
        setDataInLocal({ ...data, issues: [...data.issues] })
    }
    return (
        <div className="Body gray">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    saveIssue();
                    navigate(`/service/${service.id}`);
                    setOpen(false)
                }}
                title={"Confimrer le litige"}
                element={(JSON.stringify(service, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />


            <header className="px-4">
                <NavBarTop />
                <SubHeader type={service.id && service.id < issues.length ? ` mon litige ` : "mon litige"} place={` sur ${service.type === "get" ? "une demande" : "une offre"} de service  ${user.id === service.user_id ? "que j'ai créé" : "à laquelle j'ai repondu"}`} closeBtn />
                <div className="w-respLarge">



                </div>
            </header>
            <main className={`flex flex-1 pb-2 ' ${haveImage && "pt-[1.5rem]"}`}>
                <Card className=" w-respLarge FixCard">
                    <CardHeader className={"FixCardHeaderNoImage  justify-between shadow-none flex "}
                        floated={false}>
                        <Typography variant="lead" color="blue-gray" >
                            description du problème
                        </Typography>



                        <Chip value={(new Date(created_at ? created_at : new Date())).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
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
                                            src={image}
                                            alt={title}
                                            className="h-full  flex-1  rounded-2xl object-cover"
                                        />
                                    }
                                </div>

                            </div>

                            <div className='flex gap-2'>
                                <Select className="rounded-full flex shadow  bg-white border-none capitalize"
                                    label={`Modérateur de user ${service.id} = ${issue.user_id_M}`}
                                    name={"category"}
                                    labelProps={{ className: `before:border-none after:border-none ` }}
                                    disabled={true}
                                    value={(service.user_id_M)?.toString()}
                                    onChange={() => { }}
                                >

                                    <Option className={"rounded-full my-1 capitalize"} value={(user.user_id).toString()} >
                                        {user.firstName} - {user.lastName}
                                    </Option>
                                </Select>
                                <Select className="rounded-full shadow  bg-white border-none capitalize"
                                    label={`Modérateur de user ${service.user_id_resp} = ${issue.user_id_Mresp}`}
                                    name={"category"}
                                    labelProps={{ className: `before:border-none after:border-none ` }}
                                    disabled={true}
                                    value={(service.user_id_M)?.toString()}
                                    onChange={() => { }}
                                >
                                    {modo.map((user: Profile, index: number) => {
                                        return (
                                            <Option className={"rounded-full my-1 capitalize"} value={(user.user_id).toString()} key={index} >
                                                {user.firstName} - {user.lastName}
                                            </Option>)
                                    })}
                                </Select>
                            </div>
                            <ServiceIssueCard service={service} />
                        </div>

                    </CardBody>
                </Card>

            </main>
            <footer className="w-respLarge">
                {user.id === issue.user_id ?
                    <CTAMines id={issue.id} /> :
                    <CTAMines id={issue.id} disabled1={true} />
                }
            </footer>
        </div >
    )
}