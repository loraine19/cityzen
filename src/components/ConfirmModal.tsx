import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import parse from 'html-react-parser';
export function ConfirmModal(props: { open: boolean, handleOpen: () => void, handleConfirm: () => void, handleCancel: () => void, title: string, element: string }) {
    const { open, handleOpen, handleConfirm, handleCancel } = props
    return (
        <>
            <Button className="hidden">-</Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="text-center text-xl pt-4 pb-0">{props.title} : </DialogHeader>
                <DialogBody className="capitalize max-h-[80vh] overflow-auto">
                    {/* {parse(props.element)} */}
                    {props.element}
                </DialogBody>
                <DialogFooter className="  flex justify-between pt-0">
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={handleCancel}
                        className="mr-1 rounded-full"
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