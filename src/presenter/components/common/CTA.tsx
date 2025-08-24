import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react"
import { Action } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";
import { PathElement } from "../../constants";
import { useAlertStore } from "../../../application/stores/alert.store";

type CTAProps = {
    actions: Action[],
    icon3?: boolean,
    disabled1?: boolean,
    disabled2?: boolean,
    button3?: Action
}
export default function CTAMines({ disabled1, disabled2, actions }: CTAProps) {
    const [index, setIndex] = useState(3)

    const path = window.location.pathname
    let defColor: string;
    let customColor: string = ''
    switch (true) {
        case [PathElement.SERVICE, PathElement.EVENT, PathElement.GROUP].some(element => path.includes(element)):
            defColor = 'cyan';
            break;
        case [PathElement.SURVEY, PathElement.POOL, PathElement.VOTE].some(element => path.includes(element)):
            defColor = 'orange';
            break;
        case [PathElement.POST].some(element => path.includes(element)):
            defColor = '';
            customColor = 'bg-rose-500';
            break;
        default:
            defColor = 'gray';
    }


    const { setAlertValues, setOpen, } = useAlertStore(state => state)

    useEffect(() => {
        setAlertValues({
            handleConfirm: () => {
                actions[index]?.function && actions[index].function();
                setOpen(false)
            },
            title: actions[index]?.title as string,
            element: actions[index]?.body as string,
            disableConfirm: false,
            confirmString: 'Confirmer',
            notif: '',
        })
    }, [index]);

    // const colorMap = {
    //     orange: 'OrangeChip',
    //     red: 'RedChip',
    //     cyan: 'CyanChip',
    //     gray: 'GrayChip',
    //     green: 'GreenChip',
    // }



    return (
        <footer className={`CTA pt-1 overflow-y-auto`}>
            {
                <>
                    <Button className={actions[0]?.icon === '' ? "hidden" : `${customColor} lgBtn `}
                        onClick={() => { setOpen(true), setIndex(0) }}
                        size='lg'
                        color={(actions[0]?.color ?? defColor) as any}
                        disabled={disabled1} >
                        {actions[0]?.iconImage &&
                            <Icon
                                fill
                                color='white'
                                icon={actions[0]?.iconImage}
                                size='lg' />}
                        {actions[0]?.icon}
                    </Button>

                    <Button className={actions[1]?.icon === '' || !actions[1]?.icon ?
                        "hidden" : `${customColor} lgBtn `}
                        onClick={() => { setOpen(true), setIndex(1) }}
                        size='lg'
                        color={(actions[1]?.color ?? defColor) as any}
                        disabled={disabled2} >
                        {actions[1]?.iconImage &&
                            <Icon
                                fill color='white' icon={actions[1]?.iconImage} size="lg" />}
                        {actions[1]?.icon}
                    </Button>

                    <Button className={actions[2]?.icon === '' || !actions[2]?.icon ?
                        "hidden" : `${customColor} lgBtn `}
                        size='lg'
                        color={(actions[2]?.color ?? defColor) as any}
                        onClick={() => { setOpen(true), setIndex(2) }}>
                        {actions[2]?.iconImage &&
                            <Icon fill color='white' icon={actions[2]?.iconImage} size="lg" />}
                        {actions[2]?.icon}

                    </Button>
                    <Button className={actions[3]?.icon === '' || !actions[3]?.icon ?
                        "hidden" : `${customColor}  lgBtn `}
                        size='lg'
                        color={(actions[3]?.color ?? defColor) as any}
                        onClick={() => { setOpen(true), setIndex(3) }}>
                        {actions[3]?.iconImage &&
                            <Icon fill color='white' icon={actions[3]?.iconImage} size="lg" />}
                        {actions[3]?.icon}
                    </Button>
                </>}
        </footer>
    );
}