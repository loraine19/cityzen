import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../../contexts/user.context";
import { Flag } from "../../../../domain/entities/Flag";
import { Service, HardLevel, SkillLevel } from "../../../../domain/entities/Service";
import { getLabel, serviceTypes, GetPoints, serviceCategories, isLate, serviceStatus, getEnumVal } from "../../../../utils/GetDataFunctions";
import { DateChip, Title, ProfileDiv, Icon } from "../../../common/SmallComps";


export default function ServiceDetailComp(props: { service: Service, mines?: boolean, change: (e: any) => void }) {
    const { userProfile } = useContext(UserContext)
    const userId = (userProfile.userId)
    const navigate = useNavigate();
    const { service } = props
    const { id, title, description, image, createdAt, User, UserResp } = props.service
    const flagged: boolean = service.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const haveImage = service.image ? true : false
    const userAuthor = User.Profile
    const isMine = (User.id === userId || UserResp?.id === userId)
    const type = getLabel(service.type.toString(), serviceTypes)
    const [points, setPoints] = useState<number[]>(GetPoints(service))
    const category = getLabel(service.category.toString(), serviceCategories)
    const late: boolean = isLate(createdAt, 15)
    console.log(late)
    const status = getLabel(service.status, serviceStatus)
    const isResp = status === 'en attente' ? true : false
    const IResp = UserResp?.id === userId
    const isValidated = status === 'en cours' ? true : false
    const isFinish = status === 'terminé' ? true : false
    const inIssue = status === 'litige' ? true : false
    const hard = getEnumVal(service.hard, HardLevel)
    const skill = getEnumVal(service.skill, SkillLevel)

    useEffect(() => setPoints(GetPoints(service)), [service])

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className={haveImage ? "FixCardHeader min-h-[28vh]" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={`${!haveImage ? "relative" : "absolute"}  top-0 p-2 justify-between w-full flex items-end `}>
                        <div className="flex items-center gap-2 mb-1">
                            <Chip size="sm" value={`${category}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
                            </Chip>
                            <Chip size="sm" value={type} className={`${type === "demande" ? "OrangeChip" : "GreenChip"} shadow rounded-full  h-max flex items-center gap-2 font-medium `}>
                            </Chip>
                            <button onClick={() => { status === 'litige' && navigate(`/conciliation/${id}`) }}>
                                <Chip size="sm" value={status}
                                    className={`${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip" || inIssue && "RedChip"} shadow rounded-full h-max flex items-center gap-2 font-medium `}>
                                </Chip>
                            </button>
                        </div>
                        <DateChip start={createdAt} prefix="publié le " />
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
                    <Title title={title} flagged={flagged} id={id} />
                    <div className="flex justify-between items-end pt-2 ">
                        <div className="flex  items-center gap-2 mb-1">
                            <Chip value={skill} className=" GrayChip  px-5 rounded-full h-full flex items-center justify-center"
                                icon={<Icon icon="design_services" size="2xl" fill color="gray" style="pl-4 !-mt-[0.4rem]" title="Compétence" />}>
                            </Chip>
                            <Chip value={hard} className=" GrayChip px-4 rounded-full h-full flex items-center justify-center gap-5"
                                icon={<Icon icon="signal_cellular_alt" size="2xl" fill color="gray" style="pl-4 !-mt-[0.4rem]" title="Difficulté" />}>
                            </Chip>
                        </div>
                        {UserResp && !IResp &&
                            <Typography variant="h6" color="blue-gray" className="text-right">
                                {isMine && !isValidated && !isFinish && "Réponse " || isValidated && 'en cours par ' || isFinish && 'effectué par ' || IResp && "Vous :" || '  '}
                            </Typography>
                        }
                        {UserResp && IResp &&
                            <Typography variant="h6" color="blue-gray" className="text-right">
                                vous
                                {isFinish && 'avez fait ' || !isValidated && !isFinish && " avez repondu " || isValidated && !isFinish && ' faite'}
                            </Typography>
                        }
                    </div>
                    <div className="CardOverFlow h-full flex flex-col gap-4 !pt-1 ">
                        <div className="flex h-full">
                            <Typography color="blue-gray" className="flex-1 pr-4 max-h-20 overflow-y-auto">
                                {description}
                            </Typography>
                            {UserResp &&
                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex flex-col items-end ">
                                        <Typography variant="small" className="font-normal !p-0">
                                            {UserResp.Profile?.firstName} - {UserResp.Profile?.lastName}
                                        </Typography>
                                        <Typography variant="small" color="gray" >
                                            {UserResp.Profile?.skills} ◦
                                        </Typography>
                                        <Avatar src={UserResp.Profile?.image as string} size="sm" alt="avatar" withBorder={true} color="blue-gray" />
                                    </div>
                                    <Chip size={"sm"} value={status} className={`${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip" || inIssue && "RedChip"} rounded-full h-max flex items-center gap-2 font-medium shadow`}>
                                    </Chip>
                                </div>}
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {userAuthor?.userId !== userId &&
                        <ProfileDiv profile={userAuthor} />
                    }

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