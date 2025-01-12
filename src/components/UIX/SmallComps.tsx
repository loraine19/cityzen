import { Avatar, Chip, List, ListItem, ListItemPrefix, Menu, MenuHandler, MenuItem, MenuList, Popover, PopoverContent, PopoverHandler, Typography, } from "@material-tailwind/react";
import { dayMS, GetPathElement } from "../../functions/GetDataFunctions"
import { Link, } from "react-router-dom";
import { Notif, Profile } from "../../types/class";
import UserContext from "../../contexts/user.context";
import { useContext } from "react";

export function DateChip(props: { createdAt: string | Date, ended?: boolean, prefix?: string }) {
    const { createdAt, ended, prefix } = props
    const now = new Date();
    const endDate: string = new Date(new Date(createdAt).getTime() + 15 * dayMS).toLocaleDateString('fr-FR')
    const endDays: number = Math.floor((new Date(createdAt).getTime() + 15 * dayMS - (now.getTime())) / dayMS)
    const dateClass = endDays <= 0 ? "RedChip" : endDays < 5 && !ended ? "OrangeChip" : "GrayChip";
    const value =
        prefix && prefix + " " + new Date(createdAt).toLocaleDateString('fr-FR')
        || ended && `finis le ${endDate}`
        || endDays > 5 && `${endDays} jours`
        || endDays > 0 && `il reste ${endDays} jours`

    return (
        <Chip value={value}
            className={`${dateClass} rounded-full w-max h-max lowercase shadow`}>
        </Chip>
    )
}

export function FlagIcon(props: { flagged: boolean, id: number, type: string }) {
    const { flagged, id, type } = props;
    const to = `/flag${flagged ? '/edit' : ''}/${type}/${id}`
    return (
        <Icon icon="flag_2" link={to} color={flagged ? 'red' : 'gray'} fill={flagged} size="xl" title={"signaler " + type} style="hover:bg-red-200 hover:!px-1.5 hover:text-red-700" />
    )
}

export function NotifBadge(props: { qty: number }) {
    const { qty } = props
    const unReadNotif: boolean = qty > 0
    const { notifList } = useContext(UserContext)
    const color = unReadNotif ? 'orange' : 'gray'

    return (
        <div className="relative w-max ">
            <div>
                <Menu placement="bottom-end" >
                    <MenuHandler>
                        <Chip className={`${unReadNotif ? "absolute flex font-medium  items-center justify-center w-7 h-7 text-sm pt-2  rounded-full bottom-0 right-9 shadow z-30" : "hidden"}`} color="cyan" value={qty}>
                        </Chip>
                    </MenuHandler>
                    <MenuList className="flex flex-col  max-h-[calc(100vh-9rem)] max-w-[calc(100vw-2rem)] ml-3  rounded-2xl backdrop-blur-2xl">
                        <div className="overflow-auto flex flex-col gap-1">
                            {notifList.map((notif: Notif, index: number) => notif.read === false &&
                                <MenuItem className="flex flex-col  " key={index}>
                                    <div className="flex items-center justify-between">
                                        <Chip value={GetPathElement(notif.element.toString().toLowerCase())} className="rounded-full w-max h-max text-ellipsis pt-1.5  " size='sm' color="cyan">
                                        </Chip>
                                        <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                                            {new Date(notif.updatedAt).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })} à {new Date(notif.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        </Typography></div>
                                    <div className="flex items-center justify-between gap-1">
                                        <Typography variant="small" color="gray" className="font-semibold truncate">
                                            {notif.title}
                                        </Typography>
                                        <Icon icon="arrow_circle_right" link={`/${GetPathElement(notif.element.toString().toLowerCase())}/${notif.id}`} color="blue-gray" size="2xl" fill />

                                    </div>


                                </MenuItem>)}
                        </div>
                    </MenuList>
                </Menu>
            </div>
            <Icon icon="notifications" link='/notification' color={color || 'orange'} fill bg size="3xl" title="voir mes notifications" />
        </div>
    )
}



export function Icon(props: {
    icon: string, style?: string, fill?: boolean, size?: string, onClick?: () => void, color?: string, bg?: boolean, title?: string, link?: string
}) {
    let size = props.size || "2xl"
    size === '5xl' && (size = '[2.8rem]')
    const pad = size === "2xl" && "!pt-1 !pl-2" || size === "3xl" && "!px-[0.6rem] !py-[0.4rem]" || size === "4xl" && "!px - 6" || size === "xl" && "!px-1.5" || size === "lg" && "!px-[0.4rem]" || ''
    const fill = props.fill ? "fillThin" : ""
    const onClick = props.onClick
    const color = props.color
    const textColor = props.color && `text-${color}-700` || "text-gray-900"
    const bg = props.bg ? props.color ? `bg-${color}-500 bg-opacity-40  ` : "bg-gray-300" : ""
    const style = props.style || ""
    const link = props.link || ""
    const classIcon = `icon notranslate pt-0.5 flex items-center justify-center !text-${size} ${fill} ${style} ${textColor} ${bg} ${bg ? pad : ""}`
    const classActive = `${props.color ? `hover:!bg-${color}-200` : `hover:!bg-gray-300`} hover:bg-opacity-60 hover:!shadow hover:${pad} rounded-full transition-all duration-200 ease-in-out `

    const span = <span
        title={props.title} className={`${classIcon} `}>
        {props.icon}
    </span>
    const button = <button onClick={onClick}
        title={props.title} className={`${classIcon} ${classActive}  `}>
        {props.icon}
    </button>
    const linkIcon =
        <Link to={props.link || ""}
            title={props.title} className={`${classIcon} ${classActive}  `}>
            {props.icon}
        </Link>

    return link ? linkIcon : onClick ? button : span

}


export function AuthorDiv(props: { profile: Profile }) {
    const { profile } = props
    const { image, firstName, lastName, skills } = profile;
    return (
        <div className="flex items-center px-0 gap-2">
            <Popover placement="bottom-start">
                <PopoverHandler>
                    <Avatar src={image as string} size="sm" alt="avatar" withBorder={true} />
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
                <Typography variant="h6" color="blue-gray">{firstName} {lastName}</Typography>
                <Typography variant="small" className="font-normal text-blue-gray-500">{skills}</Typography>
            </div>
        </div>


    )
}

