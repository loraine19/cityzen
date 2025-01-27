import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { HardLevel, SkillLevel, ServiceView, ServiceStep } from "../../../../../domain/entities/Service";
import { DateChip, Title, ProfileDiv, Icon } from "../../../common/SmallComps";
import { useUserStore } from "../../../../../application/stores/user.store";


export default function ServiceDetailComp(props: { service: ServiceView, mines?: boolean }) {
    const { service } = props
    const { user } = useUserStore()
    const userId: number = user.id
    const navigate = useNavigate();
    const { id, title, description, IResp, image, createdAt, User, UserResp, mine, typeS, categoryS, statusS, hard, skill, flagged, points } = props.service
    const haveImage = service.image ? true : false
    const userAuthor = User.Profile
    const isResp = statusS === ServiceStep.STEP_1 ? true : false;
    const isValidated = statusS === ServiceStep.STEP_2 ? true : false;
    const isFinish = statusS === ServiceStep.STEP_3 ? true : false;
    const inIssue = statusS === ServiceStep.STEP_4 ? true : false;

    return (
        <>
            <Card className="FixCard w-respLarge !h-full" >
                <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="flex items-center gap-2 mb-1">
                            <Chip size="sm" value={`${categoryS}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
                            </Chip>
                            <Chip size="sm" value={typeS} className={`${typeS === "demande" ? "OrangeChip" : "GreenChip"} shadow rounded-full  h-max flex items-center gap-2 font-medium `}>
                            </Chip>
                            <button onClick={() => { inIssue && navigate(`/conciliation/${id}`) }}>
                                <Chip size="sm" value={statusS}
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
                <CardBody className="FixCardBody">
                    <Title title={title} flagged={flagged} id={id} />
                    <div className="flex justify-between items-end pt-2 ">
                        <div className="flex  items-center gap-2 mb-1">
                            <Chip value={SkillLevel[skill]} className=" GrayChip  px-5 rounded-full h-full flex items-center justify-center"
                                icon={<Icon icon="design_services" size="2xl" fill color="gray" style="pl-4 !-mt-[0.4rem]" title="Compétence" />}>
                            </Chip>
                            <Chip value={HardLevel[hard]} className=" GrayChip px-4 rounded-full h-full flex items-center justify-center gap-5"
                                icon={<Icon icon="signal_cellular_alt" size="2xl" fill color="gray" style="pl-4 !-mt-[0.4rem]" title="Difficulté" />}>
                            </Chip>
                        </div>
                        {UserResp && !IResp &&
                            <Typography variant="h6" color="blue-gray" className="text-right">
                                {mine && !isValidated && !isFinish && "Réponse " || isValidated && 'en cours par ' || isFinish && 'effectué par ' || IResp && "Vous :" || '  '}
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
                                            {UserResp.Profile?.firstName}  {UserResp.Profile?.lastName}
                                        </Typography>
                                        <Typography variant="small" color="gray" >
                                            {UserResp.Profile?.skills} ◦
                                        </Typography>
                                        <Avatar src={UserResp.Profile?.image as string} size="sm" alt="avatar" withBorder={true} color="blue-gray" />
                                    </div>
                                    <Chip size={"sm"} value={statusS} className={`${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip" || inIssue && "RedChip"} rounded-full h-max flex items-center gap-2 font-medium shadow`}>
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