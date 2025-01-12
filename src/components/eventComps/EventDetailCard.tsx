import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress, Avatar } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import { useContext, useState } from "react";
import { eventdateInfo, toggleParticipant } from "../../functions/GetDataFunctions";
import { EventP, Flag, Participant } from '../../types/class';
import { defaultEventImage } from "../../datas/enumsCategories";
import UserContext from "../../contexts/user.context";
import Skeleton from "react-loading-skeleton";
import AddressMapOpen from "../mapComps/AddressMapOpen";
import { DateChip, FlagIcon } from "../UIX/SmallComps";

type EventCardProps = { Event: EventP, change?: (e: any) => void, setEvent?: any }
export function EventDetailCard(props: EventCardProps) {
    const { Event, setEvent } = props
    const { id, title, description, category, participantsMin, Participants, User, Address, Flags, end, start } = Event
    const user = useContext(UserContext)
    const userId = user.user.userId
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
                        <DateChip createdAt={start} ended={new Date(end).getTime() > Date.now()} />
                        <div className={image ? "h-max w-full !rounded-full  backdrop-blur flex items-center gap-2 shadow p-2" : " !rounded-full bg-cyan-200 backdrop-blur flex items-center gap-2 shadow p-2"}>
                            {pourcentParticipants > 0 ? <Progress value={pourcentParticipants} color={pourcentParticipants >= 100 ? "green" : "gray"} size="md"
                                label={pourcentParticipants >= 100 ? " Validé" : ' '} /> :
                                <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                                    <Typography className="mb-0 text-xs font-medium"> pas encore de participants</Typography>
                                </div>}
                        </div>
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
                <CardFooter className="CardFooter flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center pb-2 gap-2">
                            <Avatar src={author?.image as string} size="sm" alt="avatar" withBorder={true} />
                            <div>
                                <Typography variant="small" className="font-normal !p-0">{author?.firstName} - {author?.lastName}</Typography>
                                <Typography variant="small" color="gray" className="truncate text-ellipsis">
                                    ◦ {author?.skills}
                                </Typography>
                            </div>
                        </div>
                        <AvatarStack avatarDatas={Participants} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={(e: any) => console.log(e)}>
                            <Chip value={category} className="rounded-full h-max" color="cyan">
                            </Chip>
                        </button>
                        <button onClick={() => toggleParticipant(id, userId, setEvent)}>
                            <Chip value={participantsMin} variant="ghost" className="rounded-full h-max flex items-center pr-3 pl-6 pt-2"
                                icon={<span className={`${Igo && "fill !text-cyan-500"} material-symbols-outlined !text-[1.2rem] pt-0.5 pl-2`}>person</span>}>
                            </Chip></button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}