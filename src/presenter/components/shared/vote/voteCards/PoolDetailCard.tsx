import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, } from "@material-tailwind/react";
import { Profile } from "../../../../../domain/entities/Profile";
import { Icon } from "../../../common/IconComp";
import { dayMS } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";

type PoolDetailCardProps = { pool: PoolSurveyView, setOpen: (open: boolean) => void }

export default function PoolDetailCard({ pool, setOpen }: PoolDetailCardProps) {
    const now = new Date(Date.now())
    const end = new Date(new Date(pool?.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = end < now || pool?.pourcent >= 100 ? true : false

    const color = (): string => {
        switch (pool?.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'blue-gray';
        }
    }

    return (
        <div className="pt-8 pb-1 h-full flex">
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
                            className="rounded-full h-max flex items-center px-4 gap-2"
                            icon={
                                <Icon
                                    onClick={() => { setOpen(true) }}
                                    icon="smart_card_reader"
                                    fill={pool?.IVoted}
                                    color={color()}
                                    size="2xl"
                                    title={`${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`}
                                    style="pr-2" />}>
                        </Chip>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}



