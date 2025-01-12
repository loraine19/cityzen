import { Card, CardBody, CardFooter, Typography, Chip, CardHeader } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { flagReasons, flagTargets, getLabel, } from "../../functions/GetDataFunctions";
import { Flag } from "../../types/class";
import { deleteFlag } from "../../functions/API/flagsApi";
import ModifBtnStack from "../UIX/ModifBtnStack";

export function FlagCard(props: { flag: Flag, update: () => void }) {
    const { targetId, createdAt, target, Post, Event, Survey, Service } = props.flag
    const element = Event || Post || Survey || Service || { title: "" }
    const label = getLabel(target, flagTargets)
    const reason = getLabel(props.flag.reason, flagReasons)
    const { update } = props
    const navigate = useNavigate();

    const MyActions = [
        {
            icon: 'close',
            title: "Confirmer la suppression",
            body: `Confirmer la suppression du signalement ${element.title}, pour le motif ${reason}`,
            function: async () => {
                const ok = await deleteFlag(target.toString().toLowerCase(), targetId);
                if (ok) {
                    update()
                }
            },
        },
        {
            icon: 'edit',
            title: "Confirmer la modification",
            body: `Confirmer la modification du signalement ${element.title}, pour le motif ${reason}`,
            function: () => { navigate(`/flag/edit/${target.toString().toLowerCase()}/${targetId}`) },
        },

    ];

    return (
        <Card className="w-respLarge FixCard !h-max !max-w-[calc(100vw-1.6rem)] ">
            <CardHeader className="FixCardHeader NoImage" floated={false}>
                <div className="flex items-start w-full justify-between">
                    <div className="flex items-center gap-2 ">
                        <Chip value={label} className="rounded-full h-max truncate " color="cyan">
                        </Chip>
                        <Chip value={reason} className={`rounded-full OrangeChip h-max flex items-center gap-2 font-medium truncate overflow-auto !max-w-[35vw] `}>
                        </Chip>
                    </div>
                    <div className="flex items-center gap-3">
                        <ModifBtnStack actions={MyActions} />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="FixCardBody">
                <Typography color="gray" className="font-normal truncate max-w-[calc(100vw-1rem)]">
                    {element.title}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center !px-4">
                <Chip value={new Date(createdAt).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2  `}>
                </Chip>
                <Link to={`/${label}/${targetId}`}
                    className="flex items-center gap-2" title={`voir les details de ${element.title}`}>
                    <span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                        arrow_circle_right
                    </span>
                </Link>
            </CardFooter>
        </Card>

    );
}