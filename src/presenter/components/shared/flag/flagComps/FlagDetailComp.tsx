import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { User } from "../../../../../domain/entities/User";
import { Flag } from "../../../../../domain/entities/Flag";
import { getLabel, flagTargets } from "../../../../../infrastructure/services/utilsService";
import { Icon, ProfileDiv } from "../../../common/SmallComps";

export default function FlagDetailComp(props: { flag: Flag, element?: any, label?: string }) {
    const { flag } = props
    const { createdAt, Post, Event, Survey, Service, target } = flag
    const now = Date.now();
    const element = props.element ? props.element : Post || Event || Survey || Service || { title: "", description: "", User: {} as User }
    const { title, description, User } = element
    const id = flag.targetId
    const label = props.label ? props.label : getLabel(target, flagTargets)

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className="FixCardHeaderNoImage"
                    floated={false}>
                    <div className="ChipDivNoImage">
                        <Chip value={label} className="CyanChip">
                        </Chip>
                        <Chip value={(new Date(createdAt ? createdAt : now)).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                    </div>
                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>
                    </div>
                    <div className="CardOverFlow">
                        <div className="flex items-center justify-between">
                        </div>
                        <Typography color="blue-gray" className="mb-2">
                            {description}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    <ProfileDiv profile={User.Profile} />

                    <Icon icon="arrow_circle_right" link={`/${label}/${id}`} title={`voir les details de ${title}`} size="4xl px-1" fill />

                </CardFooter>
            </Card>
        </>
    )
}