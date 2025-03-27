import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import parse from 'html-react-parser';
import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";
import { AlertValues } from "../../../domain/entities/Error";





export const AlertModal = ({ values }: { values: AlertValues }) => {
    const { title, element, disableConfirm, confirmString, button2, isOpen, close } = values;

    const { open, setOpen } = useAlertStore(state => state)


    if (close ? isOpen : open) return (
        <div className={`!absolute top-0 left-0 h-full px-[2rem]  w-full mx-[1rem] z-50 !flex flex-1 justify-center items-center backdrop-filter backdrop-blur-sm `} >
            <Card
                className="relative  h-min w-resp m-auto flex ">
                <CardHeader
                    className="FixCardHeaderNoImage flex items-center justify-between p-4 text-center text-xl">
                    <Typography
                        variant="h5">{title}</Typography>
                    {!disableConfirm &&
                        <Icon
                            onClick={() => { close ? close() : setOpen(false) }}
                            icon="cancel"
                            size="3xl"
                            color="red" />}
                </CardHeader>
                <CardBody className="
                FixCardBody min-h-[18vh]  max-h-[80vh] flex flex-col overflow-auto gap-6">
                    <hr></hr>{element && typeof element === 'string' ? parse(element as string) : element}
                </CardBody>
                <CardFooter className="justify-end FixCardFooter flex gap-8 pt-0">
                    {button2 &&
                        <Button
                            size='lg'
                            color="red"
                            className="rounded-full lgBtn max-w-max"
                            onClick={() => { button2.onClick() }}>
                            {button2.text}
                        </Button>}
                    {<Button
                        size='lg'
                        color="cyan"
                        className="rounded-full lgBtn max-w-max"
                        onClick={() => values.handleConfirm ? values.handleConfirm() : close ? close() : setOpen(false)
                        }>
                        {confirmString}
                    </Button>}
                </CardFooter>
            </Card>
        </div>
    );
}
