import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../../../contexts/user.context";
import { Flag } from "../../../../domain/entities/Flag";
import { Survey } from "../../../../domain/entities/Survey";
import { Vote } from "../../../../domain/entities/Vote";
import { SurveyService } from "../../../../domain/repositories/SurveyRepository";
import { UserService } from "../../../../domain/repositories/UserRepository";
import { dayMS, getLabel, surveyCategories, GenereMyActions } from "../../../../utils/GetDataFunctions";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip, FlagIcon, ProgressSmallbar, Icon } from "../../../common/SmallComps";


type SurveyCardProps = { survey: Survey, change: () => void, mines?: boolean, update?: () => void }
export function SurveyCard(props: SurveyCardProps) {
    const { userProfile } = useContext(UserContext)
    const userId: number = userProfile.userId
    const [survey] = useState<Survey>(props.survey)
    const { id, title, description, createdAt, image } = survey
    const Votes: Vote[] = survey.Votes || []
    const { change, mines, update } = props
    const ImIn: boolean = Votes?.find((vote: Vote) => vote?.User?.id === userId) ? true : false
    const now = new Date(Date.now())
    const [usersLength, setUsersLength] = useState<number>(0)
    const OkVotes: Vote[] = Votes?.filter((vote: Vote) => vote.opinion as unknown as string === 'OK')
    const pourcent: number = Math.floor((OkVotes?.length) / usersLength * 100)
    const endDays: number = Math.floor((new Date(createdAt).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const end = new Date(new Date(createdAt).getTime() + 15 * dayMS)
    const disabledEditCTA: boolean = pourcent >= 100 ? true : false
    const ended: boolean = pourcent < 100 && endDays <= 0 ? true : false
    const category: string = getLabel(survey.category, surveyCategories)
    const { deleteSurvey } = new SurveyService()
    const { getUsers } = new UserService()
    const actions = GenereMyActions(survey, "survey", deleteSurvey)
    const haveImage = survey.image ? true : false
    const flagged: boolean = survey.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const [needed, setNeeded] = useState<number>(usersLength - (survey.Votes?.length || 0))

    useEffect(() => {
        const onload = async () => {
            const users = await getUsers()
            setUsersLength(users.length / 2)
            setNeeded(users.length / 2 - (survey.Votes?.length || 0))
        }
        onload()
    }, [survey])

    return (
        <Card className={`CardFix  ${haveImage ? "!h-full " : "!h-[calc(100%+1.5rem)] -mt-6"}`}>
            <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeader NoImage"}
                floated={haveImage}>
                <div className={` ${haveImage && "absolute p-2"} h-max w-full flex justify-between `}>
                    <div className="flex items-center gap-2">
                        <button onClick={() => { change() }}>
                            <Chip value='Sondage' size="sm" className="!px-3 min-w-max rounded-full h-max OrangeChip" ></Chip>
                        </button>
                        <Chip value={category} size="sm" className="!px-3 min-w-max rounded-full h-max" color="cyan"></Chip>
                    </div>
                    <DateChip start={createdAt} ended={ended} end={end} prefix="finis dans" />
                </div>
                {image &&
                    <img
                        src={image as any}
                        alt={title}
                        className="h-full w-full object-cover"
                    />}
            </CardHeader>
            <CardBody className={` FixCardBody !flex-1`}>
                <div className="flex sticky top-0 bg-white w-full items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {title}
                    </Typography>
                    <FlagIcon flagged={flagged} id={id} type="survey" />
                </div>
                <div className="flex flex-col h-full">
                    <div className="CardOverFlow">
                        <Typography color="blue-gray" className="mb-2">
                            {description}...
                        </Typography>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="CardFooter items-center gap-6">
                {!mines ?
                    <ProgressSmallbar value={pourcent} label="Votes" needed={needed} size="md" />
                    :
                    <ModifBtnStack disabled2={disabledEditCTA} actions={actions} update={update} />}
                <div className="flex items-center justify-between gap-2">
                    <Chip value={Votes?.length} variant="ghost" className="min-w-max rounded-full h-max flex items-center gap-2"
                        icon={<Icon icon="smart_card_reader" fill={ImIn} color={ImIn && "green" || ''} size="xl" title={`  ${Votes?.length} personnes ${ImIn ? `dont vous ` : ''} ont voté`} style="-mt-1 pl-1" />}>
                    </Chip>
                    <Icon icon="arrow_circle_right" title={`voir les details de ${title}`} link={`/sondage/${id}`} fill size="4xl px-1" />
                </div>
            </CardFooter >
        </Card>
    );
}
