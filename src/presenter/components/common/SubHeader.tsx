import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string }
export default function SubHeader({ type, qty, place, closeBtn, link }: SubHeaderProps) {

    const goBack = link ? link : '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')

    return (
        <div className="flex w-full  justify-between items-end lg:pb-2">
            <h2 className="lg:text-3xl text-2xl line-clamp-1 font-thin pr-4 flex-1 text-blue-gray-900">
                <span className="font-medium ">
                    {qty} {type}
                </span>
                <span className="lg:inline hidden"> {place ? place : " dans votre quartier"}</span>
            </h2>
            <Icon
                icon="close"
                color="gray"
                size="md"
                bg
                style={`${closeBtn ? 'flex mb-1 ' : 'hidden'} thin`}
                link={goBack}
                title={"retour " + goBack?.replace("/", "")} />
        </div>
    )
}