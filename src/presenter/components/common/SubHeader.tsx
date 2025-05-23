import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"
import { Typography } from "@material-tailwind/react"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string }
export default function SubHeader({ type, qty, place, closeBtn, link }: SubHeaderProps) {

    const goBack = link ? link : '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')

    return (
        <div className="flex w-full  justify-between items-end ">
            <Typography
                variant="h3"
                className="line-clamp-1 font-thin pr-4 flex-1 !text-blue-gray-900 -mb-1">
                <span className="font-medium ">
                    {qty} {type}
                </span>
                <span className="lg:inline hidden"> {place ? place : " dans votre quartier"}</span>
            </Typography>
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