import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { OnlineDot } from "./onlineDot";
import { useNotificationStore } from "../../../application/stores/notification.store";
export default function NavBarTop() {
    const user = useUserStore((state) => state.user);
    const unReadMsgNotif = useNotificationStore((state) => state.unReadMsgNotif);
    const navigate = useNavigate();

    const menuItems = [
        { icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "blue-gray" },
        { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat'), color: 'cyan' },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile'), color: "teal" },
        { icon: 'groups', text: "Groupes", onClick: () => navigate('/groupe'), color: "green" },
        { icon: 'diversity_3', text: "Conciliation", onClick: () => navigate('/conciliation'), color: 'orange' },

        { icon: "toll", text: `${user?.Profile?.points} points`, onClick: null, color: 'amber', style: 'hover:!bg-white' },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), style: "!text-red-500 !mt-2 !pt-2 border-t ", color: "red" },
    ];
    const onBoard = window.location.pathname === '/'

    return (
        <header>
            <div className="relative flex flex-0 justify-between items-center py-2 lg:py-2.5 border-b border-blue-gray-50 my-1.5">
                {onBoard ? <div className="relative w-respXl w-full flex lg:justify-center justify-between items-center">
                    <div className="flex w-full lg:justify-center flex-1 items-center lg:gap-4 pl-1 lg:pl-0 py-4 lg:-ml-16 lg:pr-8 ">
                        <img
                            className="h-12 w-12 mx-2 lg:h-16 lg:w-16 object-cover object-center drop-shadow-[0_0_1px_rgba(0,0,0,0.1)]"
                            src="/image/logo.svg"
                            alt="logo" />
                        <Typography
                            color="blue-gray"
                            className="font-comfortaa text-[1.8rem] lg:text-[2.7rem] font-bold">City'Do
                        </Typography>
                    </div>
                    {/* <div className="z-50 absolute right-3 -top-1.5 w-full h-full items-start flex ">
                        <NotifBadge onBoard />
                    </div> */}
                </div> :
                    <div className={"flex truncate items-center gap-4 mr-6"}>
                        <Menu placement="bottom-start">
                            <MenuHandler className="relative h-max min-w-max z-50 flex items-center  cursor-pointer">
                                <div className="flex items-center relative">
                                    <Avatar
                                        onError={(e) => e.currentTarget.src = '/image/person.svg'}
                                        referrerPolicy="unsafe-url"
                                        className="!flex BgUser !shadow cursor-pointer !h-[3.2rem] !w-[3.2rem] hover:!shadow-lg hover:!scale-[1.08] hover:!saturate-[1.1] transition-all duration-200 ease-in-out"
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
                                className="-mt-1 flex text-gray-700 italic text-[0.9rem]">
                                {user?.GroupUser?.map((group) => group.Group?.name).join(', ')}
                            </Typography>
                        </div>
                    </div>}
                <div className="relative right-0 flex items-center gap-2"  >
                    <NotifBadge />
                </div>
            </div >
        </header>
    );
}
