import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { DateChip, ProgressLargebar, ProfileDiv, Title } from "../../../common/SmallComps";
import { Link } from "react-router-dom";
import { Skeleton } from "../../../common/Skeleton";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";

type EventCardProps = { EventLoad: EventView, refetch?: () => void, change?: (e: any) => void }
export function EventDetailCard(props: EventCardProps) {
    const { EventLoad, refetch } = props
    const { id, title, description, label, image, participantsMin, pourcent, Participants, Igo, User, Address, flagged, end, start, toogleParticipate, agendaLink, eventDateInfo, } = EventLoad;
    const author = User?.Profile

    return (
        <div className="pt-6 pb-1 h-full flex">
            <Card className="w-respLarge FixCard !h-full">
                <CardHeader className="FixCardHeader">
                    <div className="ChipDiv flex-col justify-between !h-full">
                        <div className="flex w-full items-center justify-between gap-2">
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
                        <ProgressLargebar
                            value={pourcent || 0}
                            float={true}
                            label="Participants" />
                    </div>
                    < img
                        src={image as string}
                        alt={title}
                        className="h-full w-full object-cover" />
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title
                        title={title}
                        flagged={flagged}
                        id={id}
                        CreatedAt={start}
                        subTitle={eventDateInfo}
                        type='evenement' />
                    <div className="flex flex-1 gap-x-3 py-1 md:flex-row">
                        <div className=" relative flex lex-col  flex-auto overflow-auto">
                            <div className="h-max break-all absolute ">
                                <Link
                                    to={agendaLink as string}
                                    target="_blank" rel="noopener noreferrer"
                                    className={`${Igo ? 'GreenChip' : 'GrayChip'} w-max rounded-full mb-1 py-0.5 px-2 text-xs font-medium flex items-center gap-1`}
                                    title="ajouter a mon agenda">
                                    <span className="material-symbols-outlined !text-[1.2rem] !m-0 !pt-0.5">
                                        calendar_add_on
                                    </span>
                                    ajouter a mon agenda
                                </Link>
                                <Typography >
                                    {description}
                                </Typography>
                            </div>
                        </div>
                        <div className=" !w-full !mt-1 flex-1 rounded-full">
                            {Address ?
                                <AddressMapOpen
                                    address={Address}
                                    message={title} /> :
                                <Skeleton />}
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter flex justify-between items-center mb-2">
                    <ProfileDiv profile={author} />
                    <div className="flex items-center gap-2">
                        <AvatarStack avatarDatas={Participants} />
                        <button onClick={async () => { toogleParticipate && await toogleParticipate() && refetch && refetch() }}>
                            <Chip value={participantsMin} variant="ghost" className="rounded-full h-max flex items-center pr-3 pl-6 pt-2"
                                icon={<span className={`${Igo && "fill !text-cyan-500"} material-symbols-outlined !text-[1.2rem] pt-0.5 pl-2`}>person</span>}>
                            </Chip>
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}