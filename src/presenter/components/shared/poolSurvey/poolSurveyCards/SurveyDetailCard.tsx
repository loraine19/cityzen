import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Flag } from "../../../../../domain/entities/Flag";
import { Profile } from "../../../../../domain/entities/Profile";
import { Survey } from "../../../../../domain/entities/Survey";
import { Vote } from "../../../../../domain/entities/Vote"
import { ProgressSmallbar, ProfileDiv, Icon, Title } from "../../../common/SmallComps";
import { DateChip } from "../../../common/ChipDate";
import { UserApi } from "../../../../../infrastructure/providers/http/userApi";
import { useUserStore } from "../../../../../application/stores/user.store";
import { getLabel, surveyCategories } from "../../../../views/viewsEntities/utilsService";
import { dayMS } from "../../../../../domain/entities/frontEntities";


export default function SurveyDetailCard(props: { element: Survey, mines?: boolean, change: (e: any) => void }) {
    const [element] = useState<Survey>(props.element)
    const { change } = props
    const { id, title, description, image, createdAt, Votes, Flags, User } = element
    const { user } = useUserStore()
    const userId: number = user.id
    const haveImage: boolean = element.image ? true : false
    const author: Profile = User?.Profile || {} as Profile
    const [usersLength, setUsersLength] = useState<number>(0)
    const pourcent: number = Votes?.length || 0 / usersLength * 100
    const flagged: boolean = Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const ImIn: boolean = Votes?.find((vote: Vote) => vote.userId === userId) ? true : false
    const now = new Date(Date.now())
    const end = new Date(new Date(createdAt).getTime() + 15 * dayMS)
    const ended: boolean = end < now || pourcent >= 100 ? true : false
    const category = getLabel(element.category, surveyCategories)
    const OkVotes = Votes?.filter((vote: Vote) => vote.opinion as unknown as string === 'OK')
    const [needed, setNeeded] = useState<number>(usersLength - (OkVotes?.length || 0))
    const { getUserCount } = new UserApi()

    useEffect(() => {
        const onload = async () => {
            const users = await getUserCount()
            setUsersLength(users / 2)
            setNeeded(users / 2 - (Votes?.length || 0))
        }
        onload()
    }, [element])

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip
                                size='sm'
                                value={category}
                                className="CyanChip">
                            </Chip>
                        </button>
                        <DateChip
                            start={createdAt}
                            ended={ended}
                            end={end}
                            prefix="finis dans" />
                    </div>
                    {image &&
                        <img
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover" />}
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title
                        title={title}
                        flagged={flagged}
                        id={id}
                        CreatedAt={createdAt}
                        type='sondage' />
                    <div className="CardOverFlow h-full">
                        <Typography
                            color="blue-gray"
                            className="mb-2">
                            {description}
                        </Typography>
                    </div>
                    <ProgressSmallbar
                        value={pourcent}
                        label="Votes"
                        size={'lg'}
                        needed={needed} />
                </CardBody>
                <CardFooter className="CardFooter mb-2">
                    <ProfileDiv profile={author} />
                    <div className="flex items-center gap-2 ">
                        <Chip
                            value={Votes?.length}
                            variant="ghost" size='lg'
                            className="rounded-full h-max flex items-center gap-2"
                            icon={<Icon
                                icon="smart_card_reader"
                                fill={ImIn} color={ImIn && "green" || ''}
                                size="2xl" title={`  ${Votes?.length} personnes ${ImIn ? `dont vous ` : ''} ont voté`} style="-mt-1.5  ml-1" />}>
                        </Chip>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}



