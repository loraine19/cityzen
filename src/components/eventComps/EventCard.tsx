import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AvatarStack } from "./AvatarStack";
import ModifBtnStack from "../UIX/ModifBtnStack";
import { eventdateInfo, toggleParticipant, getDefaultImage, GenereMyActions, getLabel, eventCategories } from '../../functions/GetDataFunctions';
import { useContext, useState } from "react";
import { EventP, Flag, Participant, } from "../../types/class";
import UserContext from "../../contexts/user.context";
import { deleteEvent } from "../../functions/API/eventsApi";
import { DateChip, FlagIcon } from "../UIX/SmallComps";

type EventCardProps = { event: EventP, change: (e: any) => void, mines?: boolean, update?: () => void }
export function EventCard(props: EventCardProps) {
    const user = useContext(UserContext)
    const userId = user.user.userId
    const [event, setEvent] = useState<EventP>(props.event)
    const { id, title, description, category, participantsMin, start, end } = event
    const { change, mines, update } = props
    const Igo: boolean = event.Participants.find((participant: Participant) => participant.userId === userId) ? true : false
    const flagged: boolean = event.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const pourcentParticipants: number = Math.floor((event.Participants?.length) / participantsMin * 100)
    const disabledEditCTA = pourcentParticipants >= 100 ? true : false
    const imgCategory: string | undefined | Blob = getDefaultImage(category.toString())
    const [image] = useState<string>(props.event.image ? (props.event.image) as any : (imgCategory));
    const actions = GenereMyActions(event, "evenement", deleteEvent)
    let haveImage = image ? true : false


    return (
        <Card className="FixCard w-resp !h-max ">
            <CardHeader className={haveImage ? "FixCardHeader !max-h-[26vh] " : "FixCardHeader NoImage"}
                floated={haveImage}>
                <div className={` ${haveImage ? "absolute h-full w-full flex flex-col justify-between items-end px-2 py-2" : "flex gap-4"} h-full w-full flex justify-end `}>
                    <DateChip createdAt={start} ended={new Date(end).getTime() > Date.now()} />
                    <div className={`${!haveImage && "bg-blue-gray-100"}  h-max w-full !rounded-full backdrop-blur flex items-center gap-2 shadow p-2`}>
                        {pourcentParticipants > 0 ?
                            <Progress value={pourcentParticipants} color={pourcentParticipants > 100 ? "green" : "gray"} size="md"
                                label={pourcentParticipants > 100 ? "Validé" : " "} /> :
                            <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                                <Typography className="mb-0 text-xs font-medium"> pas encore de participants
                                </Typography>
                            </div>}
                    </div>
                </div>
                {image ? <img
                    src={image}
                    alt={title}
                    className="h-full min-h-[26vh] w-full object-cover "
                /> :
                    <Typography variant="h6" color="white" className="mb-2">
                        {title} - {category}
                    </Typography>
                }
            </CardHeader>
            <CardBody className="FixCardBody !flex-1">
                <div className="flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="flex flex-col mb-1 ellipsis truncate hover:text-clip">
                        {title}<br></br>
                        <span className="text-sm font-medium text-blue-gray-500">{eventdateInfo(props.event)}</span>
                    </Typography>
                    <FlagIcon flagged={flagged} id={id} type="event" />
                </div>
                <Typography className=" text-ellipsis overflow-auto max-w-[75vw] h-[1.8rem]">
                    {description}
                </Typography>

            </CardBody>
            <CardFooter className="CardFooter">
                {!mines ? <div className="flex items-center gap-2">
                    <button onClick={(e: any) => change(e)}>
                        <Chip value={getLabel(category, eventCategories)} className="rounded-full h-max" color="cyan">
                        </Chip></button>
                    <AvatarStack avatarDatas={event.Participants} />
                </div> :
                    <ModifBtnStack disabled2={disabledEditCTA} actions={actions} update={update} />}
                <div className="flex items-center gap-2">
                    <button onClick={() => toggleParticipant(event.id, userId, setEvent)}>
                        <Chip value={participantsMin} variant="ghost" className="rounded-full h-max flex items-center gap-2"
                            icon={<span className={`${Igo && "fill !text-cyan-500"} material-symbols-outlined !text-[1.2rem]`}>person</span>}>
                        </Chip></button>
                    <Link to={`/evenement/${id}`} className="flex items-center gap-2" title={`voir les details de ${title}`}><span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                        arrow_circle_right
                    </span>
                    </Link>
                </div>
            </CardFooter>
        </Card>

    );
}