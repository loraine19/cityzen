import { Card, CardBody, CardFooter, Typography, Chip, CardHeader } from "@material-tailwind/react";
import { Icon } from "../../common/SmallComps";
import { useContext } from "react";
import UserContext from "../../../../contexts/user.context";
import { Notif } from "../../../../domain/entities/Notif";
import { GetPathElement } from "../../../../utils/GetDataFunctions";
import { DateChip } from "../../common/SmallComps";


type notifCardProps = { notif: any, handleClick: (notif: Notif) => void }

export function NotifCard(props: notifCardProps) {
    const { userProfile } = useContext(UserContext)
    const { handleClick, notif } = props
    const { element, updatedAt, userId, read } = props.notif
    const relationName = userId === userProfile.userId ? "J'ai ecris " : "J'y participes"

    return (
        <Card className={`${!read ? 'w-resp !h-max FixCard !max-w-[calc(100vw-2rem)]' : 'hidden'}`}>
            <CardHeader className="FixCardHeader NoImage" floated={false}>
                <div className="flex w-full items-start justify-between">
                    <div className="flex items-center gap-2 mb-1">
                        <Chip size='sm' value={GetPathElement(element.toLowerCase())} className="rounded-full h-max text-ellipsis  " color="cyan">
                        </Chip>
                        <Chip size='sm' value={relationName} className={`${userId !== userProfile.userId && '!grayscale'} rounded-full OrangeChip h-max flex items-center gap-2 font-medium `}>
                        </Chip>
                    </div>
                    <Icon icon="cancel" onClick={() => handleClick(notif)} color="red" title="fermer la notification" size="2xl" style="!pt-1 !pl-1 !pr-1 -mt-1" />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody max-h-max !py-0">
                <Typography color="gray" className="font-normal truncate ">
                    {notif.title}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center !px-4">
                <DateChip start={updatedAt} prefix="mise à jour le " />
                <Icon icon="arrow_circle_right" link={`/${GetPathElement(element.toLowerCase())}/${notif.id}`} title={`voir les details de ${notif.title}`} size="4xl px-1" fill />
            </CardFooter>
        </Card>

    );
}