import { Button } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import { useContext, useState } from "react";
import UserContext from "../contexts/user.context";
import { ConfirmModal } from "./ConfirmModal";

export default function CTA(props:
    {
        addBtn?: boolean,
        text: string,
        disabled?: boolean,
        cancelBtn?: boolean,
        handleClick?: (element: any) => void
        handleClickCancel?: () => void
        element: any
    }) {
    const { text, disabled, cancelBtn, handleClick, element } = props
    const type = (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')
    const { user } = useContext(UserContext);

    let onClick = (element: any) => { alert(`${user.firstName} a ${element.title}   ?`) }
    handleClick && (onClick = handleClick)


    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    return (
        <footer className="flex gap-2  w-respLarge justify-around py-2">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    onClick(element)
                    setOpen(false)
                }}
                title={modalTitle}
                element={type + " " + element.title} />
            <Button
                onClick={() => { setOpen(true), setModalTitle("voulez vous participer") }}
                disabled={disabled}

                className="lgBtnflex items-center w-full justify-center rounded-full font-medium shadow " >
                {text}
            </Button>
            {
                cancelBtn &&
                <Button
                    color="white"
                    onClick={() => { setOpen(true), setModalTitle("voulez vous vraiment annuler") }}
                    className="lgBtn flex items-center w-full justify-center rounded-full font-medium shadow " >
                    Annuler
                </Button>
            }
        </footer>
    );
}