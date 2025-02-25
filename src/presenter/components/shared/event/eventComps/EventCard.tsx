import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import { useState } from "react";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Title, Icon } from "../../../common/SmallComps";
import { DateChip } from "../../../common/ChipDate";
import DI from "../../../../../di/ioc";
import { useNotificationStore } from "../../../../../application/stores/notification.store";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";

type EventCardProps = {
    event: EventView, refetch?: () => void,
    change: (e: any) => void,
    mines?: boolean
}

export function EventCard({ event: initialEvent, change, mines, refetch }: EventCardProps) {
    const [event, setEvent] = useState<EventView>(initialEvent);
    const { updateNotif } = useNotificationStore();
    const { id, title, description, category, participantsMin, start, end, createdAt, image, flagged, pourcent = 0, Igo, label, toogleParticipate, agendaLink, eventDateInfo } = event;
    const disabledDelete = new Date(start).getTime() < Date.now();
    const disabledEdit = new Date(start).getTime() < Date.now();
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id)
    const actions = GenereMyActions(event, "evenement", deleteEvent);
    const haveImage = Boolean(image);

    return (
        <Card className="FixCard w-respLarge">
            <CardHeader
                className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                floated={haveImage}>
                <div
                    className={`${haveImage ? "ChipDiv flex-col justify-between !h-full " : "ChipDivNoImage"}`}>
                    <div className="flex w-full justify-between items-center gap-2">
                        <button
                            onClick={change}>
                            <Chip
                                size='sm'
                                value={label}
                                className="rounded-full h-max CyanChip shadow" />
                        </button>
                        <DateChip
                            start={start}
                            end={end}
                            ended={new Date(end).getTime() < Date.now()}
                            prefix="commence dans" />
                    </div>
                    <div className={` h-max w-full !rounded-full backdrop-blur flex items-center gap-2 shadow p-2`}>
                        {pourcent > 0 ? (
                            <Progress
                                value={pourcent}
                                color={pourcent > 100 ? "green" : "gray"}
                                size="md"
                                label={pourcent > 100 ? "Validé" : " "} />
                        ) : (
                            <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                                <Typography
                                    className="mb-0 text-xs font-medium">
                                    pas encore de participants
                                </Typography>
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
                <Title
                    title={title}
                    flagged={flagged} id={id}
                    CreatedAt={createdAt}
                    subTitle={eventDateInfo}
                    type='evenement' />
                <Typography className="text-ellipsis overflow-auto max-h-[1.8rem] ">
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter">
                {!mines ? (
                    <div className="flex w-full items-center gap-2">
                        <Icon
                            icon='calendar_add_on'
                            onClick={() => window.open(agendaLink)}
                            title={`ajouter a mon agenda  : ${title}`}
                            bg size='2xl'
                            style='border-2 border-white !px-0 h-9 !w-9 flex-0  -mr-5 hover:z-10'
                            color={Igo ? "cyan" : "gray"} />
                        <AvatarStack avatarDatas={event.Participants} />
                    </div>
                ) : (
                    <ModifBtnStack
                        disabled1={disabledDelete}
                        disabled2={disabledEdit}
                        actions={actions}
                        update={refetch} />
                )}
                <div className="flex items-center gap-2">
                    <button
                        onClick={async () => {
                            const event = toogleParticipate && await toogleParticipate();
                            setEvent(event);
                            updateNotif()
                        }}>
                        <Chip
                            value={participantsMin}
                            variant="ghost"
                            className="rounded-full h-max flex items-center px-4 gap-2"
                            icon={
                                <Icon
                                    icon="person"
                                    fill={event?.Igo}
                                    color={event?.Igo ? "cyan" : "gray"}
                                    style="-mt-2 pl-2"
                                    title={event?.Igo ? "Je n'y vais plus" : "Je participe"} />}
                        />
                    </button>
                    <Icon
                        icon="arrow_circle_right"
                        link={`/evenement/${id}`}
                        title={`voir les details de ${title}`}
                        size="4xl px-1"
                        fill />
                </div>
            </CardFooter>
        </Card>
    );
}
