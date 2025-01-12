import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress } from "@material-tailwind/react";
import ModifBtnStack from "../UIX/ModifBtnStack";
import { GenereMyActions, dayMS, surveyCategories, getLabel, } from '../../functions/GetDataFunctions';
import { useContext, useEffect, useState } from "react";
import { Flag, Survey, Vote } from "../../types/class";
import UserContext from "../../contexts/user.context";
import { deleteSurvey } from "../../functions/API/surveyApi";
import { getUsers } from "../../functions/API/usersApi";
import { DateChip, FlagIcon, Icon } from "../UIX/SmallComps";

type SurveyCardProps = { survey: Survey, change: () => void, mines?: boolean, update?: () => void }
export function SurveyCard(props: SurveyCardProps) {
    const user = useContext(UserContext)
    const userId = user.user.userId
    const [survey] = useState<Survey>(props.survey)
    const { id, title, description, createdAt, image } = survey
    const Votes = survey.Votes || []
    const { change, mines, update } = props
    const ImIn: boolean = Votes?.find((vote: Vote) => vote?.User?.id === userId) ? true : false
    const now = new Date(Date.now())
    const [usersLength, setUsersLength] = useState<number>(0)
    const OkVotes = Votes?.filter((vote: Vote) => vote.opinion as unknown as string === 'OK')
    const pourcentVotes: number = Math.floor((OkVotes?.length) / usersLength * 100)
    const endDays: number = Math.floor((new Date(createdAt).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const disabledEditCTA = pourcentVotes >= 100 ? true : false
    const ended = pourcentVotes < 100 && endDays <= 0 ? true : false
    const category = getLabel(survey.category, surveyCategories)
    const actions = GenereMyActions(survey, "survey", deleteSurvey)
    console.log(actions)
    const haveImage = survey.image ? true : false
    const flagged: boolean = survey.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false

    useEffect(() => {
        const onload = async () => {
            const users = await getUsers()
            setUsersLength(users.length / 2)
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
                            <Chip value='Sondage' className="rounded-full h-max OrangeChip" >
                            </Chip>
                        </button>
                        <Chip value={category} className="rounded-full h-max" color="cyan">
                        </Chip>
                    </div>
                    <DateChip createdAt={createdAt} ended={ended} />
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
            <CardFooter className="CardFooter items-center gap-4">
                {!mines ?
                    <div className={`h-max w-full flex -m-1 flex-col pb-2 pr-4 gap-2`}>
                        <div className=" flex  w-full items-center justify-between ">
                            <Typography color="blue-gray" variant="small">
                                {pourcentVotes > 0 ? `Validé à ` : 'Pas encore de votes pour'}
                            </Typography>
                            <Typography color="blue-gray" variant="small">
                                {pourcentVotes > 0 && `${pourcentVotes}%`}
                            </Typography>
                        </div>
                        <Progress value={pourcentVotes} color={pourcentVotes > 100 ? "green" : "gray"} size="md" />
                    </div> :
                    <ModifBtnStack disabled2={disabledEditCTA} actions={actions} update={update} />}
                <div className="flex items-center justify-between gap-2">
                    <Chip value={Votes?.length} variant="ghost" className="rounded-full h-max flex items-center gap-2"
                        icon={<Icon icon="smart_card_reader" fill={ImIn} color={ImIn && "green" || ''} size="xl" title={`${ImIn ? `vous et ` : ''}  ${Votes?.length} ont voté`} style="-mt-1 pl-1" />}>
                    </Chip>

                    <Icon icon="arrow_circle_right" title={`voir les details de ${title}`} link={`/sondage/${id}`} fill size="4xl" />
                </div>
            </CardFooter >
        </Card>


    );
}
