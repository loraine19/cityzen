import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import { useState } from "react";
import { EventView } from "../../../../../domain/entities/Event";
import { GenereMyActions } from "../../../../../infrastructure/services/utilsService";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip, Title, Icon } from "../../../common/SmallComps";
import DI from "../../../../../di/ioc";
import { useNotificationStore } from "../../../../../application/stores/notification.store";


type EventCardProps = { event: EventView, change: (e: any) => void, mines?: boolean, update?: () => void }

export function EventCard({ event: initialEvent, change, mines, update }: EventCardProps) {
    const [event, setEvent] = useState<EventView>(initialEvent);
    const { updateNotif, notifList } = useNotificationStore();
    const { id, title, description, category, participantsMin, start, end, createdAt, image, flagged, pourcent = 0, Igo, label, toogleParticipate, agendaLink, eventDateInfo } = event;
    const disabledDelete = pourcent >= 100;
    const disenbleEdit = pourcent > 0;
    const deleteEvent = async (id: number) => await DI.resolve('eventUseCase').deleteEvent(id);
    const actions = GenereMyActions(event, "evenement", deleteEvent);
    const haveImage = Boolean(image);

    return (
        <Card className="FixCard">
            <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"} floated={haveImage}>
                <div className={`${haveImage ? "ChipDiv flex-col justify-between !h-full " : "ChipDivNoImage"}`}>
                    <div className="flex w-full justify-between items-center gap-2">
                        <button onClick={change}>
                            <Chip size='sm' value={label} className="rounded-full h-max CyanChip shadow" />
                        </button>
                        <DateChip start={start} end={end} ended={new Date(end).getTime() < Date.now()} prefix="commence dans" />
                    </div>
                    <div className={` h-max w-full !rounded-full backdrop-blur flex items-center gap-2 shadow p-2`}>
                        {pourcent > 0 ? (
                            <Progress value={pourcent} color={pourcent > 100 ? "green" : "gray"} size="md" label={pourcent > 100 ? "Validé" : " "} />
                        ) : (
                            <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                                <Typography className="mb-0 text-xs font-medium">pas encore de participants</Typography>
                            </div>
                        )}
                    </div>
                </div>
                {image ? (
                    <img
                        src={image as string || './load.gif'}
                        alt={title}
                        className="CardImage" />
                ) : (
                    <Typography variant="h6" color="white" className="mb-2">
                        {title} - {category}
                    </Typography>
                )}
            </CardHeader>
            <CardBody className="FixCardBody">
                <Title title={title} flagged={flagged} id={id} CreatedAt={createdAt} subTitle={eventDateInfo} />
                <Typography className="text-ellipsis overflow-auto max-h-[1.8rem] ">{description}</Typography>
            </CardBody>
            <CardFooter className="CardFooter">
                {!mines ? (
                    <div className="flex w-full items-center gap-2">
                        <Icon icon='calendar_add_on' onClick={() => window.open(agendaLink)} title={`ajouter a mon agenda ${title}`} bg size='2xl' style='border-2 border-white !px-0 h-9 !w-9 flex-0 pt-2 -mr-5 hover:z-10' color={Igo ? "cyan" : "gray"} />
                        <AvatarStack avatarDatas={event.Participants} />
                    </div>
                ) : (
                    <ModifBtnStack disabled1={disenbleEdit} disabled2={disabledDelete} actions={actions} update={update} />
                )}
                <div className="flex items-center gap-2">
                    <button onClick={async () => { toogleParticipate && setEvent(await toogleParticipate()); updateNotif(notifList) }}>
                        <Chip
                            value={participantsMin}
                            variant="ghost"
                            className="rounded-full h-max flex items-center gap-2"
                            icon={<Icon icon="person" fill={Igo} color={Igo ? "cyan" : "gray"} style="-mt-2" title={Igo ? "Je n'y vais plus" : "Je participe"} />}
                        />
                    </button>
                    <Icon icon="arrow_circle_right" link={`/evenement/${id}`} title={`voir les details de ${title}`} size="4xl px-1" fill />
                </div>
            </CardFooter>
        </Card>
    );
}
