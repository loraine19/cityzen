import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { all } from "../../types/type";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { usersFaker } from "../../datas/fakers/usersFaker";
import { GetPathElement } from "../../functions/GetDataFunctions";



export default function FlagDetailComp(props: { flag: all }) {
    const { created_at, id, user_id, element } = props.flag
    const { title, description } = element
    const author = user_id ? usersFaker.find((user: any) => user.id === user_id) : usersFaker[0]
    const type = GetPathElement(props.flag.type)
    const navigate = useNavigate();


    /// .FixCard
    // .FixCardHeader
    // .FixCardBody
    // .CardOverFlow
    /// .CardFooter
    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className="FixCardHeader NoImage"
                    floated={false}>
                    <div className=" justify-between w-full flex items-end ">
                        <button onClick={() => navigate(`/${type}`)}>
                            <Chip value={type} className="rounded-full h-max text-ellipsis shadow" color="cyan">
                            </Chip>
                        </button>
                        <Chip value={(new Date(created_at)).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
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
                        <Avatar src={author?.avatar} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="small" className="font-normal !p-0">{author?.firstName} - {author?.lastName}</Typography>
                            <Typography variant="small" color="gray" >
                                Web Developer
                            </Typography>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to={`/${type}/${id}`} className="flex items-center gap-2" title={`voir les details de ${title}`}><span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                            arrow_circle_right
                        </span>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}