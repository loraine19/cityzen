import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AvatarStack } from "./AvatarStack";
import ModifBtnStack from "../ModifBtnStack";
import { eventdateInfo } from "../../functions/GetDataFunctions";
import { useState } from "react";
import { EventP, Participant, } from "../../types/class";

type EventCardProps = { event: EventP, avatarDatas: Participant[], change: (e: any) => void, mines?: boolean, handleClickDelete: (id: number) => void, index: number, isFlaged?: boolean, isWithMe?: boolean, handleGo: (event: EventP) => void }

export function EventCard(props: EventCardProps) {
    const { id, title, description, category, participantsMin, start } = props.event
    const { avatarDatas, change, mines, isWithMe } = props
    const date = new Date(start)
    const now = new Date(Date.now())
    const daysBefore: number = ((date.getTime() - now.getTime()) / 1000 / 60 / 60 / 24)
    const pourcentParticipants: number = Math.floor((avatarDatas?.length) / participantsMin * 100)
    let dateClass = daysBefore < 15 && pourcentParticipants < 100 ? "OrangeChip" : "GrayChip";
    const disabledEditCTA = pourcentParticipants >= 100 ? true : false

    const imgCategory: string = ''
    // const imgCategory: string | undefined | Blob = (defaultEventImage.find(categoryD => categoryD.type === category.toLocaleLowerCase()) ?
    //     defaultEventImage.find(categoryD => categoryD.type === category.toLocaleLowerCase())?.image
    //     : defaultEventImage[0].image);

    const [image] = useState<string>(props.event.image ? (props.event.image) as any : (imgCategory));
    let haveImage = image ? true : false



    return (
        <div className="pt-8">
            <Card className="FixCard w-resp !h-max ">
                <CardHeader className={haveImage ? "FixCardHeader !max-h-[26vh] " : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={` ${haveImage ? "absolute h-full w-full flex flex-col justify-between items-end px-2 py-2" : "flex gap-4"} h-full w-full flex justify-end `}>
                        <Chip value={date.toLocaleDateString('fr-FR')} className={`${dateClass}
                            rounded-full w-max h-max`}>
                        </Chip>
                        <div className={`${!haveImage && "bg-blue-gray-100"}  h-max w-full !rounded-full backdrop-blur flex items-center gap-2 shadow p-2`}>
                            {pourcentParticipants > 0 ? <Progress value={pourcentParticipants} color={pourcentParticipants === 100 ? "green" : "gray"} size="md"
                                label={" "} /> :
                                <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                                    <Typography className="mb-0 text-xs font-medium"> pas encore de participantsMin
                                    </Typography></div>}
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
                        <Link to={`/flag${props.isFlaged ? '/edit' : ''}/event${id}`} title={`signaler un problème sur ${title}`}>
                            <span className={`${props.isFlaged && "fill !text-red-500"} material-symbols-outlined !text-[1.2rem] opacity-80`}>flag_2</span>
                        </Link>
                    </div>

                    <Typography className=" text-ellipsis overflow-auto max-w-[75vw] h-[1.8rem]">
                        {description}
                    </Typography>

                </CardBody>
                <CardFooter className="CardFooter">
                    {!mines ? <div className="flex items-center gap-2">
                        <button onClick={(e: any) => change(e)}>
                            <Chip value={category} className="rounded-full h-max" color="cyan">
                            </Chip></button>
                        <AvatarStack avatarDatas={avatarDatas} />
                    </div> :
                        <ModifBtnStack id={id} disabledEdit={disabledEditCTA} handleClickDelete={props.handleClickDelete} />}
                    <div className="flex items-center gap-2">
                        <button onClick={() => props.handleGo(props.event)}>
                            <Chip value={participantsMin} variant="ghost" className="rounded-full h-max flex items-center gap-2"
                                icon={<span className={`${isWithMe && "fill !text-cyan-500"} material-symbols-outlined !text-[1.2rem]`}>person</span>}>
                            </Chip></button>
                        <Link to={`/evenement/${id}`} className="flex items-center gap-2" title={`voir les details de ${title}`}><span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                            arrow_circle_right
                        </span>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div >
    );
}