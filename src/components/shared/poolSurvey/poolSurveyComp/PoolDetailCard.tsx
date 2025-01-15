import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, } from "@material-tailwind/react";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../../../contexts/user.context";
import { Pool } from "../../../../domain/entities/Pool";
import { Profile } from "../../../../domain/entities/Profile";
import { Vote } from "../../../../domain/entities/Vote";
import { dayMS } from "../../../../utils/GetDataFunctions";
import { DateChip, ProfileDiv, ProgressSmallbar, Icon } from "../../../common/SmallComps";
import { UserRepositoryImpl } from "../../../../infrastructure/repositoriesImpl/UserRespositoryImpl";
import { UserApi } from "../../../../infrastructure/api/userApi";



export default function PoolDetailCard(props: { element: Pool, mines?: boolean, change: (e: any) => void }) {
    const [element] = useState<Pool>(props.element)
    const { change } = props
    const { title, description, createdAt, Votes, User, UserBenef } = element
    const { userProfile } = useContext(UserContext)
    const userId: number = userProfile.userId
    const haveImage: boolean = false
    const author: Profile = User?.Profile || {} as Profile
    const [usersLength, setUsersLength] = useState<number>(0)
    const pourcent: number = Votes?.length || 0 / usersLength * 100
    const ImIn: boolean = Votes?.find((vote: Vote) => vote.userId === userId) ? true : false
    const now = new Date(Date.now())
    const end = new Date(new Date(createdAt).getTime() + 15 * dayMS)
    const ended: boolean = end < now || pourcent >= 100 ? true : false
    const OkVotes = Votes?.filter((vote: Vote) => vote.opinion as unknown as string === 'OK')
    const [needed, setNeeded] = useState<number>(usersLength - (OkVotes?.length || 0))

    const { getUsers } = new UserRepositoryImpl(new UserApi())

    useEffect(() => {
        const onload = async () => {
            const users = await getUsers()
            setUsersLength(users.length / 2)
            setNeeded(users.length / 2 - (Votes?.length || 0))
        }
        onload()
    }, [element])

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className={haveImage ? "FixCardHeader min-h-[28vh]" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={`${!haveImage ? "relative" : "absolute"}  top-0 p-2 justify-between w-full flex items-end `}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip value={'Cagnotte'} className="rounded-full h-max text-ellipsis shadow" color="cyan">
                            </Chip>
                        </button>
                        <DateChip start={createdAt} ended={ended} end={end} prefix="finis dans" />
                    </div>
                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="flex  justify-between items-center w-full">
                            {title} <span className="text-xs font-normal"> Posté le {new Date(createdAt).toLocaleDateString()}</span>
                        </Typography>
                    </div>
                    <div className="CardOverFlow h-full justify-between pb-4 mb-8">
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



