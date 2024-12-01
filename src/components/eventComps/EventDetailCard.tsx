import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress, Avatar } from "@material-tailwind/react";
import { avatarData, event, adressGps } from '../../types/type'
import { Link } from "react-router-dom";
import { AvatarStack } from "./AvatarStack";
import { MapComp } from "../mapComps/MapComp";
import { useEffect, useState } from "react";
import { GetAdressGps } from "../../functions/GeoMapFunction";
import { eventdateInfo } from "../../functions/GetDataFunctions";
import { usersFaker } from "../../datas/fakers/usersFaker";
import { userProfile } from '../../types/user';

type EventCardProps = { event: event, avatarDatas: avatarData[], change?: (e: any) => void, mines?: boolean }

export function EventDetailCard(props: EventCardProps) {
    const { id, title, image, description, category, participants, start, adress, users, user_id } = props.event
    const { avatarDatas } = props
    const date = new Date(start)
    const daysBefore: number = ((date.getTime() - (new Date(Date.now())).getTime()) / 1000 / 60 / 60 / 24)
    const pourcentParticipants: number = Math.floor((avatarDatas.length) / participants * 100)
    let dateClass = daysBefore < 15 && pourcentParticipants < 100 ? "OrangeChip" : "GrayChip";
    const [adressGps, setAdressGps] = useState<adressGps>({ lat: 0, lng: 0 })
    const userOrga: userProfile | undefined = usersFaker.find(userF => userF.id === user_id) ? usersFaker.find(userP => userP.id === user_id) : usersFaker[0]

    useEffect(() => {
        const loadGps = async () => {
            const adressGpsLoaded = await GetAdressGps(adress);
            adressGpsLoaded && setAdressGps(adressGpsLoaded)
        }
        loadGps()
    }, [])


    return (
        <div className="pt-6 pb-1 h-full flex">
            <Card className="w-respLarge FixCard">
                <CardHeader className="FixCardHeader min-h-[28vh]">
                    <div className="absolute h-full w-full z-70 p-4  flex flex-col  justify-between items-end ">
                        <Chip value={date.toLocaleDateString('fr-FR')} className={`${dateClass}` + ` w-max rounded-full h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                        <div className={image ? "h-max w-full !rounded-full  backdrop-blur flex items-center gap-2 shadow p-2" : " !rounded-full bg-cyan-200 backdrop-blur flex items-center gap-2 shadow p-2"}>
                            {pourcentParticipants > 0 ? <Progress value={pourcentParticipants} color={pourcentParticipants === 100 ? "green" : "gray"} size="md"
                                label={" "} /> :
                                <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                                    <Typography className="mb-0 text-xs font-medium"> pas encore de participants
                                    </Typography></div>}
                        </div></div>
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                    />

                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="flex flex-col mb-1">
                            {title}<br></br>
                            <span className="text-sm font-medium text-blue-gray-500">{eventdateInfo(props.event)}</span>
                        </Typography>
                        <Link to={`/flag/event${id}`} title={`signaler un problème sur ${title}`}>
                            <span className="material-symbols-outlined !text-[1.2rem] opacity-80">flag_2</span>
                        </Link>
                    </div>
                    <div className=" flex  flex-col flex-1 gap-2 py-1 lg:flex-row">
                        <div className="flex-1 relative overflow-auto">
                            <div className=" break-all absolute flex-1 ">
                                <Typography>
                                    {description}
                                </Typography>
                            </div>
                        </div>

                        <div className="bg-cyan-200 flex-1 rounded-full">
                            <MapComp adressGpsEvent={adressGps} />
                        </div>
                    </div>

                </CardBody>
                <CardFooter className="CardFooter flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center pb-2 gap-2">
                            <Avatar src={userOrga?.avatar} size="sm" alt="avatar" withBorder={true} />
                            <div>
                                <Typography variant="small" className="font-normal !p-0">{userOrga?.firstName} - {userOrga?.lastName}</Typography>
                                <Typography variant="small" color="gray" >
                                    {userOrga?.skills?.join(", ")}
                                </Typography>
                            </div>

                        </div>
                        <button onClick={(e: any) => console.log(e)}>
                            <Chip value={category} className="rounded-full h-max" color="cyan">
                            </Chip>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <AvatarStack avatarDatas={users} />
                        <Chip value={participants} variant="ghost" className="rounded-full h-max flex items-center gap-2"
                            icon={<span className="material-symbols-outlined fill !text-[1.2rem]">person</span>}>
                        </Chip>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}