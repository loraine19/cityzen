import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import parse from 'html-react-parser';
import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";

export type AlertModalProps = {
    handleConfirm: () => void;
    title: string;
    element: string | JSX.Element;
    disableConfirm?: boolean;
    confirmString?: string;
}



export const AlertModal = ({ globalError }: { globalError?: boolean }) => {
    const { handleConfirm, title, element, disableConfirm, confirmString } = useAlertStore(state => state.alertValues);
    const { setOpen } = useAlertStore(state => state);
    const open = useAlertStore(state => state.open);
    globalError && setOpen(true);

    if (open) return (
        <div className="!absolute top-0 h-full w-full z-50 !flex flex-1 justify-center items-center backdrop-filter backdrop-blur-sm">
            <Card
                className="relative h-min w-respLarge m-auto flex ">
                <CardHeader
                    className="FixCardHeaderNoImage flex items-center justify-between p-4 text-center text-xl">
                    <Typography variant="h5" color="blue-gray">{title}</Typography>
                    {!disableConfirm &&
                        <Icon
                            onClick={() => { setOpen(false) }}
                            icon="cancel"
                            size="3xl"
                            color="red" />}
                </CardHeader>
                <CardBody className="
                FixCardBody min-h-[18vh] max-h-[80vh] flex flex-col overflow-auto gap-6">
                    <hr></hr>{element && typeof element === 'string' ? parse(element as string) : element}
                </CardBody>
                <CardFooter className="justify-end FixCardFooter flex gap-8 pt-0">
                    <Button
                        size='lg'
                        color="cyan"
                        className="rounded-full"
                        onClick={() => { handleConfirm() }}>
                        {confirmString}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}