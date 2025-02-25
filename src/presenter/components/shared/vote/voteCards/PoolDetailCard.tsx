import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, } from "@material-tailwind/react";
import { Profile } from "../../../../../domain/entities/Profile";
import { ProfileDiv, Icon, Title } from "../../../common/SmallComps";
import { dayMS } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";

type PoolDetailCardProps = { pool: PoolSurveyView }

export default function PoolDetailCard({ pool }: PoolDetailCardProps) {
    const now = new Date(Date.now())
    const end = new Date(new Date(pool?.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = end < now || pool?.pourcent >= 100 ? true : false

    return (
        <div className="pt-6 pb-1 h-full flex">
            <Card className="FixCardNoImage w-respLarge" >
                <CardHeader className={"FixCardHeaderNoImage"}
                    floated={false}>
                    <div className={`ChipDivNoImage`}>
                        <Chip
                            value={'Cagnotte'}
                            size='sm'
                            className="CyanChip">
                        </Chip>

                        <DateChip
                            start={pool?.createdAt}
                            ended={ended}
                            end={end}
                            prefix="finis dans" />
                    </div>
                </CardHeader>
                <CardBody
                    className="FixCardBody">
                    <Title
                        title={pool?.title}
                        CreatedAt={pool?.createdAt} />
                    <div className="CardOverFlow h-full justify-between pb-4 mb-6">
                        <Typography
                            color="blue-gray"
                            className="mb-2">
                            {pool?.description}
                        </Typography>
                        <ProfileDiv
                            profile={pool?.UserBenef?.Profile || {} as Profile}
                            size={'lg'} />
                    </div>
                    <ProgressBar
                        value={pool?.pourcent}
                        label="votes pour "
                        size={'lg'}
                        needed={pool?.needed} />
                </CardBody>
                <CardFooter
                    className="CardFooter mb-2">
                    <ProfileDiv
                        profile={pool.User?.Profile || {} as Profile} />
                    <div className="flex items-center gap-2 ">
                        <Chip
                            value={pool.Votes?.length}
                            variant="ghost"
                            className="rounded-full h-max flex items-center pr-3 pl-5"
                            icon={
                                <Icon
                                    icon="smart_card_reader"
                                    fill={pool?.IVoted}
                                    color={pool?.IVoted && "green" || ''}
                                    size="2xl"
                                    title={`${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`} style="-mt-2  ml-2" />}>
                        </Chip>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}



