import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";
import DataContext from "../contexts/data.context";
import { GetArrayElement } from "../functions/GetDataFunctions";

type value = { icon: string, function: () => void, title?: string }
type CTAMinesProps = { values?: value[], icon3?: boolean, id: number, disabled1?: boolean, disabled2?: boolean, }

export default function CTAMines(props: CTAMinesProps) {
    const type = (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')
    const navigate = useNavigate();
    const { data, setDataInLocal } = useContext(DataContext)
    const icon2 = props.disabled2 ? (type + ' non modifiable') : 'Modifier'
    const array = GetArrayElement(type)


    //// ENVOYER UN ARRAY INDENTIQUE SINON IL PREND CES VALEUR 
    const [defaultValues, setDefaultValues] = useState<value[]>(
        [
            {
                icon: 'Supprimer', function: () => {
                    setOpen(true);
                    setDataInLocal({ ...data, [array]: data[array].filter((element: any) => element.id !== props.id) });
                    navigate({ pathname: `/${type}` })
                }, title: `Supprimer ${type} ${props.id}`
            },
            { icon: icon2, function: () => navigate({ pathname: `/${type}/edit/${props.id}` }), title: "Modifier" },
            { icon: 'Relancer', function: () => { alert(`Voulez-vous relancer ${type} ${props.id} ?`) }, title: "Relancer" },
        ]
    )

    useEffect(() => {
        props?.values && setDefaultValues(props.values)
    }, [props])
    const [icon3, setIcon3] = useState<boolean>(false)
    props?.icon3 && setIcon3(props.icon3)

    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [index, setIndex] = useState(0)

    return (
        <footer className="flex gap-2 gap-x-4 w-respLarge justify-around py-2">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    defaultValues[index].function();
                    setOpen(false)
                }}
                title={"Confimrer "}
                element={modalTitle} />

            <Button className="flex items-center justify-center rounded-full w-full shadow lgBtn"
                color="white"
                onClick={() => { setOpen(true), setModalTitle(defaultValues[0].title + ' ' + type), setIndex(0) }} disabled={props.disabled1} >
                {defaultValues[0].icon}
            </Button>
            <Button className="flex items-center justify-center rounded-full w-full lgBtn"
                color="white"
                onClick={() => { setOpen(true), setModalTitle(defaultValues[1].title + ' ' + type), setIndex(1) }} disabled={props.disabled2} >
                {defaultValues[1].icon}
            </Button>
            <Button className={icon3 ? "flex items-center justify-center rounded-full w-full lgBtn" : "hidden"}
                onClick={() => { setOpen(true), setModalTitle(defaultValues[0].title + ' '), setIndex(2) }}>

                {defaultValues[2].icon}
            </Button>
        </footer>
    );
}