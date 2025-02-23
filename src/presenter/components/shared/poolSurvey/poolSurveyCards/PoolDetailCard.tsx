import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, } from "@material-tailwind/react";
import { Profile } from "../../../../../domain/entities/Profile";
import { ProfileDiv, ProgressSmallbar, Icon, Title } from "../../../common/SmallComps";
import { dayMS } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";

type PoolDetailCardProps = { pool: PoolSurveyView }

export default function PoolDetailCard({ pool }: PoolDetailCardProps) {
    const now = new Date(Date.now())
    const end = new Date(new Date(pool?.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = end < now || pool?.pourcent >= 100 ? true : false

    return (
        <>
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
                            size={'xl'} />
                    </div>
                    <ProgressSmallbar
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
                            size='lg'
                            className="rounded-full h-max flex items-center gap-2"
                            icon={<Icon
                                icon="smart_card_reader"
                                fill={pool?.IVoted}
                                color={pool?.IVoted && "green" || ''}
                                size="2xl"
                                title={`  ${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`} style="-mt-1.5  ml-1" />}>
                        </Chip>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}



