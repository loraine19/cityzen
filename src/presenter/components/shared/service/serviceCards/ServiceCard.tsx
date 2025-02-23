import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ServiceStep, ServiceType, ServiceUpdate } from "../../../../../domain/entities/Service";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Title, ProfileDiv, Icon } from "../../../common/SmallComps";
import { DateChip } from "../../../common/ChipDate";
import { Action } from "../../../../../domain/entities/frontEntities";
import { useUserStore } from "../../../../../application/stores/user.store";
import DI from "../../../../../di/ioc";
import { GenereMyActions, getEnumVal, isLate } from "../../../../views/viewsEntities/utilsService";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";


export default function ServiceComp(props:
    { service: ServiceView, mines?: boolean, change: (e: any) => void, update?: () => void }) {
    const { user } = useUserStore()
    const { mines, change, update, service } = props
    const { id, title, description, image, createdAt, User, flagged, mine, IResp, points, typeS, categoryS, statusS } = service
    const haveImage = service.image ? true : false
    const navigate = useNavigate();
    const isResp = service.statusS === ServiceStep.STEP_1 ? true : false;
    const isValidated = service.statusS === ServiceStep.STEP_2 ? true : false;
    const isFinish = service.statusS === ServiceStep.STEP_3 ? true : false;
    const inIssue = service.statusS === ServiceStep.STEP_4 ? true : false;
    const statusSInt = getEnumVal(service.statusS, ServiceStep)
    const isLateValue = isLate(createdAt, 15) && statusSInt < 3
    const deleteService = async (id: number) => await DI.resolve('serviceUseCase').deleteService(id);
    const updateServiceStep = async (id: number, update: ServiceUpdate) => await DI.resolve('serviceUseCase').updateServiceStep(id, update);

    const myActions = GenereMyActions(service, "service", deleteService, undefined, isLateValue)
    const takenCTA: Action[] = [
        {
            icon: "sync_problem", title: `litige sur  ${title}`,
            body: `litige a ${title}`,
            function: () => navigate({ pathname: `/litige/create/${id}` }),
        },
        {
            icon: "person_cancel", title: `annuler ma réponse à ${title}`,
            body: `annuler ma réponse à ${title}`,
            function: async () => { await updateServiceStep(id, ServiceUpdate.CANCEL_RESP); update && update() },
        },
        {
            icon: "groups", title: `Relancer ${title}`,
            body: ` Relancer ${title}`,
            function: () => { alert(`Voulez-vous relancer ${typeS} ${id} ?`) },
        },
    ]


    return (
        <>
            <Card className={haveImage ? "FixCard" : "FixCardNoImage"}>
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="flex items-start gap-2 ">
                            <button
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    const cat = e.currentTarget.innerText.toLowerCase();
                                    change(cat)
                                }}>
                                <Chip
                                    size="sm"
                                    value={`${categoryS}`}
                                    className="CyanChip">
                                </Chip>
                            </button>
                            <button
                                onClick={(e: any) => {
                                    const cat = e.target.innerText.toLowerCase();
                                    change(cat)
                                }}>
                                <Chip
                                    size="sm"
                                    value={typeS}
                                    className={`${typeS === "demande" ? "OrangeChip" : "GreenChip"}`}>
                                </Chip>
                            </button>
                            <Chip
                                size="sm"
                                value={statusS}
                                className={`rounded-full !px-3 ${isResp && "OrangeChip" || isValidated && "GreenChip" || isFinish && "GrayChip" || inIssue && "RedChip"} `}>
                            </Chip>
                        </div>
                        <DateChip
                            start={createdAt}
                            prefix="le" />
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
                    <Title
                        title={title}
                        flagged={flagged} id={id}
                        type='service' />
                    <div className="flex flex-col h-full overflow-auto">
                        <Typography
                            color="blue-gray">
                            {description}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {mine && mines &&
                        <ModifBtnStack
                            actions={myActions}
                            icon3={isLateValue}
                            update={update}
                            disabled1={statusSInt > 1}
                            disabled2={statusSInt > 1} />}
                    {IResp && mines &&
                        <ModifBtnStack
                            actions={takenCTA}
                            disabled1={statusSInt > 1}
                            disabled2={statusSInt > 1} />}
                    {!mines &&
                        <ProfileDiv
                            profile={User.Profile} />
                    }
                    <div className="flex items-center gap-2">

                        <Chip
                            size="md"
                            value={`${points.join(' à ')}   pts`}
                            className={`!px-4 GrayChip  lowercase !font-medium  rounded-full ${mines && 'hidden md:flex'}`}
                            icon=
                            {<Icon
                                icon="toll"
                                title={`Ce service ${service.typeS === ServiceType.GET ? 'vous fais gagner' : 'coute'} ${points.join(' à ')}pts`}
                                fill={user.Profile.points > points[0]}
                                color={service.typeS === ServiceType.GET ? "green" : "orange"} size="2xl" style="!py-0 -mt-1.5 pl-2" />}>
                        </Chip>

                        <Icon
                            icon="arrow_circle_right"
                            link={`/service/${id}`}
                            title={`voir les details de service  ${title}`}
                            size="4xl px-1"
                            fill />
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}