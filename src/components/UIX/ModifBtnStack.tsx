import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { action } from "../../types/class";

type ModifBtnStackProps = {
    actions: action[];
    icon3?: boolean;
    disabledEdit?: boolean;
    update?: () => void;
}

export default function ModifBtnStack(props: ModifBtnStackProps) {
    const { actions, disabledEdit, update } = props;
    const [buttons] = useState<action[]>(actions);
    const [icon3] = useState<boolean>(props.icon3 ? true : false);
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
                    update && update()
                }}
                title={buttons[index].title as string}
                element={buttons[index].body as any} />

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
                onClick={() => { setOpen(true), setIndex(2) }}
            >
                <span className="material-symbols-outlined fillThin !text-[1.5rem]">
                    {buttons[2].icon}
                </span>
            </Button>}
        </div>
    );
}


