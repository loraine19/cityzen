import { Card, CardHeader, CardBody, CardFooter, Typography, Chip, Progress, Avatar } from "@material-tailwind/react";
import ModifBtnStack from "../UIX/ModifBtnStack";
import { GenereMyActions, dayMS } from '../../functions/GetDataFunctions';
import { useContext, useEffect, useState } from "react";
import { Pool, Vote } from "../../types/class";
import UserContext from "../../contexts/user.context";
import { deletePool } from "../../functions/API/poolApi";
import { getUsers } from "../../functions/API/usersApi";
import { DateChip, Icon } from "../UIX/SmallComps";

type PoolCardProps = { pool: Pool, change: (e: any) => void, mines?: boolean, update?: () => void }
export function PoolCard(props: PoolCardProps) {
    const user = useContext(UserContext)
    const userId = user.user.userId
    const [pool] = useState<Pool>(props.pool)
    const { id, title, description, createdAt, UserBenef } = pool
    const Votes = pool.Votes || []
    const { change, mines, update } = props
    const ImIn: boolean = Votes?.find((vote: Vote) => vote?.User?.id === userId) ? true : false
    const now = new Date(Date.now())
    const [usersLength, setUsersLength] = useState<number>(0)
    const OkVotes = Votes?.filter((vote: Vote) => vote.opinion as unknown as string === 'OK')
    const pourcentVotes: number = Math.floor((OkVotes?.length) / usersLength * 100)
    const endDays: number = Math.floor((new Date(createdAt).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const ended = pourcentVotes < 100 && endDays <= 0 ? true : false
    const disabledEditCTA = pourcentVotes >= 100 ? true : false
    const actions = GenereMyActions(pool, "pool", deletePool)


    useEffect(() => {
        const onload = async () => {
            const users = await getUsers()
            setUsersLength(users.length / 2)
        }
        onload()
    }, [pool])

    return (
        <Card className={`CardFix  !h-[calc(100%+1.5rem)] -mt-6`}>
            <CardHeader className={"FixCardHeader NoImage"}
                floated={false}>
                <div className={` gap-4 h-full w-full flex justify-between `}>
                    <button onClick={(e: any) => change(e)} className="flex items-center gap-2">
                        <Chip value='Cagnotte' className="rounded-full h-max GreenChip" ></Chip>
                    </button>
                    <DateChip createdAt={createdAt} ended={ended} />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody !flex-1">
                <div className="flex gap-4 py-4">
                    <Avatar src={UserBenef?.Profile?.image as string} size="lg" className='BgUser !shadow' alt={UserBenef?.Profile?.firstName} withBorder={true} />
                    <div className="flex flex-col w-full py-2">
                        <Typography variant="h6">
                            {UserBenef?.Profile?.firstName}
                        </Typography>
                        <Typography  >
                            {UserBenef?.Profile?.skills}
                        </Typography>
                    </div>
                </div>
                <div className="flex sticky top-0 bg-white w-full items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {title}
                    </Typography>
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
                        icon={<span className={`${ImIn && "fill !text-green-500"} icon !text-[1.2rem]`}>
                            smart_card_reader
                        </span>}>
                    </Chip>
                    <Icon icon="arrow_circle_right" link={`/cagnotte/${id}`} title={`voir les details de ${title}`} size="5xl" fill />
                </div>
            </CardFooter >
        </Card >

    );
}