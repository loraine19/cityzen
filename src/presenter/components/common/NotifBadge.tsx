import { Menu, MenuHandler, Chip, MenuList, Typography, MenuItem } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { useNotificationStore } from "../../../application/stores/notification.store";
import { NotifView } from "../../views/viewsEntities/notifViewEntity";

export function NotifBadge() {
    const notifList = useNotificationStore((state) => state.notifList);
    const qty: number = notifList && notifList.filter((notif: NotifView) => notif?.read === false).length
    const unReadNotif: boolean = qty > 0
    const color = unReadNotif ? 'orange' : 'gray'

    return (
        <div className="relative w-max ">
            <div>
                <Menu placement="bottom-end" >
                    <MenuHandler title="Notifications">
                        <Chip
                            className={`${unReadNotif ? "absolute flex font-medium  items-center justify-center w-7 h-7 text-sm pt-1.5  rounded-full bottom-0 right-8 shadow z-30" : "hidden"}`}
                            color="cyan"
                            value={qty}>
                        </Chip>
                    </MenuHandler>
                    <MenuList className="flex flex-col  max-h-[calc(100vh-9rem)] max-w-[calc(100vw-2rem)] ml-3  rounded-2xl backdrop-blur-2xl">
                        <div className="overflow-auto flex flex-col gap-1">
                            {qty === 0 || !notifList ? (
                                <div className="flex items-center justify-center p-4">
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal">
                                        Aucune nouvelle notification
                                    </Typography>
                                </div>)
                                : (notifList.map((notif: NotifView, index: number) => notif.read === false &&
                                    <MenuItem className="flex flex-col w-full  max-w-[calc(100vw-2rem)] "
                                        key={index}>
                                        <div className="flex items-center w-full justify-between">
                                            <Chip
                                                value={notif.elementType}
                                                className="rounded-full w-max h-max text-ellipsis pt-1.5  "
                                                size='sm'
                                                color="cyan">
                                            </Chip>
                                            <Typography
                                                className="flex items-center gap-1 text-xs font-normal text-blue-gray-500">
                                                {notif.update}
                                            </Typography></div>
                                        <div className="flex items-center justify-between gap-1">
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="font-semibold truncate max-w-[calc(100%-1rem)]">
                                                {notif.title}
                                            </Typography>
                                            <Icon
                                                icon="chevron_right"
                                                fill
                                                link={`/${notif.elementType}/${notif.id}`}
                                                size="3xl" />
                                        </div>
                                    </MenuItem>)
                                )}
                        </div>

                    </MenuList>
                </Menu>
            </div>
            <Icon
                icon="notifications"
                link='/notification'
                color={color || 'orange'}
                fill bg
                size="3xl"
                title="voir mes notifications"
                style="!p-2.5 !text-3xl !w-11 !h-11" />
        </div>
    )
}