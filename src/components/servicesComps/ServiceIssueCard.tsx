import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Profile, Service } from "../../types/class";
import { useContext } from "react";
import DataContext from "../../contexts/data.context";
import { GetCategory, GetPoints, isLate } from "../../functions/GetDataFunctions";
import { serviceCategories } from "../../datas/enumsCategories";

export default function ServiceComp(props:
    {
        service: Service,
        mines?: boolean,
        isFlaged?: boolean
    }) {

    const { data } = useContext(DataContext);
    const { service, } = props
    const { id, title, description, created_at, user_id, user_id_resp } = props.service
    const haveImage = false
    const userAuthor = data.profiles.find((user: Profile) => user.user_id === user_id)
    const userResp = data.profiles.find((user: Profile) => user.user_id === user_id_resp)
    const type = service.type === "get" ? "la demande" : "l' offre"
    const points = GetPoints(service, userAuthor, userResp)
    const category = GetCategory(service, serviceCategories)
    const late = isLate(created_at, 15)
    const isResp = service.status === 1 ? true : false
    const isValidated = service.status === 2 ? true : false
    const isFinish = service.status === 3 ? true : false
    let button = isResp && "en attente" || isValidated && "en cours" || isFinish && "terminé" || 'nouveau'


    return (
        <>
            <div className="flex flex-col w-full ">
                <Card className={`CardFix  bg-blue-gray-50  `}>
                    <CardHeader className={`bg-transparent shadow-none`}
                        floated={false}>
                        <div className={` ${haveImage && "absolute p-2"} h-max w-full flex justify-between`}>
                            <div className="flex items-start  md:items-center gap-2 mb-1">
                                <button onClick={(e: any) => { console.log(e) }}>
                                    <Chip value={`${category}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
                                    </Chip>
                                </button>
                                <button onClick={(e: any) => { console.log(e) }}>
                                    <Chip value={type} className={`${service.type === "get" ? "OrangeChip" : "GreenChip"} rounded-full  h-max flex items-center gap-2 font-medium `}>
                                    </Chip>
                                </button>
                            </div>


                            <div className="flex items-center gap-2 flex-row">
                                <Chip value={button} className={` rounded-full h-max flex items-center gap-2 font-medium `}>

                                </Chip>
                                <Chip value={(new Date(created_at)).toLocaleDateString('fr-FR')} className={`${late ? "RedChip" : "GrayChip"} rounded-full  h-max flex items-center gap-2 shadow font-medium `}>
                                </Chip>

                            </div>
                        </div>

                    </CardHeader>
                    <CardBody className={` FixCardBody !flex-1`}>

                        <div className="flex  h-full">
                            <div className="flex flex-col flex-1 gap-2">
                                <Typography variant="h6" color="blue-gray">
                                    {title}
                                </Typography>

                                <Typography color="blue-gray" className="flex-1 pr-2 max-h-[3rem] overflow-auto">
                                    {description}...
                                </Typography>
                                <div className="flex flex-col  px-0 gap-2">
                                    <Avatar src={userAuthor?.avatar} size="sm" alt="avatar" withBorder={true} />
                                    <div className=" flex flex-col">
                                        <Typography variant="small" className="font-normal !p-0">{userAuthor?.firstName} - {userAuthor?.lastName}</Typography>

                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-1 flex-col justify-between items-end border-l-[1px] border-gray-400  gap-2">
                                <Typography variant="h6" color="blue-gray" className="text-right">

                                    à répondu    {type}
                                </Typography>
                                <div
                                    className="flex flex-col items-end gap-2 ">
                                    <Avatar src={userResp?.avatar} size="sm" alt="avatar" withBorder={true} />
                                    <div className="flex flex-col">
                                        <Typography variant="small" className="font-normal !p-0">{userResp?.firstName} - {userResp?.lastName}</Typography>
                                        <Typography variant="small" color="gray" >
                                            {userResp?.skills?.join(', ')}
                                        </Typography>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="CardFooter w-full h-max !pt-0  ">
                        <div className="flex justify-between flex-1 gap-2">
                            <div className="flex items-center gap-2">
                                <Typography variant="h5" >
                                    {points[1] && <span className="!text-[1.2rem] font-light">de </span>}
                                    {points[0]}
                                    {points[1] && <>  <span className="!text-[1.2rem] font-light">à</span> {points[1]}</>}
                                    <span className="!text-[1.2rem] font-light"> points</span></Typography>
                            </div>
                            <Link to={`/service/${id}`} className="flex items-center gap-2" title={`voir les details de service  ${title}`}><span className="material-symbols-outlined FillThin !text-[2.5rem] text-gray-900  fillThin">
                                arrow_circle_right
                            </span>
                            </Link>
                        </div>
                    </CardFooter>
                </Card >
            </div >
        </>
    )
}