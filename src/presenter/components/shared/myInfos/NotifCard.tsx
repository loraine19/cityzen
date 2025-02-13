import { Card, CardBody, CardFooter, Typography, Chip, CardHeader } from "@material-tailwind/react";
import { Icon } from "../../common/SmallComps";
import { NotifView } from "../../../../domain/entities/Notif";
import { useUserStore } from "../../../../application/stores/user.store";
import { Profile } from "../../../../domain/entities/Profile";


type notifCardProps = { notif: any, handleClick: (notif: NotifView) => void }

export function NotifCard(props: notifCardProps) {
    const { user } = useUserStore()
    const userProfile: Profile = user.Profile

    const { handleClick, notif } = props
    console.log(notif)
    const { update, userId, read, elementType, relation } = notif

    return (
        <Card className={`${!read ? 'FixCardNoImage w-resp  !justify-start' : 'hidden'}`}>
            <CardHeader className={"FixCardHeaderNoImage !my-0 "} floated={false}>
                <div className="ChipDivNoImage ">
                    <div className="flex items-center gap-2 mb-4 ">
                        <Chip size='sm' value={elementType} className="rounded-full h-max text-ellipsis  " color="cyan">
                        </Chip>
                        <Chip size='sm' value={relation} className={`${userId !== userProfile.userId && '!grayscale'} rounded-full OrangeChip h-max flex items-center gap-2 font-medium `}>
                        </Chip>
                    </div>
                    <Icon icon="cancel" onClick={() => handleClick(notif)} color="red" title="fermer la notification" size="2xl" style=" !pl-1 !pr-1 -mt-6" />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody max-h-max !py-0">
                <Typography color="gray" className="font-normal truncate ">
                    {notif.title}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center !px-4">
                <Typography variant="small" color="gray" className="font-normal truncate">{update}</Typography>
                <Icon icon="arrow_circle_right" link={`/${elementType}/${notif.id}`} title={`voir les details de ${notif.title}`} size="4xl px-1" fill />
            </CardFooter>
        </Card>

    );
}