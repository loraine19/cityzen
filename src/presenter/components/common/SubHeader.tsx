import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string }
export default function SubHeader({ type, qty, place, closeBtn, link }: SubHeaderProps) {

    const goBack = link ? link : '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')

    return (
        <div className="flex w-full  justify-between items-end pb-0">
            <h2 className="text-3xl font-thin px-4 flex-1 text-blue-gray-900">
                <span className="font-medium ">
                    {qty} {type}
                </span>
                {place ? place : " dans votre quartier"}
            </h2>
            <Icon
                icon="cancel"
                size="4xl"
                fill
                style={`${closeBtn ? 'flex !py-0' : 'hidden'} thin`}
                link={goBack}
                title={"retour " + goBack?.replace("/", "")} />
        </div>
    )
}