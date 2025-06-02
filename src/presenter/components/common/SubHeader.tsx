import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"
import { Typography } from "@material-tailwind/react"
import { useNotificationStore } from "../../../application/stores/notification.store"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string }
export default function SubHeader({ type, qty, place, closeBtn, link }: SubHeaderProps) {

    const goBack = link ?? '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')


    const { color } = useNotificationStore((state) => state);
    const colorBorder = `border-b-[2px]  ${color !== 'gray' ? `border-${color ?? 'gray'}-500 ` : 'border-gray-500'}  border-opacity-30`;
    return (
        <div className={`flex w-full divider-y lg:px-[2.5%] px-[1%] pt-2.5 gap-4 justify-end lg:justify-between`}>
            <Typography className={`!line-clamp-1 leading-[1] pb-1.5 lg:text-[1.4rem] text-[1.2rem] pl-2 flex-1 !text-blue-gray-800 !m-0 font-medium ${colorBorder}`}>
                {qty} {type}
                <span className="lg:inline font-thin ">
                    {place ?? " prés de chez vous"}

                </span>
            </Typography>
            {closeBtn && <Icon
                icon="close"
                color={color ?? 'gray'}
                size="md"
                bg
                link={goBack}
                title={"retour " + goBack?.replace("/", "")}
            />}
        </div>
    )
}