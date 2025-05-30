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


    return (
        <div className="relative flex flex-0 justify-between items-center py-2 lg:py-2.5 border-b border-blue-gray-50 my-1.5">
            <div className="flex truncate items-center gap-4 mr-6">
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
            </div>
            <div className="relative right-0 flex items-center gap-2"
            > <NotifBadge /></div>
        </div >
    );
}
