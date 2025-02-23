import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from "@material-tailwind/react";
import { Icon, Title } from '../../../common/SmallComps'
import { Profile } from "../../../../../domain/entities/Profile";
import { PoolService } from "../../../../../domain/repositoriesBase/PoolRepository";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { ProfileDiv, ProgressSmallbar } from "../../../common/SmallComps";
import { Action } from "../../../../../domain/entities/frontEntities";
import { dayMS, GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";

type PoolCardProps = {
    pool: any,
    change: (e: any) => void,
    mines?: boolean,
    update?: () => void
}

export function PoolCard({
    pool,
    change,
    mines,
    update
}: PoolCardProps) {
    const now = new Date(Date.now())
    const endDays: number = Math.floor((new Date(pool.createdAt).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const ended: boolean = pool.pourcent < 100 && endDays <= 0 ? true : false
    const end: Date = new Date(new Date(pool.createdAt).getTime() + 15 * dayMS)
    const disabledEditCTA: boolean = pool.pourcent >= 100 ? true : false
    const { deletePool } = new PoolService()

    const actions: Action[] = GenereMyActions(pool, "pool", deletePool)


    return (
        <Card className={`FixCardNoImage `}>
            <CardHeader className={"FixCardHeaderNoImage"}
                floated={false}>
                <div className={`ChipDivNoImage`}>
                    <button onClick={(e: any) => change(e)}>
                        <Chip
                            size='sm'
                            value='Cagnotte'
                            className="GreenChip" >
                        </Chip>
                    </button>
                    <DateChip
                        start={pool.createdAt}
                        ended={ended}
                        end={end}
                        prefix="finis dans" />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody ">
                <Title title={pool.title} />
                <div className="CardOverFlow h-full !p-0 flex justify-between flex-col gap-2">
                    <Typography
                        color="blue-gray"
                        className="max-h-full overflow-auto">
                        {pool.description}...
                    </Typography>
                    <ProfileDiv
                        profile={pool.UserBenef?.Profile || {} as Profile}
                        size={'lg'} />
                </div>
            </CardBody>
            <CardFooter
                className="CardFooter items-center gap-6">
                {!mines ?
                    <ProgressSmallbar
                        value={pool.pourcent}
                        label="Votes pour"
                        needed={pool.needed}
                        size="md" />
                    :
                    <ModifBtnStack
                        disabled2={disabledEditCTA}
                        actions={actions}
                        update={update} />}
                <div className="flex items-center justify-between gap-2">
                    <Chip
                        value={pool.Votes?.length}
                        variant="ghost"
                        className="rounded-full h-max flex items-center gap-2"
                        icon={<Icon
                            icon="smart_card_reader"
                            fill={pool?.IVoted}
                            color={pool?.IVoted && "green" || ''}
                            size="xl"
                            title={`  ${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`}
                            style=" pl-1" />}>
                    </Chip>
                    <Icon
                        icon="arrow_circle_right"
                        title={`voir les details de ${pool.title}`}
                        link={`/cagnotte/${pool.id}`}
                        fill
                        size="4xl px-1" />
                </div>
            </CardFooter >
        </Card >
    );
}