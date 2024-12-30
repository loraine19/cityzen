import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { action } from "../../types/class";
import DataContext from "../../contexts/data.context";
import { GetArrayElement } from "../../functions/GetDataFunctions";

export default function CTA(props:
    {
        addBtn?: boolean,
        disabled?: boolean,
        cancelBtn?: boolean,
        element: any,
        values?: action[]
    }) {
    const { disabled, cancelBtn, element, values } = props
    const type = (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')
    const { data, setDataInLocal } = useContext(DataContext)
    const array = GetArrayElement(type)
    const navigate = useNavigate();
    const id = element.id

    const [buttons, setButtons] = useState<action[]>(
        [{
            icon: 'Supprimer',
            title: `Supprimer ${type} ${id}`,
            body: (data[array].find((element: any) => element.id === id))?.title,
            function: () => {
                setDataInLocal({ ...data, [array]: data[array].filter((element: any) => element.id !== id) });
                navigate({ pathname: `/${type}` })
            },
        },
        {
            icon: 'Modidfier',
            title: "Modifier",
            body: (data[array].find((element: any) => element.id === id))?.title,
            function: () => navigate({ pathname: `/${type}/edit/${id}` }),
        },
        ]
    )

    useEffect(() => { values && setButtons(values) }, [values])
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0)

    return (
        <footer className="flex gap-2  w-respLarge justify-around py-2">

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


            <Button className="flex items-center justify-center rounded-full w-full shadow lgBtn"
                onClick={() => { setOpen(true), setIndex(0) }}
                disabled={disabled} >
                {buttons[0].icon}
            </Button>

            {
                cancelBtn && <Button className="flex items-center justify-center rounded-full w-full lgBtn"
                    color="white"
                    onClick={() => { setOpen(true), setIndex(1) }} >
                    {buttons[1].icon}
                </Button>}
        </footer>
    );
}