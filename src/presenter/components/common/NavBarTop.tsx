import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { OnlineDot } from "./onlineDot";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useEffect } from "react";
export default function NavBarTop() {
    const user = useUserStore((state) => state.user);
    const { unReadMsgNotif, getColor } = useNotificationStore((state) => state);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => { getColor(location.pathname) }, [location.pathname])
    const { navBottom, setNavBottom } = useUserStore((state) => state);


    const menuItems = [
        { icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "blue-gray" },
        { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat'), color: 'cyan' },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile'), color: "teal" },
        { icon: 'groups', text: "Groupes", onClick: () => navigate('/groupe'), color: "green" },
        { icon: 'diversity_3', text: "Conciliation", onClick: () => navigate('/conciliation'), color: 'orange' },

        { icon: "toll", text: `${user?.Profile?.points} points`, onClick: null, color: 'amber', style: 'hover:!bg-white' },
        { icon: navBottom ? 'move_up' : 'move_down', text: "Déplacer la barre", onClick: () => setNavBottom(!navBottom), color: 'blue-gray' },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), style: "!text-red-500 !mt-2 !pt-2 border-t ", color: "red" },

    ];
    const onBoard = window.location.pathname === '/'

    return (
        <header>
            <div className="relative h-full w-full flex lg:pl-2 justify-between items-center py-3">
                {onBoard ?
                    <div className="relative w-full flex justify-between items-center">
                        <div className="flex w-full  flex-1 items-center  lg:pl-2 pb-3">
                            <img
                                className="h-16 w-16 mx-2 lg:h-20 lg:w-20 object-cover object-center drop-shadow-[0_0_1px_rgba(0,0,0,0.1)]"
                                src="/image/logo.svg"
                                alt="logo" />
                            <Typography
                                color="blue-gray"
                                className="font-comfortaa text-[1.8rem] lg:text-[2.1rem] font-bold">City'Do
                            </Typography>
                        </div>
                    </div> :
                    <div className={"flex w-full items-center gap-4 "}>
                        <Menu placement="bottom-start">
                            <MenuHandler className="relative h-max min-w-max z-50 flex items-center  cursor-pointer">
                                <div className="flex items-center relative">
                                    <Avatar
                                        onError={(e) => e.currentTarget.src = '/image/person.svg'}
                                        referrerPolicy="unsafe-url"
                                        className="!flex BgUser !shadow cursor-pointer !h-[3.2rem] !w-[3.2rem] hover:!shadow-lg hover:!scale-[1.02] hover:!saturate-[1.1] transition-all duration-200 ease-in-out"
                                        variant="circular"
                                        alt={user?.Profile?.firstName || 'user'}
                                        src={user?.Profile?.image as string ?? '/image/person.svg'}
                                    />
                                    <OnlineDot
                                        className="!bottom-0 !-right-1"
                                        id={user?.id} />
                                </div>
                            </MenuHandler>
                            <MenuList className="!rounded-xl !shadow-xl">
                                {menuItems.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        className={`flex items-center gap-2 px-2 !py-2 ${item.style || ''}`}
                                        onClick={item.onClick || undefined}>
                                        <Icon
                                            fill
                                            size="lg"
                                            bg
                                            color={item.color ?? 'blue-gray'}
                                            icon={item.icon} />
                                        <Typography
                                            variant="small"
                                            className="font-medium">
                                            {item.text}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                        <div className="flex flex-col  items-start">
                            <Typography
                                variant="h5"
                                color="blue-gray">
                                {user?.Profile?.firstName}
                            </Typography>
                            <Typography
                                className="mt-0 flex text-gray-700 !line-clamp-1 italic text-[0.9rem]">
                                {user?.GroupUser?.map((group) => (group.Group?.name.split(':')[0])).join(', ')}
                            </Typography>
                        </div>
                    </div>}
                <div className={` ${onBoard ? 'lg:pr-6 lg:pt-4 pt-2' : 'pr-0'} relative right-0 flex h-full w-full " `} >
                    <NotifBadge />
                </div>
            </div >
        </header>
    );
}
