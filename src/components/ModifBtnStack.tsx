import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";

type value = { icon: string; function: () => void };
type ModifBtnStackProps = {
    values?: value[];
    icon3?: boolean;
    id: number;
    disabledEdit?: boolean;
    handleClickDelete?: (id: number) => void;
    isPool?: boolean;
};
export default function ModifBtnStack(props: ModifBtnStackProps) {
    const isPool = props.isPool;
    let type = new URLSearchParams(useLocation().pathname.split("/")[1])
        .toString()
        .replace("=", "");
    isPool && (type = "cagnotte");

    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState<value[]>([
        {
            icon: "edit",
            function: () => navigate({ pathname: `/${type}/edit/${props.id}` }),
        },
        {
            icon: "close",
            function: () => {
                alert(`Voulez-vous vraiment supprimer ${type} ${props.id} ?`);
            },
        },
        {
            icon: "groups",
            function: () => {
                alert(`Voulez-vous relancer ${type} ${props.id} ?`);
            },
        },
    ]);
    const [icon3, setIcon3] = useState<boolean>(false);
    props?.icon3 && setIcon3(props.icon3);
    props?.values && setDefaultValues(props.values);



    const [open, setOpen] = useState(false);
    const { handleClickDelete } = props;

    return (
        <div className="flex gap-1 items-center -space-x-0">
            <ConfirmModal open={open} handleOpen={() => setOpen(false)} handleCancel={() => { setOpen(false) }} handleConfirm={() => { handleClickDelete && handleClickDelete(props.id) }} title={"voulez vous vraiment supprimer"} element={type + " " + props.id} />
            <Button
                variant="outlined"
                className="flex items-center justify-center rounded-full h-9 w-9 p-1 "
                onClick={defaultValues[0].function}
                disabled={props.disabledEdit}
            >
                <span className="material-symbols-outlined unFillThin !text-[1.5rem]">
                    {defaultValues[0].icon}
                </span>
            </Button>
            <Button
                color="red"
                variant="outlined"
                className="flex items-center justify-center error rounded-full h-9 w-9 p-1 "
                onClick={() => setOpen(true)}

            >
                <span className="material-symbols-outlined  fillThin !text-[1.5rem]">
                    {defaultValues[1].icon}
                </span>
            </Button>
            <Button
                variant="outlined"
                className={
                    icon3
                        ? "flex items-center justify-center rounded-full h-9 w-9 p-1"
                        : "hidden"
                }
                onClick={defaultValues[2].function}
            >
                <span className="material-symbols-outlined fillThin !text-[1.5rem]">
                    {defaultValues[2].icon}
                </span>
            </Button>
        </div>
    );
}
