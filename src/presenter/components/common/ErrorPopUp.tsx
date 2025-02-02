import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

interface ErrorPopUpProps {
    error: string | null;
    handleClose: () => void;
}
export const ErrorPopUp: React.FC<ErrorPopUpProps> = ({ error, handleClose }) => {
    const [open, setOpen] = useState(false);
    const handleConfirm = () => (setOpen(false))
    const handleCancel = () => (setOpen(false))

    return (<ConfirmModal
        open={open}
        handleOpen={handleClose}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        title="Une erreur est survenue"
        element={error || ''}
        disableConfirm
    />)
}