import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from "@material-tailwind/react";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Icon, Title } from "../../../common/SmallComps";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { dayMS } from "../../../../../domain/entities/frontEntities";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";
import DI from "../../../../../di/ioc";


type SurveyCardProps = { survey: PoolSurveyView, change: () => void, mines?: boolean, update?: () => void }

export function SurveyCard({ survey, change, mines, update }: SurveyCardProps) {
    const now = new Date(Date.now())
    const endDays: number = Math.floor((new Date(survey?.createdAt).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const end = new Date(new Date(survey?.createdAt).getTime() + 15 * dayMS)
    const disabledEditCTA: boolean = survey?.pourcent >= 100 ? true : false
    const ended: boolean = survey?.pourcent >= 100 || endDays <= 0 ? true : false
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const actions = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const haveImage = survey?.image ? true : false


    return (
        <Card className={haveImage ? "FixCard " : "FixCardNoImage  "}>
            <CardHeader
                className={haveImage ? "FixCardHeader" : "FixCardHeader NoImage"}
                floated={haveImage}>
                <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { change() }}>
                            <Chip
                                value='Sondage'
                                size="sm"
                                className="!px-3 min-w-max rounded-full h-max OrangeChip" >
                            </Chip>
                        </button>
                        <Chip
                            value={survey?.categoryS}
                            size="sm"
                            className="CyanChip">
                        </Chip>
                    </div>
                    <DateChip
                        start={survey?.createdAt}
                        ended={ended}
                        end={end}
                        prefix="finis dans" />
                </div>
                {survey?.image &&
                    <img
                        src={survey?.image as any}
                        alt={survey?.title}
                        className="h-full w-full object-cover"
                    />}
            </CardHeader>
            <CardBody
                className={` FixCardBody`}>
                <Title
                    title={survey?.title}
                    flagged={survey?.flagged}
                    id={survey?.id}
                    type="sondage" />

                <Typography
                    color="blue-gray"
                    className=" overflow-auto mb-2 pb-2">
                    {survey?.description}
                </Typography>


            </CardBody>
            <CardFooter
                className="CardFooter items-center gap-6">
                {!mines ?
                    <ProgressBar
                        value={survey?.pourcent}
                        label="Votes"
                        needed={survey?.needed} />
                    :
                    <ModifBtnStack
                        disabled2={disabledEditCTA}
                        actions={actions}
                        update={update} />}
                <div className="flex items-center justify-between gap-2">
                    <Chip
                        value={survey?.Votes?.length}
                        variant="ghost"
                        className="min-w-max rounded-full px-4"
                        icon={<Icon
                            icon="smart_card_reader"
                            fill={survey?.IVoted} color={survey?.IVoted && "green" || ''}
                            size="xl"
                            title={`  ${survey?.Votes?.length} personnes ${survey?.IVoted ? `dont vous ` : ''} ont voté`}
                            style=" pl-2.5" />}>
                    </Chip>
                    <Icon
                        icon="arrow_circle_right"
                        title={`voir les details de ${survey?.title}`}
                        link={`/sondage/${survey?.id}`}
                        fill
                        size="4xl" />
                </div>
            </CardFooter >
        </Card >
    );
}
