import { Card, CardHeader, Typography, CardBody, Chip, Avatar } from "@material-tailwind/react";
import { Service, ServiceType } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/SmallComps";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { useUserStore } from "../../../../../application/stores/user.store";


export default function ServiceIssueCard(props: { service: Service }) {
    const user = useUserStore((state) => state.user)
    const { id, title, description, createdAt, User, UserResp, typeS, points, categoryS, type } = new ServiceView(props.service, user)


    return (
        <Card className={`CardFix !h-full  !flex !gap-0 bg-blue-gray-50  !py-0`}>
            <CardHeader
                className="fixCardHeaderNoImage !mt-1 mx-2 mb-0  !py-1 shadow-none bg-transparent"
                floated={false}>
                <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-2 ">
                        <Chip
                            size='sm'
                            value={categoryS}
                            className="CyanChip " >
                        </Chip>
                        <Chip
                            size='sm'
                            value={typeS}
                            className={`${type === ServiceType.GET ? "OrangeChip" : "GreenChip"}`}>
                        </Chip>
                    </div>
                    <div className="flex items-center ">
                        <Chip
                            size='sm'
                            value={(new Date(createdAt)).toLocaleDateString('fr-FR')}
                            className="GrayChip lowercase">
                        </Chip>
                        <Icon
                            icon="expand_circle_right"
                            color="gray"
                            link={`/service/${id}`}
                            title={`voir les details de service  ${title}`}
                            size="3xl"
                            style="!px-1 !py-0"

                            fill />
                    </div>
                </div>
            </CardHeader>
            <CardBody className={` FixCardBody  !flex-1 -mt-3 `}>
                <div className="flex h-full ">
                    <div className="flex flex-col flex-1 gap-2 overflow-y-auto">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="truncate max-w-[40vw] lg:max-w-[20vw] pr-2 font-medium">
                            {title}
                        </Typography>
                        <div className="flex gap-2 ">
                            <Avatar
                                src={User.Profile?.image as string || '../../image/person.svg'}
                                size="sm"
                                alt="avatar" />
                            <div className="flex flex-col">
                                <Typography
                                    className="max-h-4"
                                    variant="small">
                                    {User.Profile?.firstName}
                                </Typography>
                                <Typography
                                    variant="small">
                                    {User.Profile?.lastName}
                                </Typography>
                            </div>
                        </div>
                        <Typography
                            color="blue-gray"
                            variant="small"
                            className="flex-1 pr-2 lg:max-h-[1.3rem] overflow-auto">
                            {description}
                        </Typography>
                    </div>
                    <div className="flex flex-1 flex-col pt-1 items-end border-l-[1px] border-gray-400 overflow-y-auto gap-2">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-right font-medium">
                            à réaliser le service
                        </Typography>
                        <div className="flex flex-row-reverse gap-2 ">
                            <Avatar
                                src={UserResp.Profile?.image as string || '../../image/person.svg'}
                                size="sm"
                                alt="avatar" />
                            <div className="flex flex-col items-end">
                                <Typography
                                    className="max-h-4"
                                    variant="small">
                                    {UserResp.Profile?.firstName}
                                </Typography>
                                <Typography
                                    variant="small">
                                    {UserResp.Profile?.lastName}
                                </Typography>
                            </div>
                        </div>
                        <Typography variant="h5" >
                            {points[1] && <span className="!text-[1.2rem] font-light">de </span>}
                            {points[0]}
                            {points[1] && <>
                                <span className="!text-[1.2rem] font-light">à</span> {points[1]}</>}
                            <span className="!text-[1rem] font-light">
                                &nbsp; points
                            </span>
                        </Typography>
                    </div>
                </div>
            </CardBody>

        </Card >

    )
}