import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { Link } from "react-router-dom";
import { Skeleton } from "../../../common/Skeleton";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { Title } from "../../../common/CardTitle";
import { ProgressBarBlur } from "../../../common/ProgressBar";
import { ProfileDiv } from "../../../common/ProfilDiv";

type EventCardProps = {
    EventLoad: EventView,
    refetch?: () => void,
    change?: (e: any) => void
}

export function EventDetailCard({ EventLoad, refetch }: EventCardProps) {
    const { id, title, description, label, image, participantsMin, pourcent, Participants, Igo, User, Address, flagged, end, start, toogleParticipate, agendaLink, eventDateInfo, status, isPast, Group } = EventLoad;

    return (
        <div className="DetailCardDiv">
            <Card className="w-respLarge FixCard !h-full">
                <CardHeader className="FixCardHeader ">
                    <div className="ChipDiv flex-col justify-between !h-full">
                        <div className="flex w-full flex-wrap items-center justify-between gap-2">
                            <Chip
                                value={label}
                                className="CyanChip rounded-full h-max shadow"
                                size='sm'>
                            </Chip>
                            <DateChip
                                start={start}
                                end={end}
                                ended={new Date(end).getTime() < Date.now()}
                                prefix={'commence dans '} />
                        </div>
                        <ProgressBarBlur
                            isPast={isPast}
                            label='participants'
                            value={pourcent || 0}
                            status={status as string}
                            size="lg"
                            needed={participantsMin - (Participants?.length || 0)} />
                    </div>
                    < img
                        onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                        src={image as string}
                        alt={title}
                        className='CardImage' />
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title
                        title={title}
                        flagged={flagged}
                        id={id}
                        CreatedAt={start}
                        subTitle={eventDateInfo}
                        type='evenement'
                        group={Group}
                    />
                    <div className="flex flex-1 gap-x-3 py-1.5 flex-col !justify-evenly sm:flex-row">
                        <div className="relative flex flex-col h-full sm:min-w-[50%] lg:min-w-[60%]">
                            <div className="min-h-max break-all absolute ">
                                <Link
                                    to={agendaLink as string}
                                    target="_blank" rel="noopener noreferrer"
                                    className={`${Igo ? 'GreenChip' : 'GrayChip px-3 '} w-max !rounded-full mb-1 py-1 text-xs font-medium flex items-center gap-1`}
                                    title="ajouter a mon agenda">
                                    <Icon
                                        color={Igo ? "green" : "gray"}
                                        icon="calendar_add_on"
                                        size="lg" />
                                    ajouter a mon agenda
                                </Link>
                                <Typography
                                    className="leading-[1.3rem] h-full min-h-max break-normal">
                                    {description}
                                </Typography>
                            </div>
                        </div>
                        <div className=" min-h-[60%] lg:-mt-12 !w-full lg:h-[calc(100%+3rem)] flex-1 rounded-full">
                            {Address ?
                                <AddressMapOpen
                                    address={Address}
                                    message={`${Address.address}, ${Address.zipcode} ${Address.city}`} /> :
                                <Skeleton />}
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter flex justify-between items-center mb-2">
                    <ProfileDiv profile={User} />
                    <div className="flex items-center gap-2 overflow-auto">
                        <AvatarStack avatarDatas={Participants} />
                        <button
                            data-cy='btn-participate'
                            onClick={async () => {
                                toogleParticipate && await toogleParticipate();
                                refetch && refetch()
                            }}>
                            <Chip
                                value={participantsMin}
                                variant="ghost"
                                className="rounded-full GrayChip h-max flex items-center px-4 "
                                icon={
                                    <Icon
                                        icon="person"
                                        size="md"
                                        fill={Igo}
                                        color={Igo ? "cyan" : "gray"}
                                        style=" hover:text-cyan-800 "
                                        title={Igo ? "Je n'y vais plus" : "j'y vais"} />}>

                            </Chip>
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}