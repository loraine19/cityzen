import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { dayMS } from "../../../../../domain/entities/frontEntities";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";

type Props = { survey: PoolSurveyView, setOpen: (open: boolean) => void }

export default function SurveyDetailCard({ survey, setOpen }: Props) {
    const haveImage: boolean = survey.image ? true : false
    const now = new Date(Date.now())
    const end = new Date(new Date(survey.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = end < now || survey?.pourcent >= 100 ? true : false
    const color = (): string => {
        switch (survey?.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'blue-gray';
        }
    }

    return (
        <div className="pt-8 pb-1 h-full flex">
            <Card className="FixCard w-respLarge" >
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <Chip
                            size='sm'
                            value={survey?.categoryS}
                            className="CyanChip">
                        </Chip>
                        <DateChip
                            start={survey?.createdAt}
                            ended={ended}
                            end={end}
                            prefix="finis dans" />
                    </div>
                    {survey?.image &&
                        <img
                            src={survey?.image as string}
                            alt={survey?.title}
                            className="h-full w-full object-cover" />}
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title
                        title={survey?.title}
                        flagged={survey?.flagged}
                        id={survey?.id}
                        CreatedAt={survey?.createdAt}
                        type='sondage' />
                    <div className="CardOverFlow h-full">
                        <Typography
                            color="blue-gray"
                            className="mb-2">
                            {survey?.description}
                        </Typography>
                    </div>
                    <ProgressBar
                        value={survey?.pourcent}
                        label="votes pour"
                        size={'lg'}
                        needed={survey?.needed} />
                </CardBody>
                <CardFooter className="CardFooter mb-2">
                    <ProfileDiv
                        profile={survey?.User} />
                    <div className="flex items-center gap-2 ">
                        <button
                            disabled={survey?.status !== PoolSurveyStatus.PENDING}
                            onClick={() => setOpen(true)}>
                            <Chip
                                value={survey?.Votes?.length}
                                variant="ghost"
                                size='lg'
                                className="rounded-full  px-4"
                                icon={<Icon
                                    icon="smart_card_reader"
                                    fill={survey?.IVoted}
                                    color={color()}
                                    size="md"
                                    title={`  ${survey?.Votes?.length} personnes ${survey?.IVoted ? `dont vous ` : ''} ont voté`}
                                    style="scale-125" />}>
                            </Chip>
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}



