import { useLocation } from "react-router-dom"
import { Icon } from "./SmallComps"

export default function SubHeader(props: { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string }) {
    const { type, qty, place, closeBtn, link } = props
    const goBack = link || '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')

    return (
        <div className="flex justify-between items-start pb-2">
            <h2 className="text-3xl font-thin px-4 ">
                <span className="font-medium ">{qty} {type} </span>{place ? place : " dans votre quartier"}
            </h2>
            <div className={closeBtn ? 'flex' : 'hidden'}>
                <Icon icon="cancel" size="4xl" fill style="thin hover:!p-0" link={goBack} title={"retour à " + goBack?.replace("/", "")} />
            </div>
        </div>
    )
}