import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import UserContext from "../../../../../contexts/user.context";
import { EventP } from "../../../../../domain/entities/Events";
import { Flag } from "../../../../../domain/entities/Flag";
import { defaultEventImage } from "../../../../../domain/entities/frontEntities";
import { Participant } from "../../../../../domain/entities/Participant";
import { getLabel, eventCategories, eventdateInfo, toggleParticipant } from "../../../../../utils/GetDataFunctions";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { DateChip, ProgressLargebar, FlagIcon, ProfileDiv } from "../../../common/SmallComps";


type EventCardProps = { Event: EventP, change?: (e: any) => void, setEvent?: any }
export function EventDetailCard(props: EventCardProps) {
    const { Event, setEvent } = props
    const { id, title, description, category, participantsMin, Participants, User, Address, Flags, end, start } = Event
    const { userProfile } = useContext(UserContext)
    const userId: number = userProfile.userId
    const Igo: boolean = Participants.find((participant: Participant) => participant.userId === userId) ? true : false
    const flagged: boolean = Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const pourcentParticipants: number = Math.floor((Participants.length) / participantsMin * 100)
    const imgCategory: string | undefined | Blob = (defaultEventImage.find(categoryD => categoryD.type === category.toString()) ?
        defaultEventImage.find(categoryD => categoryD.type === category.toString())?.image : defaultEventImage[0].image);
    const [image] = useState<string>(props.Event.image ? (props.Event.image) as any : (imgCategory));
    const author = User.Profile

    return (
        <div className="pt-6 pb-1 h-full flex">
            <Card className="w-respLarge FixCard">
                <CardHeader className="FixCardHeader min-h-[28vh]">
                    <div className="absolute h-full w-full z-70 p-4  flex flex-col  justify-between items-end ">
                        <div className="flex w-full items-center justify-between gap-2">
                            <Chip value={getLabel(category, eventCategories)} className="rounded-full h-max shadow" color="cyan">
                            </Chip>
                            <DateChip start={start} end={end} ended={new Date(end).getTime() < Date.now()} prefix={'commence dans '} />
                        </div>
                        <ProgressLargebar value={pourcentParticipants} float={true} label="Participants" />
                    </div>
                    <img src={image} alt={title} className="h-full w-full object-cover" />
                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="flex flex-col mb-1">
                            {title}<br></br>
                            <span className="text-sm font-medium text-blue-gray-500">{eventdateInfo(props.Event)}</span>
                        </Typography>
                        <FlagIcon flagged={flagged} id={id} type="event" />
                    </div>
                    <div className=" flex  flex-col flex-1 gap-x-3 py-1 lg:flex-row">
                        <div className=" relative flex flex-col  flex-auto overflow-auto">
                            <div className="h-max break-all absolute ">
                                <Typography >
                                    {description}
                                </Typography>
                            </div>
                        </div>
                        <div className=" !w-full !mt-1 flex-1 rounded-full">
                            {Address ? <AddressMapOpen address={Address} message={title} /> : <Skeleton />}
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter flex justify-between items-center mb-2">
                    <ProfileDiv profile={author} />
                    <div className="flex items-center gap-2">
                        <AvatarStack avatarDatas={Participants} />
                        <button onClick={() => toggleParticipant(id, userId, setEvent)}>
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