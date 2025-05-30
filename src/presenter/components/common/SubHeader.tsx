import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"
import { Typography } from "@material-tailwind/react"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string }
export default function SubHeader({ type, qty, place, closeBtn, link }: SubHeaderProps) {

    const goBack = link ?? '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')

    return (
        <div className="flex w-full gap-4 justify-end lg:justify-between ">
            <Typography className="line-clamp-1 lg:text-[1.7rem] text-[1.3rem] pl-2 lg:pl-4 flex-1 !text-blue-gray-900 !-mb-1  font-medium">
                {qty} {type}
                <span className="lg:inline hidden font-thin ">
                    {place ?? " dans votre quartier"}
                </span>
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