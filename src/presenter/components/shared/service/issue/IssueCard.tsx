import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { ServiceType, } from "../../../../../domain/entities/Service";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip } from "../../../common/ChipDate";
import { Action } from "../../../../../domain/entities/frontEntities";
import DI from "../../../../../di/ioc";
import { GenereMyActions, isLate } from "../../../../views/viewsEntities/utilsService";
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import ServiceIssueCard from "./ServiceIssueCard";
import { Icon } from "../../../common/IconComp";
import { PathElement } from "../../../../constants";

type IssueCardProps = { issue: IssueView, mines?: boolean, change: (e: any) => void, update?: () => void }
export default function IssueCard({ mines, change, update, issue }: IssueCardProps) {
    const { description, image, createdAt, mine, serviceId } = issue
    const Service = new ServiceView(issue?.Service, issue?.Service?.type === ServiceType.GET ? issue?.Service.User : issue?.Service?.UserResp)
    const haveImage = image ? true : false
    const isLateValue = isLate(createdAt, 15)
    const deleteIssue = async (id: number) => await DI.resolve('deleteIssueUseCase').execute(id);
    // const updateIssue = async (id: number, data: IssueDTO) => await DI.resolve('updateServiceStepUseCase').execute(id, data)

    const myActions = GenereMyActions(issue, "concialtion", deleteIssue, undefined, isLateValue)
    const takenCTA: Action[] = [

        {
            icon: "person_cancel", title: `annuler ma réponse à concialtion : ${Service?.title}`,
            body: `annuler ma réponse à concialtion : ${Service?.title}`,
            function: async () => {
                //await updateServiceStep(id, ServiceUpdate.CANCEL_RESP); update && update()
            },
        },
        {
            icon: "groups", title: `Relancer concialtion : ${Service?.title}`,
            body: ` Relancer concialtion : ${Service?.title}`,
            function: () => { alert(`Voulez-vous relancer concialtion ?`) },
        },
    ]


    return (
        <>
            <Card className={haveImage ? "FixCard" : "FixCardNoImage"}>
                <CardHeader
                    className={haveImage ? "h-full !max-h-[15vh] !mb-0" : "FixCardHeaderNoImage"}
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
                                    value={`etape `}
                                    className="CyanChip">
                                </Chip>
                            </button>
                        </div>

                        <DateChip
                            start={createdAt}
                            prefix="le" />
                    </div>
                    {image &&
                        <img
                            src={image as any}
                            alt={Service.title}
                            className="CardImage"
                        />
                    }
                </CardHeader>
                <CardBody className={` FixCardBody !flex-1 max-h-max -mt-2.5 mb-0`}>
                    <div className="relative flex items-center justify-between">
                        <Typography variant="h6">Probleme : </Typography>
                        <Icon

                            icon="arrow_circle_right"
                            link={`/${PathElement.ISSUE}/${serviceId}`}
                            title={`voir les details de concialtion  ${Service.title}`}
                            size="4xl"
                            style="absolute top-1 right-0"
                            fill />
                    </div>
                    <div className="flex flex-col h-full !max-h-[3rem] overflow-auto">
                        <Typography
                            color="blue-gray">
                            {description}
                        </Typography>
                    </div>
                </CardBody>

                <CardFooter className="CardFooter flex-col flex-1 !-mt-1.5 pb-2 ">
                    <ServiceIssueCard service={Service} />
                    <div
                        className="flex items-center justify-between"> {mine && mines &&
                            <ModifBtnStack
                                actions={myActions}
                                icon3={isLateValue}
                                update={update}
                            />}
                        {mines &&
                            <ModifBtnStack
                                actions={takenCTA} />}


                    </div>
                </CardFooter>
            </Card >
        </>
    )
}