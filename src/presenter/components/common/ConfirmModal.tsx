import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import parse from 'html-react-parser';

export function ConfirmModal(props: { open: boolean, handleOpen: () => void, handleConfirm: () => void, handleCancel: () => void, title: string, element: string, disableConfirm?: boolean }) {
    const { open, handleOpen, handleConfirm, handleCancel, disableConfirm } = props
    return (
        <>
            <Button className="hidden">-</Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="text-center text-xl pt-4 pb-0">{props.title} : </DialogHeader>
                <DialogBody className=" max-h-[80vh] overflow-auto">
                    {parse(props.element as string)}

                </DialogBody>
                <DialogFooter className="  flex justify-between pt-0">
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={handleCancel}
                        className={`mr-1 rounded-full ${disableConfirm && 'invisible'}`}
                    >
                        <span>Annuler</span>
                    </Button>
                    <Button color="green" className="rounded-full" onClick={() => { handleConfirm() }}>
                        <span>Confirmer</span>
                    </Button>
                </DialogFooter>
            </Dialog></>
    );
}