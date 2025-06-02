import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { HardLevel, SkillLevel, ServiceStep } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";

export default function ServiceDetailComp(props: { service: ServiceView, mines?: boolean }) {
    const { service } = props
    const { user } = useUserStore()
    const userId: number = user.id
    const navigate = useNavigate();
    const { id, title, description, IResp, image, createdAt, User, UserResp, mine, categoryS, statusS, hard, skill, flagged, points, typeS } = props.service
    const haveImage = service.image ? true : false
    const isResp = statusS === ServiceStep.STEP_1 ? true : false;
    const isValidated = statusS === ServiceStep.STEP_2 ? true : false;
    const isFinish = statusS === ServiceStep.STEP_3 ? true : false;
    const inIssue = statusS === ServiceStep.STEP_4 ? true : false;

    return (
        <div className="DetailCardDiv">
            <Card className="FixCard w-respLarge !h-full" >
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="flex items-center gap-2 mb-1">
                            <Chip
                                size="sm"
                                value={`${categoryS}`}
                                className="CyanChip">
                            </Chip>
                            <Chip
                                size="sm"
                                value={typeS}
                                className={`${typeS === "demande" ? "OrangeChip" : "GreenChip"} shadow rounded-full  h-max flex items-center gap-2 font-medium `}>
                            </Chip>
                            <button onClick={() => { inIssue && navigate(`/conciliation/${id}`) }}>
                                <Chip
                                    size="sm" value={statusS}
                                    className={`${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip" || inIssue && "RedChip"} shadow rounded-full h-max flex items-center gap-2 font-medium `}>
                                </Chip>
                            </button>
                        </div>
                        <DateChip
                            start={createdAt}
                            prefix="publié le " />
                    </div>
                    {image &&
                        <img
                            onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    }
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title
                        title={title}
                        flagged={flagged}
                        id={id}
                        type='service'
                        group={service.Group}
                    />
                    <div className="flex justify-between items-end pt-2 ">
                        <div className="flex  items-center gap-2 mb-1">
                            <Chip
                                value={SkillLevel[skill as unknown as keyof typeof SkillLevel]}
                                className=" GrayChip  px-4 rounded-full h-full flex items-center justify-center"
                                icon={<Icon
                                    disabled
                                    size="md"
                                    icon="design_services"
                                    style=" pointer-events-none"
                                    title="Compétence" />}>
                            </Chip>
                            <Chip
                                value={HardLevel[hard as unknown as keyof typeof HardLevel]}
                                className=" GrayChip px-4 rounded-full h-full flex items-center justify-center gap-4"
                                icon={<Icon
                                    disabled
                                    size="md"
                                    icon="signal_cellular_alt"
                                    fill
                                    style="scale-150 pointer-events-none"
                                    title="Difficulté" />}>
                            </Chip>
                        </div>
                        {UserResp && !IResp &&
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="text-right">
                                {mine && !isValidated && !isFinish && "Réponse " || isValidated && 'en cours par ' || isFinish && 'effectué par ' || IResp && "Vous :" || '  '}
                            </Typography>
                        }
                        {UserResp && IResp &&
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="text-right">
                                vous
                                {isFinish && 'avez fait ' || !isValidated && !isFinish && " avez repondu " || isValidated && !isFinish && ' faite'}
                            </Typography>
                        }
                    </div>
                    <div className="CardOverFlow h-full flex flex-col gap-4 !pt-1 ">
                        <div className="flex h-full">
                            <Typography
                                color="blue-gray"
                                className="flex-1 pr-4 max-h-20 overflow-y-auto">
                                {description}
                            </Typography>
                            {UserResp &&
                                <div className="flex flex-col items-end ">
                                    <Typography
                                        variant="small"
                                        className="font-normal !p-0">
                                        {UserResp.Profile?.firstName} {UserResp.Profile?.lastName}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray" >
                                        {UserResp.Profile?.skills} ◦
                                    </Typography>
                                    <Avatar

                                        onError={(e) => e.currentTarget.src = "/image/person.svg"}
                                        src={UserResp.Profile?.image as string}
                                        size="sm"
                                        alt="avatar"
                                        withBorder={true}
                                        color="blue-gray" />
                                </div>
                            }
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {User?.id !== userId &&
                        <ProfileDiv profile={User} />
                    }
                    <div className="flex items-center gap-2">
                        <Typography
                            variant="h3"
                            className={`text-end ${points[1] && "w-full"}`} >
                            {points[1] && <span className="!text-[1rem] font-light">de </span>}
                            {points[0]}
                            {points[1] && <>
                                <span className="!text-[1rem] font-light">à </span>
                                {points[1]}</>}
                            <span className="!text-[1.2rem] font-light"> points</span>
                        </Typography>
                    </div>
                </CardFooter>
            </Card >
        </div>
    )
}