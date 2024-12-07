import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";
import DataContext from "../contexts/data.context";
import { GetArrayElement } from "../functions/GetDataFunctions";
import { action } from "../types/class";

type CTAMinesProps = { values?: action[], icon3?: boolean, id: number, disabled1?: boolean, disabled2?: boolean, }

export default function CTAMines(props: CTAMinesProps) {
    const type = (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')
    const navigate = useNavigate();
    const { data, setDataInLocal } = useContext(DataContext)
    const { values, disabled1, disabled2, id } = props
    const icon2 = disabled2 ? (type + ' non modifiable') : 'Modifier'
    const array = GetArrayElement(type)
    const [icon3] = useState<boolean>(props.icon3 ? true : false)

    //// ENVOYER UN ARRAY INDENTIQUE SINON IL PREND CES VALEUR 
    const [buttons, setButtons] = useState<action[]>(
        [{
            icon: 'Supprimer',
            title: `Supprimer ${type} `,
            body: (data[array].find((element: any) => element.id === id)).title,
            function: () => {
                setDataInLocal({ ...data, [array]: data[array].filter((element: any) => element.id !== id) });
                navigate({ pathname: `/${type}` })
            },
        },
        {
            icon: icon2,
            title: "Modifier",
            body: (data[array].find((element: any) => element.id === id)).title,
            function: () => navigate({ pathname: `/${type}/edit/${id}` }),
        },
        {
            icon: 'Relancer',
            title: "Relancer",
            body: (data[array].find((element: any) => element.id === id)).title,
            function: () => { alert(`Voulez-vous relancer ${type} ${id} ?`) }
        },
        ]
    )

    useEffect(() => { values && setButtons(values) }, [values])
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0)
    console.log(buttons)

    return (
        <footer className="flex gap-2 gap-x-4 w-respLarge justify-around py-2">
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
                color="white"
                onClick={() => { setOpen(true), setIndex(0) }}
                disabled={disabled1} >
                {buttons[0].icon}
            </Button>

            <Button className="flex items-center justify-center rounded-full w-full lgBtn"
                color="white"
                onClick={() => { setOpen(true), setIndex(1) }}
                disabled={disabled2} >
                {buttons[1].icon}
            </Button>

            {icon3 &&
                <Button className={icon3 ? "flex items-center justify-center rounded-full w-full lgBtn" : "hidden"}
                    onClick={() => { setOpen(true), setIndex(2) }}>
                    {buttons[2].icon}
                </Button>}
        </footer>
    );
}