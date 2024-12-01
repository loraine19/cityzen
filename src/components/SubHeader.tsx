import { Button } from "@material-tailwind/react"
import { Link, useLocation } from "react-router-dom"

export default function SubHeader(props: { type: string, qty?: number, place?: any, closeBtn?: boolean }) {
    const { type, qty, place, closeBtn } = props

    const goBack = (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')
    return (
        <div className="flex justify-between items-center pb-2">
            <h2 className="text-3xl font-thin px-4 ">
                <span className="font-medium capitalize">{qty} {type} </span>{place ? place : " dans votre quartier"}
            </h2>
            <div className={closeBtn ? 'flex' : 'hidden'}>

                <Link to={`/${goBack}`}>
                    <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 p-4 opacity-80">
                        <span className="material-symbols-outlined fillThin !text-4xl" >cancel</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}