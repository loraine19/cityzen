import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { User } from "../../../../domain/entities/User";
import { Flag } from "../../../../domain/entities/Flag";
import { getLabel, flagTargets } from "../../../../utils/GetDataFunctions";

export default function FlagDetailComp(props: { flag: Flag, element?: any, label?: string }) {
    const { flag } = props
    const { createdAt, Post, Event, Survey, Service, target } = flag
    const now = Date.now();
    const element = props.element ? props.element : Post || Event || Survey || Service || { title: "", description: "", User: {} as User }
    const { title, description, User } = element
    const id = flag.targetId
    const navigate = useNavigate();
    const label = props.label ? props.label : getLabel(target, flagTargets)

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className="FixCardHeader NoImage"
                    floated={false}>
                    <div className=" justify-between w-full flex items-end ">
                        <button onClick={() => navigate(`/${label}`)}>
                            <Chip value={label} className="rounded-full h-max text-ellipsis shadow" color="cyan">
                            </Chip>
                        </button>
                        <Chip value={(new Date(createdAt ? createdAt : now)).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                    </div>
                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>
                    </div>
                    <div className="CardOverFlow">
                        <div className="flex items-center justify-between">
                        </div>
                        <Typography color="blue-gray" className="mb-2">
                            {description}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    <div className="flex items-center px-0 gap-2">
                        <Avatar src={User?.Profile?.image as string} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="small" className="font-normal !p-0">{User?.Profile?.firstName} - {User?.Profile?.lastName}</Typography>
                            <Typography variant="small" color="gray" >
                                {User?.Profile?.skills}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to={`/${label}/${id}`}
                            className="flex items-center gap-2" title={`voir les details de ${title}`}>
                            <span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                                arrow_circle_right
                            </span>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}