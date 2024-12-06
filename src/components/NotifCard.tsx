import { Card, CardBody, CardFooter, Typography, Chip, Button, CardHeader } from "@material-tailwind/react";
import { notif } from "../types/type";
import { Link } from "react-router-dom";
import { GetPathElement } from "../functions/GetDataFunctions";

type notifCardProps = { notif: notif, handleClick: (notif: notif) => void }

export function NotifCard(props: notifCardProps) {
    const { type, relation, element, created_at } = props.notif
    const { handleClick, notif } = props
    const pathElement = type === "post" ? "annonce" : type === "event" ? "evenement" : type === "survey" ? "sonadge" : type === "pool" ? "sondage" : type === "service" ? "service" : ""
    const relationName = relation === "mines" ? "J'ai ecris " : relation === "ImIn" ? "J'y participes" : ""

    return (
        <Card className="w-resp !h-max FixCard">
            <CardHeader className="FixCardHeader NoImage" floated={false}>
                <div className="flex w-full items-start justify-between">
                    <div className="flex items-center gap-2 mb-1">
                        <Chip value={GetPathElement(type)} className="rounded-full h-max text-ellipsis  " color="cyan">
                        </Chip>
                        <Chip value={relationName} className={`${relation !== 'mines' && '!grayscale'} rounded-full OrangeChip h-max flex items-center gap-2 font-medium `}>
                        </Chip>

                    </div>
                    <Button variant="text" onClick={() => handleClick(notif)} className="flex justify-center items-center rounded-full h-8 w-8 p-4 opacity-60">
                        <span className="material-symbols-outlined unFillThin  !text-4xl" >cancel</span>
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="FixCardBody">
                <Typography color="gray" className="font-normal">
                    {element.title}
                </Typography>

            </CardBody>
            <CardFooter className="CardFooter items-center !px-4">
                <Chip value={new Date(created_at).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2  `}>
                </Chip>
                <Link to={`/${pathElement}/${element.id}`} className="flex items-center gap-2" title={`voir les details de ${element.title}`}><span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                    arrow_circle_right
                </span>
                </Link>
            </CardFooter>
        </Card>

    );
}