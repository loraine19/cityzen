import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from "@material-tailwind/react";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Icon } from "../../../common/IconComp";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { dayMS } from "../../../../../domain/entities/frontEntities";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";
import DI from "../../../../../di/ioc";
import { useState } from "react";
import { VoteCard } from "./VoteCard";
import { Title } from "../../../common/CardTitle";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import { VoteOpinion } from "../../../../../domain/entities/Vote";


type SurveyCardProps = {
    survey: PoolSurveyView,
    change: () => void,
    mines?: boolean,
    update: () => void
}

export function SurveyCard({ survey: initialSurvey, change, mines, update }: SurveyCardProps) {
    const now = new Date(Date.now())
    const [survey, setSurvey] = useState<PoolSurveyView>(initialSurvey);
    const endDays: number = Math.floor((new Date(survey?.createdAt).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const end = new Date(new Date(survey?.createdAt).getTime() + 15 * dayMS)
    const disabledEditCTA: boolean = survey?.pourcent >= 100 ? true : false
    const ended: boolean = survey?.pourcent >= 100 || endDays <= 0 ? true : false
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const actions = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const haveImage = survey?.image ? true : false
    const [open, setOpen] = useState(false);
    const color = { OK: 'green', NO: 'red', WO: 'orange' }
    const up = async (opinion: VoteOpinion) => { setSurvey(await survey.toogleVote(opinion)); update() }


    return (
        <>
            {open && <VoteCard
                open={open}
                close={() => setOpen(false)}
                vote={survey}
                refetch={(opinion: VoteOpinion) => up(opinion)} />}
            <Card className={haveImage ? "FixCard " : "FixCardNoImage  "}>
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
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
                            onError={(e) => e.currentTarget.src = "/images/placeholder.jpg"}
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
                        type="sondage"
                        group={survey?.Group}
                    />
                    <Typography
                        color="blue-gray"
                        className="leading-[1.3rem]  !line-clamp-2 overflow-auto  pt-0.5">
                        {survey?.description}
                    </Typography>
                </CardBody>
                <CardFooter
                    className="CardFooter items-center gap-6">
                    {!mines ?
                        <ProgressBar
                            value={survey?.pourcent}
                            label="vote pour"
                            needed={survey?.needed}
                            status={survey?.status} />
                        :
                        <ModifBtnStack
                            disabled2={disabledEditCTA}
                            actions={actions}
                            update={update} />}
                    <div className="flex items-center justify-between gap-2">
                        <button
                            disabled={survey?.status !== PoolSurveyStatus.PENDING}
                            onClick={() => { setOpen(true) }}>
                            <Chip
                                value={survey?.Votes?.length}
                                variant="ghost"
                                size='md'
                                className="GrayChip px-3.5"
                                icon={<Icon
                                    icon="smart_card_reader"
                                    fill={survey?.IVoted}
                                    color={survey?.IVoted ? color[survey?.myOpinion as keyof typeof color] : 'gray'}
                                    size="md"
                                    title={`  ${survey?.Votes?.length} personnes ${survey?.IVoted ? `dont vous ` : ''} ont voté`}
                                    style="scale-150 -mt-0.5" />}>
                            </Chip>
                        </button>
                        <Icon
                            icon="arrow_circle_right"
                            title={`voir les details de ${survey?.title}`}
                            link={`/sondage/${survey?.id}`}
                            fill
                            size="4xl" />
                    </div>
                </CardFooter >
            </Card >
        </>
    );
}
