import { Card, CardHeader, Typography, Chip, CardBody, Textarea, Popover, PopoverHandler, PopoverContent, Select, Option, Input, CardFooter } from "@material-tailwind/react"
import ServiceIssueCard from "./ServiceIssueCard"
import { useEffect, useState } from "react"
import { Service } from "../../../../../domain/entities/Service"
import { User } from "../../../../../domain/entities/User"
import { useUserStore } from "../../../../../application/stores/user.store"
import { Profile } from "../../../../../domain/entities/Profile"
import { ImageBtn } from "../../../common/ImageBtn"
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity"
import DI from "../../../../../di/ioc"


type IssueFormProps = { issue: IssueView, service?: Service, formik?: any }
export const IssueForm = ({ issue, formik, service }: IssueFormProps) => {
    const { createdAt, description, image } = formik ? formik.values : issue
    const Service = service ? service : issue.Service
    const { user } = useUserStore()
    const userProfile: Profile = user.Profile
    const myService = useState<boolean>(userProfile?.userId === Service?.userId)
    const IResp = useState<boolean>(userProfile.userId === Service.userIdResp)
    const [imgBlob, setImgBlob] = useState<string>(image ? image : '')
    const start = new Date(Service.createdAt).toLocaleDateString('fr-FR')

    const [modos, setModos] = useState<User[]>([])

    useEffect(() => {
        const fetchModos = async () => {
            const modos = await DI.resolve('getUsersModosUseCase').execute()
            setModos(modos)
        }
        if (issue && formik && (!issue.UserModo || !issue.UserModoResp)) fetchModos()
        if (issue && !formik && modos.length === 0) {
            modos.push(issue.UserModo)
            modos.push(issue.UserModoResp)
        }
        console.log(modos)
    }, [issue]);

    return (
        <>
            <main className={`flex flex-1`}>
                <Card
                    className=" w-respLarge FixCard z-50 overflow-auto ">
                    <CardHeader
                        className={"FixCardHeaderNoImage px-4 min-h-max pt-3 justify-between shadow-none flex"}
                        floated={false}>
                        <Typography
                            variant="h6"
                            color="blue-gray" >
                            {`${issue?.User?.Profile?.firstName ? issue?.User?.Profile?.firstName : 'Vous'} ${issue?.UserModo ? "à demander de l'aide" : "demandez de l'aide"}`}
                        </Typography>
                        {issue?.date ?
                            <Chip
                                value={'date du probléme : ' + (new Date(createdAt ? createdAt : new Date())).toLocaleDateString('fr-FR')}
                                className={`lowercase GrayChip shadow font-medium `}>
                            </Chip> :
                            <div className='flex flex-col flex-1 !max-w-max overflow-auto pt-1'>
                                <Input
                                    type="datetime-local"
                                    min={start}
                                    defaultValue={start}
                                    className="flex justify-end px-4 pb-4 RedChip"
                                    label={formik?.errors.date as string || "date du probléme"}
                                    labelProps={{ className: `${formik.errors.date && 'error'}  "mr-3 pr-4 pt-0 flex justify-end !text-gray-800 h-max peer-focus:after:content-none` }}
                                    name="date"
                                    variant="standard"
                                    onChange={formik?.handleChange}
                                    value={formik?.values?.date ? formik.values.date : start}
                                    error={formik?.touched?.date && Boolean(formik?.errors?.date)}
                                    containerProps={{ className: "!max-h-max h-8 !min-w-max opacity-80" }}
                                />

                            </div>}
                    </CardHeader>
                    <CardBody className='lg:flex-1 flex-1 flex  flex-row w-full gap-4 px-4 !py-0 lg:items-center'>
                        <div className={`flex flex-1 overflow-auto ${formik ? 'pt-2' : 'py-1'}`}>
                            <Textarea
                                variant={formik ? "static" : "outlined"}
                                error={Boolean(formik?.errors?.description)}
                                label={formik?.errors.description as string || "Description du probleme"}
                                name="description"
                                onChange={formik?.handleChange}
                                value={description}
                                disabled={formik ? false : true}
                                className="!rounded-2xl"
                            />
                        </div>
                        <div className={imgBlob ? 'relative flex flex-1 ' : `relative`}>
                            <div className={imgBlob ? ' flex flex-1 py-1' : `hidden`}>
                                <Popover>
                                    <PopoverHandler>
                                        <img
                                            src={imgBlob}
                                            alt='image'
                                            title='cliquez pour agrandir'
                                            className="lg:h-[6.5rem]  h-full w-full  shadow rounded-2xl object-cover"
                                        />
                                    </PopoverHandler>
                                    <PopoverContent
                                        className="!bg-transparent !border-none flex justify-center items-center z-50 ">
                                        <div className="fixed top-[16rem] left-1/2 transform -translate-x-1/2 max-h-[calc(100vh-19rem)] max-w-[calc(100vw-2rem)] flex justify-center items-center ">
                                            <img
                                                src={imgBlob}
                                                alt='image'
                                                className="h-full w-full rounded-2xl object-cover shadow-2xl "
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className={formik ? 'flex  absolute bottom-12 right-12' : `hidden`}>
                                <ImageBtn
                                    setImgBlob={setImgBlob}
                                    formik={formik}
                                />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="CardFooter w-full flex-1 !py-0 mb-3 flex flex-col  gap-2 ">
                        <div className='flex gap-3 '>
                            <Select

                                className="rounded-full flex  !shadow !py-1 bg-white border-none capitalize overflow-auto"
                                label={`Modérateur de ${Service.User.Profile.firstName}`}
                                name={"userIdModo"}
                                labelProps={{ className: `before:border-none after:border-none ` }}
                                menuProps={{ className: 'overflow-auto max-h-44' }}
                                disabled={(myService[0] && formik && !issue.userIdModo) ? false : true}
                                value={'13'}
                                onChange={(e: string | undefined) => { formik.values.userIdModo = e }}
                                containerProps={{ className: "h-[2rem] !py-0 !flex justify-center" }}
                            >
                                {modos.map((modo: User) =>
                                    <Option
                                        key={modo.id}
                                        className={`rounded-full my-1 capitalize ${modo?.id.toString() === issue?.UserModo?.id.toString() && 'bg-red-100'}`}
                                        value={modo?.id.toString()} >
                                        {modo?.Profile?.firstName}
                                    </Option>)}
                            </Select>
                            <Select
                                className="rounded-full shadow !py-1 !flex !justify-center bg-white border-none capitalize "
                                label={`Modérateur de ${Service.UserResp.Profile.firstName}`}
                                name={"userIdModoResp"}
                                labelProps={{ className: `before:border-none after:border-none ` }}
                                menuProps={{ className: 'overflow-auto max-h-44' }}
                                disabled={IResp[0] && formik ? false : true}
                                value={issue?.UserModoResp?.id.toString() || ''}
                                onChange={(e: string | undefined) => { formik.values.userIdModoResp = e }}
                                containerProps={{ className: "h-[2rem] !py-0 !flex justify-center" }}
                            >
                                {modos.map((modo: User) =>
                                    <Option
                                        key={modo.id}
                                        className={"rounded-full my-1 capitalize"}
                                        value={modo?.id.toString()} >
                                        {modo?.Profile?.firstName}
                                    </Option>)}
                            </Select>
                        </div>
                        <ServiceIssueCard
                            service={Service} />
                    </CardFooter>
                </Card>
            </main >
        </>)
}