import { Button } from "@material-tailwind/react";
import { useState } from "react"
import { ConfirmModal } from "./ConfirmModal"
import { Action } from "../../../domain/entities/frontEntities";

type CTAMinesProps = {
    actions: Action[],
    icon3?: boolean,
    disabled1?: boolean,
    disabled2?: boolean,
    button3?: Action
}
export default function CTAMines(props: CTAMinesProps) {
    const { disabled1, disabled2, actions } = props
    const buttons = actions
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0)
    return (
        <footer className={`flex gap-2 gap-x-4 w-respLarge justify-around pt-2 pb-4 overflow-y-auto `}>
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    buttons[index].function();
                    setOpen(false)
                }}
                title={buttons[index].title as string}
                element={buttons[index].body as any} />

            {
                <>
                    <Button className={buttons[0].icon === '' ? "hidden" : "  rounded-full w-full !shadow lgBtn truncate"}
                        onClick={() => { setOpen(true), setIndex(0) }}

                        color="white"
                        disabled={disabled1} >
                        {buttons[0].icon}
                    </Button>

                    <Button className={buttons[1]?.icon === '' || !buttons[1]?.icon ? "hidden" : " rounded-full w-full !shadow lgBtn truncate"}
                        onClick={() => { setOpen(true), setIndex(1) }}

                        disabled={disabled2} >
                        {buttons[1]?.icon}
                    </Button>

                    <Button className={buttons[2]?.icon === '' || !buttons[2]?.icon ? "hidden" : "GreenChip rounded-full w-full !shadow lgBtn truncate"}
                        color="green"

                        onClick={() => { setOpen(true), setIndex(2) }}>
                        {buttons[2]?.icon}
                    </Button>
                    <Button className={buttons[3]?.icon === '' || !buttons[3]?.icon ? "hidden" : "RedChip rounded-full w-full !shadow lgBtn truncate"}

                        onClick={() => { setOpen(true), setIndex(3) }}>
                        {buttons[3]?.icon}
                    </Button>
                </>}
        </footer>
    );
}