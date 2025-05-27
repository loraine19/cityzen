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
    const { notifs, isLoading, refetch, count, fetchNextPage, hasNextPage } = notifViewModelFactory(Object.keys(ElementNotif).filter((key) => key !== 'MESSAGE').join(','));
    const messages = notifViewModelFactory(ElementNotif.MESSAGE)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
    const nameSpace = 'notifs';
    const [notif, setNotif] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);
    const socketService = DI.resolve('socketService');
    const { setConnectedUsers } = connectedUsersStore();
    const { setUnReadMsgNotif, setUnReadNotMessages, setUnReadNotif } = useNotificationStore();

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
                setTimeout(() => { setNotif('') }, 1000);
                if (newMessage.type === 'MESSAGE') {
                    messages.refetch()
                    setUnReadMsgNotif(messages?.count)
                }
                else {
                    await refetch()
                    setUnReadNotMessages(count)
                }
            } else if (newMessage && typeof newMessage === 'object' && 'users' in newMessage) {
                setConnectedUsers(newMessage.users);
            }
        })

        setUnReadMsgNotif(messages?.count)
        setUnReadNotMessages(count)
        return () => {
            console.warn('unmounted NOTIF')
            socketService.disconnect(nameSpace);
        }
    }, [])


    //// HANDLE SCROLL
    const divRef = useRef<HTMLDivElement>(null);
    const [isBottom, setIsBottom] = useState(true);
    const handleScroll = () => {
        setIsMenuOpen(true);
        if (isMenuOpen && divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) fetchNextPage()
            } else setIsBottom(false)
        }
    };
    type NotifBadgeProps = { count: number, notifs: NotifView[], color: string, icon: string, link: string }

    return (
        <div className={`${onBoard ? ' w-respXl relative pt-4' : ''} gap-4 flex justify-end flex-1 w-full  right-0`}>
            <div className={` w-full z-[1000] absolute left-0 top-0 flex justify-center m-auto flex-1 `}>
                <Card className={`${notif ? 'animate-bounce absolute' : ''} z-50 mt-4 h-max px-4 py-2 w-respLarge rounded-2xl shadow-lg transition-all duration-1000 ease-in-out transform
                 ${notif ?
                        'scale-100 opacity-100 top-4' :
                        'scale-80 opacity-0 top-0'} `}>
                    {notif}
                </Card>
            </div>
            {!isLoading && [{ count: messages.count, notifs: messages.notifs, color: 'cyan', icon: 'forum', link: '/chat' },
            { count, notifs, color: 'orange', icon: 'notifications', link: '/notification' }].map((list: NotifBadgeProps, index: number) =>
                <div
                    key={index}
                    className={`relative w-max ${onBoard ? 'lg:hidden' : ''}`}>
                    <div id='notifList'
                        key={index + '1'}
                        ref={divRef}>
                        <Menu placement="bottom-end" >
                            <MenuHandler title="Notifications">
                                <span className={`${!list.count || list.count === 0 ? 'hidden' : `text-white absolute flex font-medium items-center justify-center w-[1.4rem] h-[1.4rem] text-[0.75rem] !min-w-max pt-[0.3rem] pb-1 bg-${list.color}-500 rounded-full bottom-0 -left-2.5 shadow z-50`}`}>
                                    {list.count >= 99 ? '⁺99 ' :
                                        (list.count ? list.count.toString() : '0')}
                                </span>
                            </MenuHandler>
                            <MenuList className="flex flex-col max-h-[calc(100vh-9rem)] max-w-[calc(100vw-2rem)] ml-3 rounded-2xl backdrop-blur-2xl ">
                                <div onScroll={handleScroll}
                                    className="relative overflow-auto !border-none hover:!border-none flex flex-col gap-1">
                                    {list.count === 0 ? (
                                        <div className="flex items-center justify-center p-4">
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="font-normal">
                                                Aucune nouveau message
                                            </Typography>
                                        </div>)
                                        : (list.notifs.map((notif: NotifView, index2: number) => notif.read === false &&
                                            <MenuItem className="flex flex-col w-full  max-w-[calc(100vw-2rem)] "
                                                key={index2 + list.color}>
                                                <div className="flex items-center w-full justify-between">
                                                    <Chip
                                                        value={notif.typeS}
                                                        className="rounded-full w-max h-max text-ellipsis pt-1.5  "
                                                        size='sm'
                                                        color={list.color as any}>
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
                                                    {notif.link &&
                                                        <Icon
                                                            icon="chevron_right"
                                                            fill
                                                            onClick={
                                                                async () => {
                                                                    await readNotif(notif.id);
                                                                    await refetch();
                                                                    setUnReadNotif(list.notifs.length - 1);
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
                                    color={list.color}
                                    style="-mb-8"
                                    size="3xl"
                                    isBottom={isBottom}
                                    hasNextPage={hasNextPage}
                                    handleScroll={() => handleScroll()} />
                            </MenuList>
                        </Menu>
                    </div>
                    <Icon
                        link={list.link}
                        icon={list.icon}
                        color={list.count > 0 ? list.color : 'gray'}
                        fill bg
                        size="3xl"
                        title={list.count ? "voir la liste" : "aucune notification"}
                        style=" rounded-full z-40 relative  !w-[3rem] !h-[3rem]" />
                </div>)

            }
        </div>
    )
}