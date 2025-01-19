import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { Service, ServiceType } from "../../../../../domain/entities/Service";
import { getLabel, serviceTypes, GetPoints, serviceCategories, isLate, serviceStatus } from "../../../../../infrastructure/services/utilsService";
import { Icon } from "../../../common/SmallComps";


export default function ServiceIssueCard(props: { service: Service }) {
    const [service, setService] = useState<Service>(props.service)
    const { id, title, description, createdAt, User, UserResp } = props.service
    const haveImage = false
    const type = getLabel(service.type, serviceTypes)
    const points = GetPoints(service, User.Profile)
    const category = getLabel(service.category, serviceCategories)
    const navigate = useNavigate();
    const late: boolean = isLate(createdAt, 15)
    const [status, setStatus] = useState<string>(getLabel(service.status, serviceStatus));
    const [isNew, setIsNew] = useState<boolean>(status === 'nouveau' ? true : false);
    const [isResp, setIsResp] = useState<boolean>(status === 'en attente' ? true : false);
    const [isValidated, setIsValidated] = useState<boolean>(status === 'en cours' ? true : false);
    const [isFinish, setIsFinish] = useState<boolean>(status === 'terminé' ? true : false);

    console.log(isNew, isResp, isValidated, isFinish, navigate);
    const updateStatusFlags = (status: string) => {
        setIsNew(status === 'nouveau');
        setIsResp(status === 'en attente');
        setIsValidated(status === 'en cours');
        setIsFinish(status === 'terminé');
    };

    useEffect(() => {
        setService(props.service)
        setStatus(getLabel(service.status, serviceStatus));
        updateStatusFlags(status)
    }, [props.service])

    return (
        <>
            <div className="flex flex-col w-full ">
                <Card className={`CardFix  bg-blue-gray-50  `}>
                    <CardHeader className={`bg-transparent shadow-none`}
                        floated={false}>
                        <div className={` ${haveImage && "absolute p-2"} h-max w-full flex justify-between`}>
                            <div className="flex items-start  md:items-center gap-2 mb-1">
                                <button onClick={(e: any) => { console.log(e) }}>
                                    <Chip size='sm' value={`${category}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
                                    </Chip>
                                </button>
                                <button onClick={(e: any) => { console.log(e) }}>
                                    <Chip size='sm' value={type} className={`${service.type === ServiceType.GET ? "OrangeChip" : "GreenChip"} rounded-full  h-max flex items-center gap-2 font-medium `}>
                                    </Chip>
                                </button>
                            </div>
                            <div className="flex items-center gap-2 flex-row">
                                {/* <Chip size='sm' value={status} className={` rounded-full h-max flex items-center gap-2 font-medium `}>
                                </Chip> */}
                                <Chip size='sm' value={(new Date(createdAt)).toLocaleDateString('fr-FR')} className={`${late ? "RedChip" : "GrayChip"} rounded-full  h-max flex items-center gap-2 shadow font-medium `}>
                                </Chip>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className={` FixCardBody !flex-1 !py-0`}>
                        <div className="flex  h-full">
                            <div className="flex flex-col flex-1 gap-2">
                                <Typography variant="h6" color="blue-gray" className="truncate max-w-[40vw] lg:max-w-[20vw] pr-2">
                                    {title}
                                </Typography>
                                <Typography color="blue-gray" variant="small" className="flex-1 pr-2 max-h-[2.5rem] overflow-auto">
                                    {description}...
                                </Typography>
                                <div className="flex  px-0 gap-2">
                                    <Avatar src={User.Profile?.image as string} size="sm" alt="avatar" withBorder={true} />
                                    <div className=" flex flex-col">
                                        <Typography variant="small" className="font-normal !p-0">{User.Profile?.firstName} </Typography>
                                        <Typography variant="small" className="font-normal !p-0"> {User.Profile?.lastName}</Typography>

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col pt-1 items-end border-l-[1px] border-gray-400  gap-2">
                                <Typography variant="h6" color="blue-gray" className="text-right">
                                    à réaliser le service
                                </Typography>
                                <div
                                    className="flex flex-row-reverse items-end gap-2 ">
                                    <Avatar src={UserResp.Profile?.image as string} size="sm" alt="avatar" withBorder={true} />
                                    <div className="flex flex-col items-end">
                                        <Typography variant="small" className="font-normal !p-0">{UserResp.Profile?.firstName}
                                        </Typography>
                                        <Typography variant="small" className="font-normal !p-0">{UserResp.Profile?.lastName}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="CardFooter w-full h-max ">
                        <div className="flex justify-between flex-1 gap-2">
                            <div className="flex items-center gap-2">
                                <Typography variant="h5" >
                                    {points[1] && <span className="!text-[1.2rem] font-light">de </span>}
                                    {points[0]}
                                    {points[1] && <>  <span className="!text-[1.2rem] font-light">à</span> {points[1]}</>}
                                    <span className="!text-[1.2rem] font-light"> points</span></Typography>
                            </div>
                            <Icon icon="arrow_circle_right" link={`/service/${id}`} title={`voir les details de service  ${title}`} size="4xl px-1" fill />
                        </div>
                    </CardFooter>
                </Card >
            </div >
        </>
    )
}