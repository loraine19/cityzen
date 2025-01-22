import { Avatar, Chip, List, ListItem, ListItemPrefix, Popover, PopoverContent, PopoverHandler, Progress, Typography, } from "@material-tailwind/react";
import { dayMS } from "../../../infrastructure/services/utilsService"
import { Link, } from "react-router-dom";
import { Profile } from "../../../domain/entities/Profile";
import Skeleton from "react-loading-skeleton";
import DI from "../../../di/ioc";

export function DateChip(props: { start: Date | string, end?: Date | string, ended?: boolean, prefix?: string }) {
    const { start, end, prefix, ended } = props
    const now = new Date();
    const endDate: string = end && new Date(end).toLocaleDateString('fr-FR') || ''
    const endDays: number = Math.floor((new Date(start).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const dateClass =
        !end && "GrayChip" ||
        endDays <= 0 && "RedChip" ||
        endDays < 5 && "OrangeChip" ||
        endDays > 19 && "GreenChip" || 'GrayChip'
    const value =
        prefix && !ended && !end && `${prefix} ${new Date(start).toLocaleDateString('fr-FR')}`
        || ended && `finis le ${endDate}`
        || endDays > 5 && `${prefix} ${endDays} jours`
        || endDays > 0 && `il reste ${endDays} jours`

    return (
        <Chip size="sm" value={value}
            className={`${dateClass} rounded-full w-max h-max lowercase shadow`}>
        </Chip>
    )
}

export function FlagIcon(props: { flagged: boolean, id: number, type: string }) {
    const { flagged, id, type } = props;
    const to = `/flag${flagged ? '/edit' : ''}/${type}/${id}`
    return (
        <Icon icon="flag_2" link={to} color={flagged ? 'red' : 'gray'} fill={flagged} size="xl" title={"signaler " + type} style="hover:bg-red-500/30 hover:!px-[0.3rem] hover:text-red-700" />
    )
}




export function Icon(props: {
    icon: string, style?: string, fill?: boolean, size?: string, onClick?: () => void, color?: string, bg?: boolean, title?: string, link?: string, disabled?: boolean
}) {
    const { title, icon, disabled } = props
    let size = props.size || "2xl"
    size === '5xl' && (size = '[2.8rem]')
    const pad = props.bg ? 'px-[11%]' : 'px-1'
    const fill = props.fill ? "fillThin" : ""
    const onClick = props.onClick
    const color = !disabled ? props.color : "gray"
    const textColor = props.color && `text-${color}-700` || "text-gray-900"
    const bg = (props.bg && props.color) && `bg-${color}-500 bg-opacity-30 ` || props.bg && "!bg-gray-300" || ''
    const style = props.style || ""
    const link = props.link || ""
    const classIcon = `icon notranslate pt-0.5  flex items-center justify-center !text-${size} ${fill} ${style} ${textColor} ${bg} ${pad}`
    const classActive = `hover:!bg-${color}-500 hover:bg-opacity-50 hover:!shadow hover:${pad} rounded-full transition-all duration-200 ease-in-out ${!bg && `hover:!bg-gray-300 `}`
    const span =
        <span title={title} className={`${classIcon} `}> {icon}</span>
    const button =
        <button type="button" onClick={onClick} title={!disabled ? title : title + ' est desactivée'} className={`${classIcon} ${!disabled && classActive} `} disabled={disabled}>
            {icon}
        </button>
    const linkIcon =
        <Link to={link} title={title} rel="noopener noreferrer" className={`${classIcon} ${classActive}  `}>
            {icon}
        </Link>
    return link ? linkIcon : onClick ? button : span

}


export function ProgressLargebar(props: { value: number, float?: boolean, label?: string }) {
    const { value, float, label } = props
    const style = float ? "h-max w-full !rounded-full  backdrop-blur flex items-center gap-2 shadow p-2" :
        "!rounded-full bg-cyan-200 backdrop-blur flex items-center gap-2 shadow p-2"

    return (
        <div className={style}>
            {value > 0 ? <Progress value={value} color={value >= 100 ? "green" : "gray"} size="md"
                label={value >= 100 ? " Validé" : ' '} /> :
                <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                    <Typography className="mb-0 text-xs font-medium"> pas encore de {label}</Typography>
                </div>}
        </div>)
}


export function ProgressSmallbar(props: { value: number, label?: string, size?: string, needed: number }) {
    const { value, label, needed } = props
    const size = props.size ? props.size : "md"
    const textSize = size === "lg" && 'h5'
        || size === "md" && 'small' || 'normal';

    const label2 = ` ${value > 0 ? value + '%' : ''}`
    const label3 = needed > 0 && value > 0 ? ` il manques ${needed} ${label}` : ''

    return (
        < div className={`h-max w-full flex -m-1 flex-col px-2 pb-3 gap-2 ${size === "lg" && "mb-4"}`}>
            <div className=" flex  w-full items-center justify-between gap-2">
                <Typography color={value < 1 ? "red" : "blue-gray"} variant={textSize as any} >
                    {value > 0 ? `Validé à ` : `Pas encore de ${label}`}
                </Typography>
                <Typography color='blue-gray' variant={textSize as any}>
                    {label2}
                </Typography>
                <Typography color="blue-gray" variant={textSize as any} className={`flex-1 text-right ${label3 === '' && 'hidden'}`}>
                    {label3}
                </Typography>
            </div>
            <Progress value={value} color={value > 100 ? "green" : "gray"} size={size as any} />
        </div>)
}


export function ProfileDiv(props: { profile: Profile, size?: string }) {
    if (!props.profile) return <Skeleton />
    const { profile } = props
    const { image, firstName, lastName, skills } = profile;
    const size = !props.size ? "sm" : props.size
    return (
        <div className="flex items-center px-0 gap-2">
            <Popover placement="bottom-start">
                <PopoverHandler>
                    <Avatar src={image as string} size={size as any} alt="avatar" withBorder={true} />
                </PopoverHandler>
                <PopoverContent className="w-72">
                    <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                        <Avatar src={image as string} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="h6" color="blue-gray">{firstName} {lastName}</Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">{skills}</Typography>
                        </div>
                    </div>
                    <List className="p-0">
                        <ListItem className="rounded-2xl !py-0">
                            <ListItemPrefix>
                                <Icon icon="distance" fill size="2xl" color="blue-gray" />
                            </ListItemPrefix>
                            {profile.Address?.city}, {profile.Address?.zipcode}
                        </ListItem>
                    </List>
                </PopoverContent>
            </Popover>
            <div className="flex flex-col">
                <Typography variant={size === "xl" ? "h5" : "h6"} color="blue-gray" className="border-b border-blue-gray-200 pr-4">{firstName} {lastName}</Typography>

                <Typography variant={size === "xl" ? "h6" : "small"} className="font-normal text-blue-gray-500">◦ {skills}</Typography>
            </div>
        </div>


    )
}


export function Title(props: { title: string, flagged?: boolean, id?: number, CreatedAt?: string | Date, subTitle?: string }) {
    const { title, flagged, id, CreatedAt, subTitle } = props
    return (
        <>
            <div className="flex items-center w-full   justify-between  gap-2">
                <div className="flex items-center gap-4 !max-w-[calc(100%-1.5rem)]">
                    <Typography variant="h5" color="blue-gray" className=" flex whitespace-nowrap overflow-x-auto  ">{title} {title?.length > 39 && <span className="sticky -right-1 bg-white px-2 "> ... </span>}
                    </Typography>
                    {CreatedAt && <span className="text-xs">{new Date(CreatedAt).toLocaleDateString('fr-FR')}</span>}
                </div>
                {id && <FlagIcon flagged={flagged ? true : false} id={id} type="service" />
                }
            </div>
            {subTitle && <Typography variant="small" color="blue-gray" className="truncate font-normal">{subTitle}</Typography>}</>)
}

export const LogOutButton = () => {
    const { logOut } = DI.resolve('authService');
    return <Icon icon="exit_to_app" size="2xl" style="px-3" onClick={logOut} title="se déconnecter" />
}