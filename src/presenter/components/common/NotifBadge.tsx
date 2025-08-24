import { Menu, MenuHandler, Chip, MenuList, Typography, MenuItem } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { NotifView } from "../../views/viewsEntities/notifViewEntity";
import { useNavigate } from "react-router";
import DI from "../../../di/ioc";
import { LoadMoreButton } from "./LoadMoreBtn";
import { useRef, useState } from "react";
import { ElementNotif } from "../../../domain/entities/Notif";
import { useNotificationStore } from "../../../application/stores/notification.store";

export function NotifBadge({ onBoard }: { onBoard?: boolean }) {
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const { notifs, isLoading, refetch, count, fetchNextPage, hasNextPage } = notifViewModelFactory(Object.keys(ElementNotif).filter((key) => key !== 'MESSAGE').join(','));
    const messages = notifViewModelFactory(ElementNotif.MESSAGE)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()

    const { setUnReadNotif } = useNotificationStore();


    //// HANDLE SCROLL
    const divRef = useRef<HTMLDivElement>(null);
    const [isBottom, setIsBottom] = useState(false);
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
        <div className={` gap-3 md:gap-4 flex justify-end flex-1 w-full h-max  `}>


            {!isLoading && [{ count: messages.count, notifs: messages.notifs, color: 'cyan', icon: 'chat', link: '/chat' },
            { count, notifs, color: 'orange', icon: 'notifications', link: '/notification' }].map((list: NotifBadgeProps, index: number) =>
                <div
                    key={index}
                    className={`relative w-max  ${onBoard ? 'lg:hidden' : ''}`}>
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
                            <MenuList className="flex flex-col max-h-[calc(100vh-9rem)] !w-[450px] !max-w-[calc(100vw-2rem)] ml-1 rounded-2xl backdropBlur !border border-blue-gray-100">
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
                                        : (list.notifs.map((notif: NotifView, index2: number) => notif?.read === false &&
                                            <MenuItem className="flex flex-col w-full max-w-[calc(100vw-2rem)] "
                                                key={index2 + list.color}>
                                                <div className="flex items-center w-full justify-between">
                                                    <Chip
                                                        value={notif.typeS}
                                                        className="rounded-full scale-90 !opacity-80 w-max h-max text-ellipsis pt-1 "
                                                        size='sm'
                                                        color={list.color as any}>
                                                    </Chip>
                                                    <Typography
                                                        className="flex items-center gap-1 px-4 text-xs font-normal text-blue-gray-500">
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
                                                            size="xl"
                                                            style="bg-white"
                                                        />}
                                                </div>
                                            </MenuItem>)
                                        )}
                                </div>
                                <LoadMoreButton
                                    color={list.color}
                                    style="-mb-3"
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
                        color={list.color}
                        fill bg
                        size="xl"
                        title={'ouvrir la page'}
                        style={`" rounded-full z-40 relative " 
                            ${list.count > 0 ? 'opacity-100' : 'opacity-90'}`
                        } />
                </div>)

            }
        </div>
    )
}