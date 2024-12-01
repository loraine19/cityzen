import { Card, CardBody, CardFooter, Typography, Chip, Button, CardHeader } from "@material-tailwind/react";
import { flag } from "../../types/type";
import { Link } from "react-router-dom";
import { GetPathElement } from "../../functions/GetDataFunctions";

type flagCardProps = { flag: flag, handleClick: (id: any) => void }

export function FlagCard(props: flagCardProps) {
    const { element, target_id, reason, created_at, } = props.flag
    const { handleClick } = props
    const type = GetPathElement(props.flag.type)

    return (
        <Card className="w-resp FixCard !h-max ">
            <CardHeader className="FixCardHeader NoImage" floated={false}>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 ">
                        <Chip value={type} className="rounded-full h-max text-ellipsis  " color="cyan">
                        </Chip>

                        <Chip value={reason} className={` rounded-full OrangeChip h-max flex items-center gap-2 font-medium `}>
                        </Chip>

                    </div>

                    <div className="flex items-center gap-1">
                        <Link to={`/flag/${props.flag.type + target_id}`} className="flex items-center gap-2" title={`voir les details de ${element.title}`}><span className="material-symbols-outlined unFillThin !text-4xl text-orange-800  fillThin">
                            update
                        </span>
                        </Link>


                        <Button variant="text" onClick={() => handleClick(props.flag)} className="flex justify-center items-center rounded-full h-8 w-8 p-4 opacity-60">
                            <span className="material-symbols-outlined unFillThin  !text-4xl" >cancel</span>
                        </Button></div></div>
            </CardHeader>
            <CardBody className="FixCardBody">
                <Typography color="gray" className="font-normal">
                    {element.title}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center !px-4">

                <Chip value={new Date(created_at).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2  `}>
                </Chip>

                <Link to={`/${type}/${target_id}`} className="flex items-center gap-2" title={`voir les details de ${element.title}`}><span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                    arrow_circle_right
                </span>
                </Link>

            </CardFooter>
        </Card>

    );
}