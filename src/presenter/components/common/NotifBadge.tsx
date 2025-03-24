import { Menu, MenuHandler, Chip, MenuList, Typography, MenuItem, Card } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { NotifView } from "../../views/viewsEntities/notifViewEntity";
import { useNavigate } from "react-router";
import DI from "../../../di/ioc";
import { LoadMoreButton } from "./LoadMoreBtn";
import { useEffect, useRef, useState } from "react";
import { ElementNotif, Notif } from "../../../domain/entities/Notif";
import { connectedUsersStore } from "../../../application/stores/connectedUsers.store";
import { useNotificationStore } from "../../../application/stores/notification.store";

export function NotifBadge({ onBoard }: { onBoard?: boolean }) {
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const { notifs, isLoading, refetch, count, fetchNextPage, hasNextPage } = notifViewModelFactory();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const unReadNotif: boolean = count > 0
    const navigate = useNavigate()
    const nameSpace = 'notifs';
    const [notif, setNotif] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);
    const socketService = DI.resolve('socketService');
    const { setConnectedUsers } = connectedUsersStore();
    const { setUnReadMsgNotif } = useNotificationStore();

    const connexion = () => {
        socketService.connect(nameSpace);
        socketService.onConnect(() => { setConnected(true) });
    }

    const up = async () => await socketService.sendMessage({ message: 'connexion au notif' }, nameSpace);
    useEffect(() => {
        console.warn('mounted NOTIF')
        if (!connected) {
            connexion();
            up();
        }
        socketService.onConnectError((error: Error) => {
            console.error("Connection Error:", error);
        })

        socketService.onNewMessage(async (newMessage: Notif | { users: number[] }) => {
            if (newMessage && typeof newMessage === 'object' && 'description' in newMessage) {
                const notifMessage = newMessage as Notif;
                setNotif(notifMessage.description);
                refetch()
                setTimeout(() => { setNotif('') }, 1000);
            } else if (newMessage && typeof newMessage === 'object' && 'users' in newMessage) {
                setConnectedUsers(newMessage.users);
            }
        });

        setUnReadMsgNotif(notifs.filter((notif: NotifView) => (notif.read === false && notif.type === ElementNotif.MESSAGE)).length)
        return () => {
            console.warn('unmounted NOTIF')
            socketService.disconnect(nameSpace);
        }
    }, [])





    const divRef = useRef<HTMLDivElement>(null);
    const [isBottom, setIsBottom] = useState(true);
    const handleScroll = () => {
        setIsMenuOpen(true);
        if (isMenuOpen && divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) fetchNextPage();
            } else {
                setIsBottom(false);
            }
        }
    };


    return (
        <>
            <div className={`absolute w-full h-20 left-0 top-0 flex justify-center m-auto flex-1 `}>
                <Card className={`${notif ? 'relative' : ''} mt-4 h-max px-4 py-2 w-respLarge rounded-full shadow-lg transition-all duration-1000 ease-in-out transform ${notif ? 'scale-100 opacity-100 top-4' : 'scale-20 opacity-0 top-0'} `}>
                    {notif}
                </Card>
            </div>
            <div className={`relative w-max ${onBoard ? 'lg:hidden' : ''}`}>
                <div id='notifList'
                    ref={divRef}
                >
                    <Menu placement="bottom-end" >
                        <MenuHandler title="Notifications">
                            <Chip
                                className={`${unReadNotif ? "absolute flex font-medium items-center justify-center w-6 h-6 text-[0.8rem] pt-1 pb-0.5 border-2 border-cyan-500 rounded-full bottom-0 right-8 shadow z-50" : "hidden"}`}
                                color="cyan"
                                value={count >= 99 ? '99+' : (count ? count.toString() : '0')}>
                            </Chip>
                        </MenuHandler>
                        <MenuList className="flex flex-col  max-h-[calc(100vh-9rem)] max-w-[calc(100vw-2rem)] ml-3  rounded-2xl backdrop-blur-2xl ">
                            <div onScroll={handleScroll}
                                className="relative overflow-auto !border-none hover:!border-none flex flex-col gap-1">
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
                                                {notif.link && <Icon
                                                    icon="chevron_right"
                                                    fill
                                                    onClick={async () => {
                                                        await readNotif(notif.id);
                                                        refetch();
                                                        notif.link && navigate(notif.link)
                                                    }}
                                                    size="3xl"
                                                    style="bg-white"
                                                />}
                                            </div>
                                        </MenuItem>)
                                    )}
                            </div>
                            <LoadMoreButton
                                style="-mb-8"
                                size="3xl"
                                isBottom={isBottom}
                                hasNextPage={hasNextPage}
                                handleScroll={() => handleScroll()} />
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
            </div></>
    )
}