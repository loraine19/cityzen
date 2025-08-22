import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from "@material-tailwind/react";
import { Icon } from '../../../common/IconComp'
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Action } from "../../../../../domain/entities/frontEntities";
import { dayMS, GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import { ProgressBar } from "../../../common/ProgressBar";
import DI from "../../../../../di/ioc";
import { VoteCard } from "./VoteCard";
import { useState } from "react";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Title } from "../../../common/CardTitle";
import { User } from "../../../../../domain/entities/User";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";

type PoolCardProps = {
    pool: any,
    change: (e: any) => void,
    mines?: boolean,
    update: () => void,
}

export function PoolCard({ pool, change, mines, update }: PoolCardProps) {
    const ended: boolean = pool.pourcent < 100 || pool.status !== PoolSurveyStatus.PENDING
    const end: Date = new Date(new Date(pool.createdAt).getTime() + 15 * dayMS)
    const disabledEditCTA: boolean = pool?.status !== PoolSurveyStatus.PENDING

    //// FUNCTIONS
    const deletePool = async (id: number) => await DI.resolve('deletePoolUseCase').execute(id)
    const actions: Action[] = GenereMyActions(pool, "vote/cagnotte", deletePool)
    const [open, setOpen] = useState(false)

    const color = (): string => {
        switch (pool?.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'blue-gray';
        }
    }


    return (
        <>
            {open &&
                <VoteCard
                    open={open}
                    close={() => setOpen(false)}
                    vote={pool}
                    refetch={update} />}
            <Card className={`FixCardNoImage `}>
                <CardHeader className={"FixCardHeaderNoImage"}
                    floated={false}>
                    <div className={`ChipDivNoImage flex-wrap`}>
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
                <CardBody className="FixCardBody !pb-0 ">
                    <div className="py-1 ">
                        <ProfileDiv
                            profile={pool?.UserBenef || {} as Partial<User>}
                            size={'xl'} />
                        <Title
                            title={pool.title}
                            group={pool.Group}
                        /></div>
                    <div className="CardOverFlow h-full  !pl-2 !p-0 flex justify-between flex-col gap-2">
                        <Typography
                            color="blue-gray"
                            className="leading-[1.3rem] pt-1 !line-clamp-2 max-h-full">
                            {pool.description}
                        </Typography>

                    </div>
                </CardBody>
                <CardFooter
                    className="CardFooter items-center gap-6">
                    {!mines ?
                        <ProgressBar
                            value={pool.pourcent}
                            label="votes pour"
                            needed={pool.needed}
                            size="md"
                            status={pool.status}
                        />
                        :
                        <ModifBtnStack
                            disabled2={disabledEditCTA}
                            actions={actions}
                            update={update} />}
                    <div className="flex items-center justify-between gap-2">
                        <button
                            disabled={pool?.status !== PoolSurveyStatus.PENDING}
                            onClick={() => setOpen(true)}>
                            <Chip
                                key={pool.id}
                                value={pool.Votes?.length}
                                variant="ghost"
                                className="rounded-full GrayChip h-max flex items-center  "
                                icon={
                                    <Icon
                                        icon="smart_card_reader"
                                        fill={pool?.IVoted}
                                        color={color()}
                                        size="md"
                                        title={`  ${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`}
                                        style="ml-0.5 -mr-1" />}>
                            </Chip>
                        </button>
                        <Icon
                            icon="arrow_circle_right"
                            title={`voir les details de ${pool.title}`}
                            link={`/cagnotte/${pool.id}`}
                            fill
                            bg clear />
                    </div>
                </CardFooter >
            </Card >
        </>
    );
}