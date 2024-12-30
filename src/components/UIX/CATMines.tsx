import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmModal } from "../UIX/ConfirmModal";
import DataContext from "../../contexts/data.context";
import { GetArrayElement } from "../../functions/GetDataFunctions";
import { action } from "../../types/class";

type CTAMinesProps = { values?: action[], icon3?: boolean, id: number, disabled1?: boolean, disabled2?: boolean, button3?: action }
export default function CTAMines(props: CTAMinesProps) {
    console.log(props)
    const type = (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')
    const navigate = useNavigate();
    const { data, setDataInLocal } = useContext(DataContext)
    const { disabled1, disabled2, id } = props
    const array = GetArrayElement(type)
    let values = props.values

    const empty: action[] = [
        {
            icon: 'no',
            title: 'no',
            body: 'no',
            function: () => { return null }
        },
        {
            icon: 'no',
            title: 'no',
            body: 'no',
            function: () => { return null }
        },
        {
            icon: 'no',
            title: 'no',
            body: 'no',
            function: () => { return null }
        }
    ]

    !values && (values = empty)
    const buttonsC = (values: action[]) => {
        return [{
            icon: values && values[0]?.icon !== 'no' ? values[0]?.icon : 'Supprimer ?',
            title: values && values[0]?.title !== 'no' ? values[0]?.title : 'Voulez vous vraiment Supprimer ?',
            body: values && values[0]?.body !== 'no' ? values[0]?.body :
                (data[array].find((element: any) => element.id === id))?.title,
            function: () => {
                if (values[0]?.function() === null) {
                    setDataInLocal({ ...data, [array]: data[array].filter((element: any) => element.id !== id) })
                    navigate({ pathname: `/${type}` })
                }
                else values[0]?.function
            }
        },
        {
            icon: values && values[1]?.icon !== 'no' ? values[1]?.icon : 'Modifier ?',
            title: values && values[1]?.title !== 'no' ? values[1]?.title : 'Voulez vous vraiment modifier ?',
            body: values && values[1]?.body !== 'no' ? values[1]?.body : (data[array].find((element: any) => element.id === id))?.title,
            function: () => {
                if (values[1]?.function() === null) { navigate({ pathname: `/${type}/edit/${id}` }) }
                else values[1]?.function

            }
        },
        {
            icon: values && values[2]?.icon !== 'no' ? values[2]?.icon : '',
            title: values ? values[2]?.title : '-',
            body: values ? values[2]?.body : '',
            function: () => {
                if (values[2]?.function() === null) { }
                else values[2]?.function

            }
        }
        ]
    }
    const buttons = buttonsC(values)
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0)
    return (
        <footer className={`${buttons[2]?.icon === '' || !buttons[2] ? "flex-row" : " flex-row"} " flex  gap-2 gap-x-4 w-respLarge justify-around py-2 `}>
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    buttons[index].function();
                    setOpen(false)
                }}
                title={buttons[index].title}
                element={buttons[index].body} />

            {
                <>
                    <Button className={buttons[0].icon === '' ? "hidden" : "  rounded-full w-full !shadow lgBtn"}
                        onClick={() => { setOpen(true), setIndex(0) }}
                        color="white"
                        disabled={disabled1} >
                        {buttons[0].icon}
                    </Button>

                    <Button className={buttons[1].icon === '' ? "hidden" : " rounded-full w-full !shadow lgBtn"}
                        onClick={() => { setOpen(true), setIndex(1) }}
                        disabled={disabled2} >
                        {buttons[1].icon}
                    </Button>

                    <Button className={buttons[2]?.icon === '' || !buttons[2]?.icon ? "hidden" : " rounded-full w-full !shadow lgBtn"}
                        color="green"
                        onClick={() => { setOpen(true), setIndex(2) }}>
                        {buttons[2]?.icon}
                    </Button>
                </>}
        </footer>
    );
}