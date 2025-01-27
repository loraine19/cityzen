import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ServiceStep, ServiceView } from "../../../../../domain/entities/Service";
import { isLate, getEnumVal, GenereMyActions, toggleResp } from "../../../../../infrastructure/services/utilsService";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip, Title, ProfileDiv, Icon } from "../../../common/SmallComps";
import { Action } from "../../../../../domain/entities/frontEntities";
import { useUserStore } from "../../../../../application/stores/user.store";
import DI from "../../../../../di/ioc";



export default function ServiceComp(props:
    { service: ServiceView, mines?: boolean, change: (e: any) => void, update?: () => void }) {
    const { user } = useUserStore()
    const userId: number = user.id
    const { mines, change, update } = props
    const [service, setService] = useState<ServiceView>(props.service)
    const { id, title, description, image, createdAt, User, flagged, mine, IResp, points, typeS, type, categoryS, statusS } = service
    const haveImage = service.image ? true : false
    const navigate = useNavigate();
    const late: boolean = isLate(createdAt, 15)
    const [isNew, setIsNew] = useState<boolean>(status === 'nouveau' ? true : false)
    1 > 2 && console.log(isNew)
    const [isResp, setIsResp] = useState<boolean>(status === 'en attente' ? true : false);
    const [isValidated, setIsValidated] = useState<boolean>(status === 'en cours' ? true : false);
    const [isFinish, setIsFinish] = useState<boolean>(status === 'terminé' ? true : false);
    const [inIssue, setInIssue] = useState<boolean>(status === 'litige' ? true : false);
    const statusValue = getEnumVal(service.status, ServiceStep)
    const deleteService = async (id: number) => await DI.resolve('serviceUseCase').deleteService(id);

    const updateStatusFlags = (status: string) => {
        setIsNew(status === 'nouveau');
        setIsResp(status === 'en attente');
        setIsValidated(status === 'en cours');
        setIsFinish(status === 'terminé');
        setInIssue(status === 'litige');
    };

    useEffect(() => {
        updateStatusFlags(statusS)
    }, [service])

    const myActions = GenereMyActions(service, "service", deleteService, undefined, late)
    const takenCTA: Action[] = [
        {
            icon: "sync_problem", title: `litige sur  ${title}`,
            body: `litige a ${title}`,
            function: () => navigate({ pathname: `/litige/create/${id}` }),
        },
        {
            icon: "person_cancel", title: `annuler ma réponse à ${title}`,
            body: `annuler ma réponse à ${title}`,
            function: () => { toggleResp(service.id, userId, setService); update && update() },
        },
        {
            icon: "groups", title: `Relancer ${title}`,
            body: ` Relancer ${title}`,
            function: () => { alert(`Voulez-vous relancer ${type} ${id} ?`) },
        },
    ]


    return (
        <>
            <Card className={haveImage ? "FixCard" : "FixCardNoImage"}>
                <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="flex items-start gap-2 ">
                            <button onClick={(e: any) => { let cat = e.toLowerCase(); change(cat); console.log(cat) }}>
                                <Chip size="sm" value={`${categoryS}`}
                                    className="CyanChip">
                                </Chip>
                            </button>
                            <button onClick={(e: any) => { let cat = e.target.innerText.toLowerCase(); change(cat) }}>
                                <Chip size="sm" value={typeS} className={`${typeS === "demande" ? "OrangeChip" : "GreenChip"}`}>
                                </Chip>
                            </button>
                            <Chip size="sm" value={statusS}
                                className={`rounded-full !px-3 ${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip" || inIssue && "RedChip"} `}>
                            </Chip>
                        </div>
                        <DateChip start={createdAt} prefix="publié le " />
                    </div>
                    {image &&
                        <img
                            src={image as any}
                            alt={title}
                            className="CardImage"
                        />
                    }
                </CardHeader>
                <CardBody className={` FixCardBody !flex-1`}>
                    <Title title={title} flagged={flagged} id={id} />
                    <div className="flex flex-col h-full">
                        <div className="CardOverFlow">
                            <Typography color="blue-gray" className="mb-2">
                                {description}...
                            </Typography>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {mine && mines &&
                        <ModifBtnStack actions={myActions} icon3={late} update={update} disabled1={statusValue > 2} disabled2={statusValue > 2} />}
                    {IResp && mines &&
                        <ModifBtnStack actions={takenCTA} disabled1={statusValue > 2} disabled2={statusValue > 2} />}
                    {!mines &&
                        <ProfileDiv profile={User.Profile} />
                    }
                    <div className="flex items-center gap-2">

                        <Chip size="md" value={`${points.join(' à ')}   pts`} className={` GrayChip  lowercase !font-medium  rounded-full    ${mines && 'hidden md:flex'}`} icon=
                            {<Icon icon="fiber_manual_record" title={`Ce service ${typeS === "offre" ? 'coute' : 'offre'} ${points.join(' à ')}pts`} fill={user.Profile.points > points[0]} color={typeS === "offre" ? "green" : "orange"} size="2xl" style="!py-0 -mt-1.5" />}>
                        </Chip>

                        <Icon icon="arrow_circle_right" link={`/service/${id}`} title={`voir les details de service  ${title}`} size="4xl px-1" fill />
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}