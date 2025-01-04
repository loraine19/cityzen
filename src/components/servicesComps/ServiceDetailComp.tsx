import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Flag, HardLevel, Service, SkillLevel } from "../../types/class";
import { getEnumVal, getLabel, GetPoints, isFlaged, isLate, serviceCategories, serviceStatus, serviceTypes } from "../../functions/GetDataFunctions";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user.context";
import { getFlagsService } from "../../functions/API/flagsApi";

export default function ServiceDetailComp(props: { service: Service, mines?: boolean, change: (e: any) => void }) {
    const { user } = useContext(UserContext)
    const userId = (user.userId)
    const navigate = useNavigate();
    const { service } = props
    const { id, title, description, image, createdAt, User, UserResp } = props.service
    const [flagged, setFlagged] = useState<boolean>(false)
    const [flags, setFlags] = useState<Flag[]>([])
    const haveImage = service.image ? true : false
    const userAuthor = User.Profile
    const isMine = (User.id === userId || UserResp?.id === userId)
    const type = getLabel(service.type.toString(), serviceTypes)
    const [points, setPoints] = useState<number[]>(GetPoints(service))
    const category = getLabel(service.category.toString(), serviceCategories)
    const late: boolean = isLate(createdAt, 15)
    const status = getLabel(service.status, serviceStatus)
    const isResp = status === 'en attente' ? true : false
    const IResp = UserResp?.id === userId
    const isValidated = status === 'en cours' ? true : false
    const isFinish = status === 'terminé' ? true : false
    const hard = getEnumVal(service.hard, HardLevel)
    const skill = getEnumVal(service.skill, SkillLevel)
    //    const statusVal = getEnumVal(service.status, ServiceStep)

    useEffect(() => {
        const onload = async () => {
            const flags = await getFlagsService()
            setFlags(flags)
            setFlagged(isFlaged(service, userId, flags))
            setPoints(GetPoints(service))
        }
        onload()
    }, [service])

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className={haveImage ? "FixCardHeader min-h-[28vh]" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={`${!haveImage ? "relative" : "absolute"}  top-0 p-2 justify-between w-full flex items-end `}>
                        <div className="flex items-center gap-2 mb-1">
                            <Chip value={`${category}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
                            </Chip>
                            <Chip value={type} className={`${type === "demande" ? "OrangeChip" : "GreenChip"} rounded-full  h-max flex items-center gap-2 font-medium `}>
                            </Chip>
                        </div>
                        <div className="flex items-center gap-2 flex-col sm:flex-row">
                            <button onClick={() => { status === 'litige' && navigate(`/conciliation/${id}`) }}>
                                <Chip value={status}
                                    className={`${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip" || status === 'litige' && "RedChip underline"} rounded-full h-max flex items-center gap-2 font-medium `}>
                                </Chip>
                            </button>
                            <Chip value={(new Date(createdAt)).toLocaleDateString('fr-FR')}
                                className={`${late ? "RedChip" : "GrayChip"} 
                                rounded-full  h-max flex items-center gap-2 shadow font-medium `}>
                            </Chip>
                        </div>
                    </div>
                    {image &&
                        <img
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    }
                </CardHeader>
                <CardBody className="FixCardBody !pb-0">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>

                        <Link to={`/flag/post${id}`} title={`signaler un problème sur ${title}`}>
                            <span className={`${flagged && "fill !text-red-500"} material-symbols-outlined !text-[1.2rem] opacity-80`}>flag_2</span>
                        </Link>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex  items-center gap-2 mb-1">
                            <Chip value={skill} size="lg" className=" GrayChip  px-5 rounded-full h-full flex items-center justify-center"
                                icon={<span className={`pl-1 material-symbols-outlined unFillThin !text-[1.5rem]`} title="Compétence">design_services</span>}>
                            </Chip>
                            <Chip value={hard} size="lg" className=" GrayChip px-4 rounded-full h-full flex items-center justify-center gap-5"
                                icon={<span className={`  material-symbols-outlined unFillThin !text-[1.5rem]`} title="Difficulté">signal_cellular_alt</ span>}>
                            </Chip>
                        </div>
                        {UserResp && !IResp &&
                            <Typography variant="h6" color="blue-gray" className="text-right">
                                {isMine && !isValidated && !isFinish && "Réponse " || isValidated && 'en cours par ' || isFinish && 'effectué par ' || IResp && "Vous :" || ' - '}
                            </Typography>
                        }
                        {UserResp && IResp &&
                            <Typography variant="h6" color="blue-gray" className="text-right">
                                vous
                                {isFinish && 'avez fait ' || !isValidated && !isFinish && "avez repondu" || isValidated && !isFinish && ' faite'}
                            </Typography>
                        }

                    </div>
                    <div className="CardOverFlow h-full flex flex-col gap-4 ">
                        <div className="flex h-full">
                            <Typography color="blue-gray" className="flex-1 pr-4 overflow-y-auto">
                                {description}
                            </Typography>
                            {UserResp &&
                                <div className="flex flex-col items-end  gap-3">
                                    <div className="flex flex-col items-end ">
                                        <Typography variant="small" className="font-normal !p-0">
                                            {UserResp.Profile?.firstName} - {UserResp.Profile?.lastName}
                                        </Typography>
                                        <Typography variant="small" color="gray" >
                                            {UserResp.Profile?.skills} -
                                        </Typography>
                                        <Avatar src={UserResp.Profile?.image as string} size="sm" alt="avatar" withBorder={true} color="blue-gray" />
                                    </div>
                                    <Chip value={status} className={`${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip"} rounded-full h-max flex items-center gap-2 font-medium `}></Chip>
                                </div>}
                        </div>
                    </div>
                </CardBody>

                <CardFooter className="CardFooter">
                    {userAuthor?.userId !== user.userId && <div className="flex items-center px-0 gap-2">
                        <Avatar src={userAuthor?.image as string} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="small" className="font-normal !p-0">{userAuthor?.firstName} - {userAuthor?.lastName}</Typography>
                            <Typography variant="small" color="gray" >
                                {userAuthor?.skills}
                            </Typography>
                        </div>
                    </div>}

                    <div className="flex items-center gap-2">
                        <Typography variant="h2" >
                            {points[1] && <span className="!text-[1.2rem] font-light">de </span>}
                            {points[0]}
                            {points[1] && <>  <span className="!text-[1.2rem] font-light">à</span> {points[1]}</>}
                            <span className="!text-[1.2rem] font-light"> points</span></Typography>
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}