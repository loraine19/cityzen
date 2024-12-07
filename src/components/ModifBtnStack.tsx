import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";
import { action } from "../types/class";
import DataContext from "../contexts/data.context";
import { GetArrayElement } from "../functions/GetDataFunctions";

type ModifBtnStackProps = {
    values?: action[];
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
    const { id, values, disabledEdit, handleClickDelete } = props;
    const { data } = useContext(DataContext);
    const array = GetArrayElement(type)

    const navigate = useNavigate();
    const [buttons, setButtons] = useState<action[]>([
        {
            icon: "edit",
            title: `Modifier ${type}`,
            body: (data[array].find((element: any) => element.id === id)).title,
            function: () => navigate({ pathname: `/${type}/edit/${props.id}` }),
        },
        {
            icon: "close",
            title: `Supprimer ${type}`,
            body: (data[array].find((element: any) => element.id === id)).title,
            function: () => { handleClickDelete && handleClickDelete(id) },
        },
        {
            icon: "groups",
            title: `Relancer ${type}`,
            body: (data[array].find((element: any) => element.id === id)).title,
            function: () => {
                alert(`Voulez-vous relancer ${type} ${props.id} ?`);
            },
        },
    ]);
    const [icon3] = useState<boolean>(props.icon3 ? true : false);
    useEffect(() => { values && setButtons(values) }, [values])
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0)

    return (
        <div className="flex gap-2 items-center ">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    buttons[index].function();
                    setOpen(false)
                }}
                title={buttons[index].title}
                element={buttons[index].body} />

            <Button
                variant="outlined"
                className="flex items-center justify-center rounded-full h-9 w-9 p-1 "
                onClick={() => { setOpen(true), setIndex(0) }}
                disabled={disabledEdit}
            >
                <span className="material-symbols-outlined unFillThin !text-[1.5rem]">
                    {buttons[0].icon}
                </span>
            </Button>

            <Button
                color="red"
                variant="outlined"
                className="flex items-center justify-center error rounded-full h-9 w-9 p-1 "
                onClick={() => { setOpen(true), setIndex(1) }}
            >
                <span className="material-symbols-outlined  fillThin !text-[1.5rem]">
                    {buttons[1].icon}
                </span>
            </Button>

            {icon3 && <Button
                variant="outlined"
                color="cyan"
                className={"flex items-center justify-center rounded-full h-9 w-9 p-1"}
                onClick={() => { setOpen(true), setIndex(0) }}
            >
                <span className="material-symbols-outlined fillThin !text-[1.5rem]">
                    {buttons[2].icon}
                </span>
            </Button>}
        </div>
    );
}


