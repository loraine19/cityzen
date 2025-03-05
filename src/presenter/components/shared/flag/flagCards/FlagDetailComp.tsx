import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { FlagView } from "../../../../views/viewsEntities/flagViewEntities";
import { FlagTarget } from "../../../../../domain/entities/Flag";
import { ProfileDiv } from "../../../common/ProfilDiv";

export default function FlagDetailComp(props: { flag: FlagView, element?: any, label?: string }) {
    const { flag } = props

    const { createdAt, element, target, title } = flag
    const now = Date.now();
    const id = flag.targetId

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className="FixCardHeaderNoImage"
                    floated={false}>
                    <div className="ChipDivNoImage">
                        <Chip
                            value={FlagTarget[flag.target as unknown as keyof typeof FlagTarget] ||
                                FlagTarget[props.label as unknown as keyof typeof FlagTarget]}
                            className="CyanChip">
                        </Chip>
                        <Chip
                            value={(new Date(createdAt ? createdAt : now)).toLocaleDateString('fr-FR')}
                            className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                    </div>
                </CardHeader>
                <CardBody
                    className="FixCardBody">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>
                    </div>
                    <div className="CardOverFlow">
                        <Typography color="blue-gray" className="mb-2">
                            {element?.description}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    <ProfileDiv
                        profile={element?.User?.Profile} />

                    <Icon fill
                        icon="arrow_circle_right"
                        link={`/${target}/${id}`}
                        title={`voir les details de ${title}`}
                        size="4xl px-1" />

                </CardFooter>
            </Card>
        </>
    )
}