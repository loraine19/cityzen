import { Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { OnlineDot } from "./onlineDot";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useEffect } from "react";
import { AvatarUser } from "./AvatarUser";
import { useUxStore } from "../../../application/stores/ux.store";
export default function NavBarTop() {
    const { unReadMsgNotif } = useNotificationStore((state) => state);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => { getColor(location.pathname) }, [location.pathname])
    const { user } = useUserStore((state) => state);
    const { hideNavBottom, navBottom, setNavBottom, setHideNavBottom, getColor } = useUxStore((state) => state);


    const menuItems = [
        { icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "blue-gray" },
        { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat'), color: 'cyan' },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile'), color: "teal" },
        { icon: 'groups', text: "Groupes", onClick: () => navigate('/groupe'), color: "green" },
        { icon: 'diversity_3', text: "Conciliation", onClick: () => navigate('/conciliation'), color: 'orange' },
        { icon: "toll", text: `${user?.Profile?.points} points`, onClick: null, color: 'amber', style: 'hover:!bg-white' },
        { icon: navBottom ? 'move_up' : 'move_down', text: "Déplacer la barre", onClick: () => { setNavBottom(!navBottom) }, color: 'blue-gray' },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), style: "!text-red-500 !mt-2 !pt-2 border-t ", color: "red" },

    ];
    const onBoard = window.location.pathname === '/'


    return (
        <header
            onClick={() => { hideNavBottom && setHideNavBottom(false) }}
            className={`${hideNavBottom ? 'shadow-md shadow-gray-700/20 mb-4 pt-0.5' : ''}  z-0 `}>
            <div className={`${hideNavBottom ? '-mt-1.5 lg:flex animRev' : 'animRev pb-1 mb-1'}
                    relative h-full w-full flex justify-between pt-1 w-respXl`} >
                <div className={`flex w-full items-center  ${hideNavBottom ? 'hidden' : ''} `}>
                    <Menu placement="bottom-start">
                        <MenuHandler className="relative h-max min-w-max z-50 flex items-center  cursor-pointer">
                            {onBoard ?
                                <div className="flex  w-full flex-1 items-center ">
                                    <img
                                        className="h-12 w-12 mx-2 lg:h-[4rem] lg:w-[4rem] object-cover object-center "
                                        src="/image/logo.svg"
                                        alt="logo" />

                                </div> :
                                <div className="flex  items-center relative">
                                    <AvatarUser
                                        style=" "
                                        avatarStyle="!w-12 !h-12 !text-[1.7rem] "
                                        avatarSize={'sm'}
                                        Profile={user?.Profile} />
                                    <OnlineDot
                                        className="!bottom-0 !-right-1"
                                        id={user?.id} />
                                </div>}
                        </MenuHandler>
                        <MenuList className="flex flex-1 flex-col !rounded-xl divide-y-2 !shadow-xl -ml-2 ">
                            {menuItems.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    className={`flex !flex-1 !min-w-60 pr-[10vw] items-center gap-2.5 pl-2  ${item.style || ''}`}
                                    onClick={item.onClick || undefined}>
                                    <Icon
                                        fill bg
                                        size="lg"
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
                    {onBoard ?
                        <Typography
                            color="blue-gray"
                            className="font-comfortaa text-[1.8rem] lg:text-[2.1rem] font-bold">
                            City'Do
                        </Typography> :
                        <div className="flex flex-col items-start px-4">
                            <Typography
                                variant="h5"
                                color="blue-gray">
                                {user?.Profile?.firstName}
                            </Typography>
                            <Typography
                                className="mt-0 flex text-gray-700 !line-clamp-1 italic text-[0.9rem]">
                                {user?.GroupUser?.map((group) => (group.Group?.name.split(':')[0])).join(', ')}
                            </Typography>
                        </div>}
                </div>
                <div className={` ${onBoard ? 'lg:pr-4' : 'pr-0'} ${hideNavBottom ? 'hidden' : ''} lg:pt-3 flex h-full w-full " `} >
                    <NotifBadge />
                </div>
            </div >
        </header >
    );
}
