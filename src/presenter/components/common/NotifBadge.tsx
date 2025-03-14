import { Menu, MenuHandler, Chip, MenuList, Typography, MenuItem } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { NotifView } from "../../views/viewsEntities/notifViewEntity";
import { useNavigate } from "react-router";
import DI from "../../../di/ioc";

export function NotifBadge() {
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const { notifs, isLoading, refetch, count } = notifViewModelFactory();
    const unReadNotif: boolean = count > 0
    const navigate = useNavigate()

    return (
        <div className="relative w-max ">
            <div>
                <Menu placement="bottom-end" >
                    <MenuHandler title="Notifications">
                        <Chip
                            className={`${unReadNotif ? "absolute flex font-medium  items-center justify-center w-7 h-7 text-sm pt-1.5  rounded-full bottom-0 right-8 shadow z-30" : "hidden"}`}
                            color="cyan"
                            value={count}>
                        </Chip>
                    </MenuHandler>
                    <MenuList className="flex flex-col  max-h-[calc(100vh-9rem)] max-w-[calc(100vw-2rem)] ml-3  rounded-2xl backdrop-blur-2xl">
                        <div className="overflow-auto flex flex-col gap-1">
                            {count === 0 || isLoading ? (
                                <div className="flex items-center justify-center p-4">
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal">
                                        Aucune nouvelle notification
                                    </Typography>
                                </div>)
                                : (notifs.map((notif: NotifView, index: number) => notif.read === false &&
                                    <MenuItem className="flex flex-col w-full  max-w-[calc(100vw-2rem)] "
                                        key={index}>
                                        <div className="flex items-center w-full justify-between">
                                            <Chip
                                                value={notif.typeS}
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
                                                className="max-w-[calc(100%-2rem)] truncate">
                                                {notif.description}
                                            </Typography>
                                            <Icon
                                                icon="chevron_right"
                                                fill
                                                onClick={async () => {
                                                    await readNotif(notif.id);
                                                    refetch();
                                                    navigate(notif.link)
                                                }}
                                                size="3xl"
                                                style="bg-white"
                                            />
                                        </div>
                                    </MenuItem>)
                                )}
                        </div>

                    </MenuList>
                </Menu>
            </div>
            <Icon
                onClick={() => { navigate('/notification') }}
                icon="notifications"
                disabled={!unReadNotif}
                color={unReadNotif ? 'orange' : ''}
                fill bg
                size="3xl"
                title={unReadNotif ? "voir mes notifications" : "Aucune notifications : button"}
                style=" rounded-full !p-2.5 !text-3xl !w-11 !h-11" />
        </div>
    )
}