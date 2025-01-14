import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import { useContext, useState } from "react";
import UserContext from "../../../../contexts/user.context";
import { EventP } from "../../../../domain/entities/Events";
import { Flag } from "../../../../domain/entities/Flag";
import { Participant } from "../../../../domain/entities/Participant";
import { EventService } from "../../../../domain/repositories/EventRepository";
import { getDefaultImage, GenereMyActions, eventdateInfo, getLabel, eventCategories, toggleParticipant } from "../../../../utils/GetDataFunctions";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip, Title, Icon } from "../../../common/SmallComps";


type EventCardProps = { event: EventP, change: (e: any) => void, mines?: boolean, update?: () => void }
export function EventCard(props: EventCardProps) {
    const { userProfile } = useContext(UserContext)
    const userId = userProfile.userId
    const [event, setEvent] = useState<EventP>(props.event)
    const { id, title, description, category, participantsMin, start, end, createdAt } = event
    const { change, mines, update } = props
    const Igo: boolean = event.Participants.find((participant: Participant) => participant.userId === userId) ? true : false
    const flagged: boolean = event.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const pourcentParticipants: number = Math.floor((event.Participants?.length) / participantsMin * 100)
    const disabledEditCTA = pourcentParticipants >= 100 ? true : false
    const imgCategory: string | undefined | Blob = getDefaultImage(category.toString())
    const [image] = useState<string>(props.event.image ? (props.event.image) as any : (imgCategory));
    const { deleteEvent } = new EventService()
    const actions = GenereMyActions(event, "evenement", deleteEvent)
    let haveImage = image ? true : false


    return (
        <Card className="FixCard w-resp !h-max ">
            <CardHeader className={haveImage ? "FixCardHeader !max-h-[26vh] " : "FixCardHeader NoImage"}
                floated={haveImage}>
                <div className={` ${haveImage ? "absolute h-full w-full flex flex-col justify-between items-end px-2 py-2" : "flex gap-4"} h-full w-full flex justify-end `}>
                    <DateChip start={start} end={end} ended={new Date(end).getTime() < Date.now()} prefix="commence dans " />
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
                <Title title={title} flagged={flagged} id={id} CreatedAt={createdAt} subTitle={eventdateInfo(props.event)} />
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
                            icon={
                                <Icon icon="person" fill={Igo} color={Igo ? "cyan" : "gray"} style="-mt-2" title={Igo ? "Je n'y vais plus" : "Je participe"} />}>
                        </Chip>
                    </button>
                    <Icon icon="arrow_circle_right" link={`/evenement/${id}`} title={`voir les details de ${title}`} size="4xl px-1" fill />
                </div>
            </CardFooter>
        </Card>

    );
}