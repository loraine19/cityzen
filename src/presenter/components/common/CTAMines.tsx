import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react"
import { Action } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";
import { PathElement } from "../../constants";
import { useAlertStore } from "../../../application/stores/alert.store";

type CTAMinesProps = {
    actions: Action[],
    icon3?: boolean,
    disabled1?: boolean,
    disabled2?: boolean,
    button3?: Action
}
export default function CTAMines({ disabled1, disabled2, actions }: CTAMinesProps) {
    const buttons = actions
    const [index, setIndex] = useState(3)

    const path = window.location.pathname
    let defColor: string;
    switch (true) {
        case [PathElement.SERVICE, PathElement.EVENT].some(element => path.includes(element)):
            defColor = 'cyan';
            break;
        case [PathElement.POST, PathElement.SURVEY, PathElement.POOL, PathElement.VOTE].some(element => path.includes(element)):
            defColor = 'orange';
            break;
        default:
            defColor = 'gray';
    }


    const { setAlertValues, setOpen } = useAlertStore(state => state)

    useEffect(() => {
        setAlertValues({
            handleConfirm: () => {
                buttons[index]?.function && buttons[index].function();
                setOpen(false)
            },
            title: buttons[index]?.title as string,
            element: buttons[index]?.body as string,
            disableConfirm: false,
            confirmString: 'Confirmer',
        })
        //// TODO voir utilisation de colorMap
        console.log(colorMap)
    }, [index]);

    const colorMap = {
        orange: 'OrangeChip',
        red: 'RedChip',
        cyan: 'CyanChip',
        gray: 'GrayChip',
        green: 'GreenChip',
    }



    return (
        <footer className={`CTA `}>


            {
                <>
                    <Button className={buttons[0]?.icon === '' ? "hidden" : `{colorMap[(buttons[0]?.color ?? defColor) as keyof typeof colorMap]} lgBtn `}
                        onClick={() => { setOpen(true), setIndex(0) }}
                        size='lg'
                        color={(buttons[0]?.color ?? defColor) as any}
                        disabled={disabled1} >
                        {buttons[0]?.iconImage &&
                            <Icon fill color='white' icon={buttons[0]?.iconImage} style="!p-0" />}
                        {buttons[0]?.icon}
                    </Button>

                    <Button className={buttons[1]?.icon === '' || !buttons[1]?.icon ? "hidden" : `{colorMap[(buttons[1]?.color ?? defColor) as keyof typeof colorMap]}   lgBtn `}
                        onClick={() => { setOpen(true), setIndex(1) }}
                        size='lg'
                        color={(buttons[1]?.color ?? defColor) as any}
                        disabled={disabled2} >
                        {buttons[1]?.iconImage &&
                            <Icon fill color='white' icon={buttons[1]?.iconImage} style="!p-0" />}
                        {buttons[1]?.icon}
                    </Button>

                    <Button className={buttons[2]?.icon === '' || !buttons[2]?.icon ? "hidden" : `{colorMap[(buttons[2]?.color ?? defColor) as keyof typeof colorMap]}   lgBtn `}
                        size='lg'
                        color={(buttons[2]?.color ?? defColor) as any}
                        onClick={() => { setOpen(true), setIndex(2) }}>
                        {buttons[2]?.iconImage &&
                            <Icon fill color='white' icon={buttons[2]?.iconImage} />}
                        {buttons[2]?.icon}

                    </Button>
                    <Button className={buttons[3]?.icon === '' || !buttons[3]?.icon ? "hidden" : `{colorMap[(buttons[3]?.color ?? defColor) as keyof typeof colorMap]}  lgBtn `}
                        size='lg'
                        color={(buttons[3]?.color ?? defColor) as any}
                        onClick={() => { setOpen(true), setIndex(3) }}>
                        {buttons[3]?.iconImage &&
                            <Icon fill color='white' icon={buttons[3]?.iconImage} style="!p-0" />}
                        {buttons[3]?.icon}
                    </Button>
                </>}
        </footer>
    );
}