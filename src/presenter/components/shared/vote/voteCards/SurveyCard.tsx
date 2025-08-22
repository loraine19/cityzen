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
    const [survey, setSurvey] = useState<PoolSurveyView>(initialSurvey);
    const end = new Date(new Date(survey?.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = survey?.status !== PoolSurveyStatus.PENDING
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const actions = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const haveImage = survey?.image ? true : false
    const [open, setOpen] = useState(false);
    const color = (): string => {
        switch (survey.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'blue-gray';
        }
    }

    const up = async (opinion: VoteOpinion) => {
        setSurvey(await survey.toogleVote(opinion));
        update()
    }

    return (
        <>
            {open &&
                <VoteCard
                    open={open}
                    close={() => setOpen(false)}
                    vote={survey}
                    refetch={(opinion: VoteOpinion) => up(opinion)} />}
            <Card className={haveImage ? "FixCard " : "FixCardNoImage  "}>
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="ChipSubDiv ">
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
                            onError={(e) => e.currentTarget.src = "/image/placeholder2.png"}
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
                            disabled2={ended}
                            actions={actions}
                            update={update} />}
                    <div className="flex items-center justify-between gap-2">
                        <button
                            disabled={survey?.status !== PoolSurveyStatus.PENDING}
                            onClick={() => { setOpen(true) }}>
                            <Chip
                                value={survey?.Votes?.length}
                                size='md' variant="ghost"
                                className="rounded-full GrayChip h-max flex items-center  "
                                icon={<Icon
                                    icon="smart_card_reader"
                                    fill={survey?.IVoted}
                                    color={color()}
                                    size="md"
                                    title={`${survey?.Votes?.length} personnes ${survey?.IVoted && `dont vous`} ont voté`} />}>
                            </Chip>
                        </button>
                        <Icon
                            icon="arrow_circle_right"
                            title={`voir les details de ${survey?.title}`}
                            link={`/sondage/${survey?.id}`}
                            fill
                            bg clear />
                    </div>
                </CardFooter >
            </Card >
        </>
    );
}
