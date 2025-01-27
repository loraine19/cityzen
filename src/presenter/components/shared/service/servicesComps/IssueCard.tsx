import { Card, CardHeader, Typography, Chip, CardBody, Textarea, Popover, PopoverHandler, PopoverContent, Select, Option, Button, Input } from "@material-tailwind/react"
import ServiceIssueCard from "./ServiceIssueCard"
import { useState } from "react"
import { Issue } from "../../../../../domain/entities/Issue"
import { Service, ServiceView } from "../../../../../domain/entities/Service"
import { User } from "../../../../../domain/entities/User"
import { getImageBlob } from "../../../../../infrastructure/services/utilsService"
import { useUserStore } from "../../../../../application/stores/user.store"
import { Profile } from "../../../../../domain/entities/Profile"
import { Skeleton } from "../../../common/Skeleton"



export const IssueForm = (props: { issue: Issue, loading: boolean, modos: User[], service?: Service, formik?: any }) => {
    const { issue, loading, modos, formik } = props
    const { createdAt, description, image } = formik ? formik.values : issue
    const Service = props.service ? props.service : issue.Service
    const { title } = Service
    const { user } = useUserStore()
    const userProfile: Profile = user.Profile

    // const [statusValue] = useState<number>(typeof status === 'number' ? status : parseInt(IssueStep[issue.status]))
    const myService = useState<boolean>(userProfile.userId === Service.userId)
    const IResp = useState<boolean>(userProfile.userId === Service.userIdResp)
    const [imgBlob, setImgBlob] = useState<string>(image ? image : '')
    const start = new Date(Service.createdAt).toISOString().slice(0, 16).replace('z', '')

    return (
        <>
            <main className={`flex flex-1`}>
                {loading ? <Skeleton className="w-respLarge !rounded-2xl !h-[calc(100vh-16rem)] shadow" /> :
                    <Card className=" w-respLarge FixCard z-50">
                        <CardHeader className={"FixCardHeaderNoImage justify-between shadow-none flex"}
                            floated={false}>
                            <Typography variant="h6" color="blue-gray" >
                                {`${issue?.User?.Profile?.firstName ? issue?.User?.Profile?.firstName : 'Vous'} ${issue?.UserModo ? "à demander de l'aide" : "demandez de l'aide"}`}
                            </Typography>
                            {issue?.date ?
                                <Chip value={(new Date(createdAt ? createdAt : new Date())).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                                </Chip> :
                                <div className='flex flex-col flex-1 !max-w-max overflow-auto pt-1'>
                                    <Input
                                        type="datetime-local" min={start} defaultValue={start}
                                        className="flex justify-end px-4 rounded-full pb-4 text-red-900 bg-red-100"
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
                        <CardBody className='FixCardBody !pt-0'>
                            <div className='CardOverFlow h-full justify-between gap-2 '>
                                <div className='flex gap-4 h-full '>
                                    <div className='flex flex-col flex-1 '>
                                        <Textarea
                                            resize={true}
                                            variant="static"
                                            label={formik?.errors.description as string || "Description"}
                                            name="description"
                                            onChange={formik?.handleChange}
                                            className={`${formik ? '' : "rounded-2xl !m-0 p-4 shadow-sm w-full focus:outline-none min-h-full"}`}
                                            value={formik ? formik.values.description : description}
                                            disabled={formik ? false : true}
                                            containerProps={{ className: "grid h-full" }}
                                            labelProps={{ className: `${formik?.errors.description && 'error'} before:content-none after:content-none` }}
                                            error={formik?.touched?.description && Boolean(formik?.errors?.description)}
                                        />

                                    </div>
                                    <div className="flex w-max max-w-[50%] justify-end items-end h-full rounded-2xl">
                                        {image &&
                                            <Popover >
                                                <PopoverHandler >
                                                    <img
                                                        src={imgBlob}
                                                        alt={title}
                                                        title='cliquez pour agrandir'
                                                        className="h-full flex  flex-1 shadow rounded-2xl object-cover"
                                                    />
                                                </PopoverHandler>
                                                <PopoverContent
                                                    className="!bg-transparent !border-none flex justify-center items-center z-50 ">
                                                    <div className="fixed top-[16rem] left-1/2 transform -translate-x-1/2 max-h-[calc(100vh-19rem)] max-w-[calc(100vw-2rem)] 
                                                    flex justify-center items-center "><img
                                                            src={imgBlob}
                                                            alt={title}
                                                            className="h-full w-full rounded-2xl object-cover shadow-2xl "
                                                        /></div>
                                                </PopoverContent>
                                            </Popover>
                                        }
                                        {formik &&
                                            <>
                                                <Button className="shadow absolute right-5 top-0 w-8 h-12 rounded-full z-10" ripple={false}>
                                                    <label htmlFor="image"
                                                        className=" flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                                        <span className="material-symbols-rounded">{(imgBlob && image) ? "edit" : "add_a_photo"}</span>
                                                        <div className="flex flex-col w-full items-center justify-center">
                                                            <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                                        </div>
                                                    </label>
                                                </Button>
                                                <Button type='button' variant='text' ripple={false} color="red" className={image ? `p-1 absolute right-4 top-7 z-30 rounded-full ` : `hidden`}
                                                    onClick={() => { formik.values.image = ''; setImgBlob('') }}>
                                                    <span className="material-symbols-rounded !font-bold !text-2xl">cancel</span>
                                                </Button></>}
                                    </div>
                                </div>
                                <div className='flex gap-4 !pt-2'>
                                    {modos.length > 0 &&
                                        <Select className="rounded-full flex !shadow  bg-white border-none capitalize overflow-auto"
                                            label={`Modérateur de ${Service.User.Profile.firstName}`}
                                            name={"userIdModo"}
                                            labelProps={{ className: `before:border-none after:border-none ` }}
                                            disabled={(myService[0] && formik) ? false : true}
                                            value={issue?.UserModo?.id as unknown as string || ''}
                                            onChange={(e) => { formik.values.userIdModo = e; console.log(formik.values) }}
                                        >
                                            {modos.map((modo: User) => <Option key={modo.id}
                                                className={"rounded-full my-1 capitalize"}
                                                value={modo?.id as unknown as string} >
                                                {modo?.Profile?.firstName}
                                            </Option>)}
                                        </Select>}
                                    {modos.length > 0 && <Select className="rounded-full shadow  bg-white border-none capitalize"
                                        label={`Modérateur de ${Service.UserResp.Profile.firstName}`}
                                        name={"userIdModo2"}
                                        labelProps={{ className: `before:border-none after:border-none ` }}
                                        disabled={IResp[0] && formik ? false : true}
                                        value={issue?.UserModoResp?.id as unknown as string || ''}
                                        onChange={(e) => { formik.values.userIdModo2 = e; console.log(formik.values) }}
                                    >
                                        {modos.map((modo: User) =>
                                            <Option
                                                key={modo.id} className={"rounded-full my-1 capitalize"}
                                                value={modo?.id as unknown as string} >
                                                {modo?.Profile?.firstName}
                                            </Option>)}
                                    </Select>}
                                </div>
                                <ServiceIssueCard service={Service as ServiceView} />
                            </div>
                        </CardBody>
                    </Card>}
            </main>
            <footer className="w-respLarge ">
                {formik &&
                    <Button type="submit" size="lg" className="!lngBtn w-full rounded-full" >
                        enregistrer la demande d'aide
                    </Button>}
                {/* {userProfile.userId === issue.userId ?
                    <CTAMines actions={MyActions} disabled1={statusValue > 1} /> :
                    <CTAMines actions={RespActions} disabled1={statusValue > 1} />
                } */}
            </footer>
        </>)
}