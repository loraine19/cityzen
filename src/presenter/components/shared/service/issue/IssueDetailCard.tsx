import { Card, CardHeader, Typography, Chip, CardBody, Textarea, Popover, PopoverHandler, PopoverContent, Select, Option, Input, CardFooter } from "@material-tailwind/react"
import ServiceIssueCard from "./ServiceIssueCard"
import { useEffect, useState } from "react"
import { Service } from "../../../../../domain/entities/Service"
import { User } from "../../../../../domain/entities/User"
import { ImageBtn } from "../../../common/ImageBtn"
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity"
import DI from "../../../../../di/ioc"
import { IssueStep } from "../../../../../domain/entities/Issue"

type IssueFormProps = { issue: IssueView, service?: Service, formik?: any }
export const IssueForm: React.FC<IssueFormProps> = ({ issue, formik, service }) => {
    const Service = service ? service : issue.Service
    const [imgBlob, setImgBlob] = useState<string>(formik?.values.image ? formik?.values.image : issue.image)
    const start = new Date(Service.createdAt).toLocaleDateString('fr-FR')
    const modoId = formik?.values.userIdModo ? formik?.values.userIdModo : issue.userIdModo || 0
    const modoIdResp = formik?.values.userIdModoResp ? formik?.values.userIdModoResp : issue.userIdModoResp || 0
    const [modos, setModos] = useState<User[]>([])

    useEffect(() => {
        const fetchModos = async () => {
            const modos = await DI.resolve('getUsersModosUseCase').execute()
            setModos(modos)
        }
        if (issue && formik && (!issue.UserModo || !issue.UserModoResp)) fetchModos()
        if (issue && !formik || (formik && issue.UserModo && issue.UserModoResp)) {

            setModos([])
        }
    }, [issue]);



    return (
        <>
            <main className={`flex flex-1 pt-3`}>
                <Card
                    className=" w-respLarge FixCard z-50  ">
                    <CardHeader
                        className={"FixCardHeaderNoImage px-4 min-h-max py-3 justify-between items-center shadow-none flex"}
                        floated={false}>
                        <Typography
                            className="truncate"
                            variant="h6"
                            color="blue-gray" >
                            {`${issue?.User?.Profile?.firstName ? issue?.User?.Profile?.firstName : 'Vous'} ${issue?.UserModo ? "à demander de l'aide" : "demandez de l'aide"}`}
                        </Typography>
                        <div className="flex gap-2 items-center">
                            <Chip
                                className={`${issue?.statusS === IssueStep.STEP_3 && 'GreenChip' || issue?.statusS === IssueStep.STEP_4 && 'GrayChip' || 'OrangeChip'} lowercase`}
                                value={issue?.statusS ?? 'nouveau'}>
                            </Chip>
                            {issue?.date ?
                                <Chip
                                    size='sm'
                                    value={'' + (new Date(formik?.values?.createdAt ? formik?.values.createdAt : issue.createdAt)).toLocaleDateString('fr-FR')}
                                    className={`!flex lowercase GrayChip shadow font-medium before:content-['']`}>
                                </Chip>
                                :
                                <div className='flex flex-col flex-1 !max-w-max overflow-auto pt-1'>
                                    <Input
                                        type="datetime-local"
                                        min={start}
                                        className="flex justify-end px-4 pb-4 RedChip"
                                        label={formik?.errors.date as string || "date du probléme"}
                                        labelProps={{ className: `${formik?.errors.date && 'error'}  "mr-3 pr-4 pt-0 flex justify-end !text-gray-800 h-max peer-focus:after:content-none` }}
                                        name="date"
                                        variant="standard"
                                        onChange={formik?.handleChange}
                                        value={formik?.values?.date ? formik?.values.date : start}
                                        error={Boolean(formik?.errors?.date)}
                                        containerProps={{ className: "!max-h-max h-8 !min-w-max opacity-80" }}
                                    />
                                </div>}
                        </div>
                    </CardHeader>
                    <CardBody
                        className={`${formik ? 'pt-3' : 'py-0'}  flex flex-1 w-full gap-4 lg:items-center lg:max-h-[25vh] max-h-[30vh]`}>
                        <div className={`flex flex-1 h-full`}>
                            <Textarea
                                variant={formik ? "static" : "outlined"}
                                error={Boolean(formik?.errors?.description)}
                                label={formik?.errors.description as string || "Description du probleme"}
                                name="description"
                                onChange={formik?.handleChange}
                                value={formik?.value?.description ? formik?.value.description : issue.description}
                                disabled={formik ? false : true}
                                className="!rounded-2xl flex flex-1   "
                            />
                        </div>
                        <div className={imgBlob ? 'relative flex-1   flex' : `relative`}>
                            <div className={imgBlob ? ' flex w-full' : `hidden`}>
                                <Popover>
                                    <PopoverHandler>
                                        <img
                                            src={imgBlob}
                                            alt='image'
                                            title='cliquez pour agrandir'
                                            className="lg:max-h-[25vh] max-h-[30vh] w-full  shadow rounded-2xl object-cover"
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
                    <CardFooter className="CardFooter !overflow-auto  w-full flex-1 flex flex-col  gap-3 !pt-2 !pb-4">
                        <div className='flex gap-3 md:!flex-row flex-col max-w-[100%] min-h-max '>
                            <Select
                                key='userIdModo'
                                className="rounded-full flex  !shadow !py-1 bg-white border-none capitalize overflow-auto"
                                label={`Choisir un modérateur de ${Service.User.Profile.firstName}`}
                                name={"userIdModo"}
                                labelProps={{ className: `before:border-none after:border-none ` }}
                                menuProps={{ className: 'overflow-auto max-h-44' }}
                                disabled={modoId !== 0}
                                value={modoId.toString()}
                                onChange={(e: string | undefined) => { formik.values.userIdModo = parseInt(e || '1') }}
                                containerProps={{ className: "h-[2rem] !py-0 !flex justify-center" }}
                            >
                                {modoId === 0 ? modos.map((modo: User) =>
                                    <Option
                                        key={modo.id}
                                        className={`rounded-full my-1 capitalize ${modo?.id === issue?.UserModo?.id && 'bg-red-100'}`}
                                        value={modo.id && modo?.id.toString() || '0'} >
                                        {modo?.Profile?.firstName} {modo.id && modo?.id.toString() === issue?.UserModo?.id.toString() && `modérateur de ${Service.User.Profile.firstName}`}
                                    </Option>) :
                                    <Option
                                        key={issue?.UserModo?.id}
                                        className={`rounded-full my-1 capitalize`}
                                        value={issue?.userIdModo?.toString()} >
                                        {issue.UserModo?.Profile?.firstName}   &nbsp;<span className=" text-blue-gray-400 text-[0.7rem] italic">{`modérateur de ${Service.User.Profile.firstName}`}</span>
                                    </Option>}
                            </Select>
                            <Select
                                className="rounded-full shadow !py-1 !flex !justify-center bg-white border-none capitalize "
                                label={`Modérateur de ${Service.UserResp.Profile.firstName}`}
                                name={"userIdModoResp"}
                                labelProps={{ className: `before:border-none after:border-none ` }}
                                menuProps={{ className: 'overflow-auto max-h-44' }}
                                disabled={modoIdResp !== 0}
                                value={modoIdResp.toString()}
                                onChange={(e: string | undefined) => { formik.values.userIdModoResp = e }}
                                containerProps={{ className: "h-[2rem] !py-0 !flex justify-center" }}
                            >
                                {modoIdResp !== 0 ?
                                    <Option
                                        key={'modoResp'}
                                        className={`rounded-full my-1 capitalize`}
                                        value={issue?.userIdModoResp.toString()
                                        }>
                                        {issue.UserModoResp?.Profile?.firstName}   &nbsp;<span className=" text-blue-gray-400 text-[0.7rem] italic">{`modérateur de ${Service.UserResp.Profile.firstName}`}</span>
                                    </Option> :
                                    modos.map((modo: User) =>
                                        <Option
                                            key={modo.id}
                                            className={"rounded-full my-1 capitalize"}
                                            value={modoIdResp.toString() || '0'} >
                                            {modo?.Profile?.firstName} {modo.id && modo?.id.toString() === issue?.UserModoResp?.id.toString() && `modérateur de ${Service.UserResp.Profile.firstName}`}
                                        </Option>)

                                }
                            </Select>
                        </div>
                        <div className=" h-full">
                            <ServiceIssueCard
                                service={Service} />
                        </div>
                    </CardFooter>
                </Card>
            </main >
        </>)
}