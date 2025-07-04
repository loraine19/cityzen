import { Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { OnlineDot } from "./onlineDot";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { AvatarUser } from "./AvatarUser";
import { useUxStore } from "../../../application/stores/ux.store";

export default function NavBarTop() {
    const { unReadMsgNotif } = useNotificationStore((state) => state);
    const navigate = useNavigate();
    const { user } = useUserStore((state) => state);
    const { hideNavBottom, navBottom, setNavBottom, setHideNavBottom } = useUxStore((state) => state);

    const menuItems = [
        { icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "blue-gray" },
        { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat'), color: 'cyan' },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile'), color: "teal" },
        { icon: 'groups', text: "Groupes", onClick: () => navigate('/groupe'), color: "green" },
        { icon: 'diversity_3', text: "Conciliation", onClick: () => navigate('/conciliation'), color: 'orange' },
        { icon: "toll", text: `${user?.Profile?.points} points`, onClick: null, color: 'amber', style: 'hover:!bg-white' },
        { icon: navBottom ? 'move_up' : 'move_down', text: "Déplacer la barre", onClick: () => { setNavBottom(!navBottom) }, color: 'blue-gray' },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), style: "!text-red-500 !mt-2 !pt-2 border-t border-blue-gray-100", color: "red" },

    ]

    const onBoard = window.location.pathname === '/'

    return (
        <header
            onClick={() => { hideNavBottom && setHideNavBottom(false) }}
            className={`sticky top-0.5 z-0`}>
            <div className={`relative h-full w-full flex justify-between
                ${hideNavBottom ? '-mt-1.5 lg:flex animRev' : 'animRev'}
                ${navBottom ? 'w-respXl' : 'w-respTopNav !pb-3 !-mt-1.5'}`} >
                <div className={`flex w-full h-full ${hideNavBottom ? 'hidden' : ''}`}>
                    <Menu placement="bottom-start">
                        <MenuHandler className="relative h-max min-w-max p-1.5 z-50 flex items-center  cursor-pointer">
                            {onBoard ?
                                <div className='flex w-full flex-1 items-center'>
                                    <img className="!w-[48px] !h-[48px] object-cover object-center"
                                        src="/image/logo.svg"
                                        alt="logo" />
                                </div> :
                                <div className="flex items-center relative">
                                    <AvatarUser
                                        style='!shadow-none'
                                        avatarStyle='!w-[42px] !h-[42px] !text-[26px]'
                                        avatarSize={'sm'}
                                        Profile={user?.Profile} />
                                    <OnlineDot
                                        className='!bottom-1 !right-1'
                                        id={user?.id} />
                                </div>}
                        </MenuHandler>
                        <MenuList className='flex flex-1 flex-col !rounded-xl !shadow-xl -ml-2'>
                            {menuItems.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    className={`flex !flex-1 !min-w-60 pr-[10vw] rounded-none items-center gap-2.5 pl-2 ${item.style || ''}`}
                                    onClick={item.onClick || undefined}>
                                    <Icon
                                        fill bg
                                        size='lg'
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
                    {navBottom &&
                        <div className='flex items-center h-full w-full'>
                            {onBoard ?
                                <Typography
                                    color='blue-gray'
                                    className='font-comfortaa text-[1.8rem] lg:text-[2.1rem] font-bold'>
                                    City'Do
                                </Typography> :
                                <div className='flex flex-col items-start px-4'>
                                    <Typography
                                        variant='h5'
                                        className='text-blue-gray-800'>
                                        {user?.Profile?.firstName}
                                    </Typography>
                                    <Typography
                                        className='mt-0 flex text-gray-700 !line-clamp-1 italic text-[0.9rem]'>
                                        {user?.GroupUser?.map((group) => (group.Group?.name.split(':')[0])).join(',')}
                                    </Typography>
                                </div>}
                        </div>}
                </div>
                <div
                    className={`justify-center items-center flex h-full pt-1
                    ${onBoard ? 'lg:pr-0' : 'pr-0'} 
                    ${hideNavBottom ? 'hidden' : ''} 
                    ${navBottom ? ' w-full' : ''}`} >
                    <NotifBadge />
                </div>
            </div >
        </header >
    );
}
