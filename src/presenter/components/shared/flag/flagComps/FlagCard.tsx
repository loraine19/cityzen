import { Card, CardBody, CardFooter, Typography, Chip, CardHeader } from "@material-tailwind/react";
import { Icon } from "../../../common/SmallComps";
import { useNavigate } from "react-router-dom";
import { Flag } from "../../../../../domain/entities/Flag";
import { FlagService } from "../../../../../domain/repositoriesBase/FlagRepository";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { flagReasons, flagTargets, getLabel } from "../../../../views/viewsEntities/utilsService";

export function FlagCard(props: { flag: Flag, update: () => void }) {
    const { targetId, createdAt, target, Post, Event, Survey, Service } = props.flag
    const element = Event || Post || Survey || Service || { title: "" }
    const label = getLabel(target, flagTargets)
    const reason = getLabel(props.flag.reason, flagReasons)
    const { update } = props
    const navigate = useNavigate();
    const { deleteFlag } = new FlagService()

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
        <Card className=" FixCard w-full  ">
            <CardHeader className="FixCardHeader NoImage  !max-h-max flex justify-between " floated={false}>
                <div className="flex flex-1 items-center gap-2  ">
                    <Chip size='sm' value={label} className="rounded-full h-max truncate " color="cyan">
                    </Chip>
                    <Chip size='sm' value={reason} className={`rounded-full OrangeChip h-max flex items-center gap-2 font-medium truncate overflow-auto !max-w-[35vw] `}>
                    </Chip>
                </div>
                <div className="min-w-[5rem] flex justify-end  pb-1">
                    <ModifBtnStack actions={MyActions} />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody max-max !py-0">
                <Typography color="gray" className="font-normal ">
                    {element.title}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center !px-4">
                <Chip size='sm' value={'signalé le ' + new Date(createdAt).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2  `}>
                </Chip>
                <Icon icon="arrow_circle_right" link={`/${label}/${targetId}`} title={`voir les details de ${element.title}`} size="4xl px-1" fill />
            </CardFooter>
        </Card>

    );
}