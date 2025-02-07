import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Pool } from "../../../../../domain/entities/Pool";
import { Profile } from "../../../../../domain/entities/Profile";
import { Vote } from "../../../../../domain/entities/Vote";
import { DateChip, ProfileDiv, ProgressSmallbar, Icon, Title } from "../../../common/SmallComps";
import { UserApi } from "../../../../../infrastructure/providers/http/userApi";
import { useUserStore } from "../../../../../application/stores/user.store";
import { dayMS } from "../../../../views/viewsEntities/utilsService";


export default function PoolDetailCard(props: { element: Pool, mines?: boolean, change: (e: any) => void }) {
    const [element] = useState<Pool>(props.element)
    const { title, description, createdAt, Votes, User, UserBenef } = element
    const { user } = useUserStore()
    const userId: number = user.id
    const haveImage: boolean = false
    console.log(haveImage)
    const author: Profile = User?.Profile || {} as Profile
    const [usersLength, setUsersLength] = useState<number>(0)
    const pourcent: number = Votes?.length || 0 / usersLength * 100
    const ImIn: boolean = Votes?.find((vote: Vote) => vote.userId === userId) ? true : false
    const now = new Date(Date.now())
    const end = new Date(new Date(createdAt).getTime() + 15 * dayMS)
    const ended: boolean = end < now || pourcent >= 100 ? true : false
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
            <Card className="FixCardNoImage w-respLarge" >
                <CardHeader className={"FixCardHeaderNoImage"}
                    floated={false}>
                    <div className={`ChipDivNoImage`}>

                        <Chip value={'Cagnotte'} size='sm' className="CyanChip">
                        </Chip>

                        <DateChip start={createdAt} ended={ended} end={end} prefix="finis dans" />
                    </div>
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title title={title} CreatedAt={createdAt} />
                    <div className="CardOverFlow h-full justify-between pb-4 mb-6">
                        <Typography color="blue-gray" className="mb-2">
                            {description}
                        </Typography>
                        <ProfileDiv profile={UserBenef?.Profile || {} as Profile} size={'xl'} />
                    </div>
                    <ProgressSmallbar value={pourcent} label="Votes" size={'lg'} needed={needed} />
                </CardBody>
                <CardFooter className="CardFooter mb-2">
                    <ProfileDiv profile={author} />
                    <div className="flex items-center gap-2 ">
                        <Chip value={Votes?.length} variant="ghost" size='lg' className="rounded-full h-max flex items-center gap-2"
                            icon={<Icon icon="smart_card_reader" fill={ImIn} color={ImIn && "green" || ''} size="2xl" title={`  ${Votes?.length} personnes ${ImIn ? `dont vous ` : ''} ont voté`} style="-mt-1.5  ml-1" />}>
                        </Chip>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}



