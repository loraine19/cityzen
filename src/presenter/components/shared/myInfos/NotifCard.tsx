import { Card, CardBody, CardFooter, Typography, Chip, CardHeader } from "@material-tailwind/react";
import { Icon } from "../../common/IconComp";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";


type notifCardProps = { notif: any, handleClick: (notif: NotifView) => void }

export function NotifCard(props: notifCardProps) {
    const { handleClick, notif } = props
    const { update, read, typeS, } = notif

    return (
        <Card className={`${!read ? 'FixCardNoImage w-resp  !justify-start' : 'hidden'}`}>
            <CardHeader className={"FixCardHeaderNoImage !my-0 "} floated={false}>
                <div className="ChipDivNoImage ">
                    <Chip
                        size='sm'
                        value={typeS}
                        className="CyanChip text-ellipsis  " >
                    </Chip>
                    <Icon
                        icon="cancel"
                        onClick={() => handleClick(notif)}
                        color="red"
                        title="fermer la notification"
                        size="3xl"
                        style="" />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody max-h-max !-mt-3 !py-0">
                <Typography
                    color="gray"
                    className="font-normal truncate ">
                    {notif.title}
                </Typography>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal truncate ">
                    {notif.description}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center  !pt-0  !px-4">
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal truncate">
                    {update}
                </Typography>
                {notif.link && <Icon
                    icon="arrow_circle_right"
                    link={`${notif.link}`}
                    title={`voir les details de ${notif.title}`}
                    size="4xl"
                    fill />}
            </CardFooter>
        </Card>

    );
}