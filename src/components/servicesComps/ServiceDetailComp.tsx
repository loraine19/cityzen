import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Profile, Service } from "../../types/class";
import { GetCategory, GetPoints } from "../../functions/GetDataFunctions";
import DataContext from "../../contexts/data.context";
import { useContext } from "react";
import UserContext from "../../contexts/user.context";
import { serviceCategories } from "../../datas/enumsCategories";

export default function ServiceDetailComp(props: { service: Service, mines?: boolean, change: (e: any) => void, isFlaged?: boolean, handleValidate: (id: number) => void }) {
    const { user } = useContext(UserContext)
    const { service, isFlaged } = props
    const { id, title, description, image, created_at, user_id_resp, user_id } = props.service
    const { data } = useContext(DataContext);
    const haveImage = service.image ? true : false
    const userAuthor = data.profiles.find((user: Profile) => user.user_id === user_id)
    const isMine = (user.user_id === user_id || user.user_id === user_id_resp) ? true : false

    const category = GetCategory(service, serviceCategories)
    const type = service.type === "get" ? "demande" : "offre";
    const isResp = service.status === 1 ? true : false
    const isValidated = service.status === 2 ? true : false
    const isFinish = service.status === 3 ? true : false
    const userResp = data.profiles.find((user: Profile) => user.user_id === user_id_resp)
    const points = GetPoints(service, userAuthor, userResp)
    let button = isResp && "en attente" || isValidated && "en cours" || isFinish && "terminé"

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className={haveImage ? "FixCardHeader min-h-[28vh]" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={`${!haveImage ? "relative" : "absolute"}  top-0 p-2 justify-between w-full flex items-end `}>
                        <div className="flex items-center gap-2 mb-1">
                            <Chip value={`${category}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
                            </Chip>

                            <Chip value={type} className={`${service.type === "get" ? "OrangeChip" : "GreenChip"} rounded-full  h-max flex items-center gap-2 font-medium `}>
                            </Chip>
                        </div>
                        <Chip value={(new Date(created_at)).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                    </div>
                    {image &&

                        <img
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    }
                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>

                        <Link to={`/flag/post${id}`} title={`signaler un problème sur ${title}`}>
                            <span className={`${isFlaged && "fill !text-red-500"} material-symbols-outlined !text-[1.2rem] opacity-80`}>flag_2</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <Chip value={service.skill} size="lg" className=" GrayChip  px-5 rounded-full h-full flex items-center justify-center"
                            icon={<span className={`pl-1 material-symbols-outlined unFillThin !text-[1.5rem]`}>design_services</span>}>
                        </Chip>
                        <Chip value={service.skill} size="lg" className=" GrayChip px-4 rounded-full h-full flex items-center justify-center gap-5"
                            icon={<span className={`  material-symbols-outlined unFillThin !text-[1.5rem]`}>signal_cellular_alt</span>}>
                        </Chip>
                    </div>

                    <div className="CardOverFlow h-full ">
                        <div className="flex  h-full md: gap-8">
                            <Typography color="blue-gray" className="flex-1 border-r-2 pr-4">
                                {description}
                            </Typography>
                            {isMine && isResp &&
                                <div className="flex w-[40%] flex-col justify-between items-end  gap-2">
                                    <Typography variant="h6" color="blue-gray" className="text-right">

                                        {isMine ? "Réponse" : "Vous avez repondu"} <br></br>à la   {type}
                                    </Typography>
                                    <div
                                        className="flex flex-col items-end gap-2"> <Avatar src={userResp?.avatar} size="sm" alt="avatar" withBorder={true} />
                                        <div className="flex flex-col">
                                            <Typography variant="small" className="font-normal !p-0">{userResp?.firstName} - {userResp?.lastName}</Typography>
                                            <Typography variant="small" color="gray" >
                                                {userResp?.skills?.join(', ')}
                                            </Typography>

                                        </div>
                                        <Chip value={button} className={`${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip"} rounded-full h-max flex items-center gap-2 font-medium `}></Chip>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </CardBody>

                <CardFooter className="CardFooter">
                    {userAuthor?.user_id !== user.user_id && <div className="flex items-center px-0 gap-2">
                        <Avatar src={userAuthor?.avatar} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="small" className="font-normal !p-0">{userAuthor?.firstName} - {userAuthor?.lastName}</Typography>
                            <Typography variant="small" color="gray" >
                                {userAuthor?.skills?.join(', ')}
                            </Typography>
                        </div>
                    </div>}

                    <div className="flex items-center gap-2">
                        <Typography variant="h2" >
                            {points[1] && <span className="!text-[1.2rem] font-light">de </span>}
                            {points[0]}
                            {points[1] && <>  <span className="!text-[1.2rem] font-light">à</span> {points[1]}</>}
                            <span className="!text-[1.2rem] font-light"> points</span></Typography>
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}