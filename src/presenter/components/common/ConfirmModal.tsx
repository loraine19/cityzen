import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import parse from 'html-react-parser';

type ConfirmModalProps = {
    open: boolean;
    handleOpen: () => void;
    handleConfirm: () => void;
    handleCancel: () => void;
    title: string;
    element: string | JSX.Element;
    disableConfirm?: boolean;
    confirmString?: string;
    cancelString?: string;
}
export const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleOpen, handleConfirm, handleCancel, disableConfirm, title, element, confirmString = 'Confirmer', cancelString = 'Fermer' }) => {
    return (
        <>
            <Button className="hidden">
                -
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}>
                <DialogHeader
                    className="text-center text-xl pt-4 pb-0">
                    {title as string} :
                </DialogHeader>
                <DialogBody className=" max-h-[80vh] overflow-auto">
                    {element && typeof element === 'string' ? parse(element as string) : element}
                </DialogBody>
                <DialogFooter className="  flex justify-between pt-0">
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={handleCancel}
                        className={`mr-1 rounded-full ${disableConfirm && 'invisible'}`}
                    >
                        <span>
                            {cancelString}
                        </span>
                    </Button>
                    <Button
                        color="green"
                        className="rounded-full"
                        onClick={() => { handleConfirm() }}>

                        {confirmString}
                    </Button>
                </DialogFooter>
            </Dialog></>
    );
}