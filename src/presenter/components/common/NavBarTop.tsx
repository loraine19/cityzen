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
        { icon: "home", text: "Accueil", onClick: () => navigate('/') },
        { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat') },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile') },
        { icon: 'groups', text: "Groupes", onClick: () => navigate('/group') },
        { icon: "toll", text: `${user?.Profile?.points} points`, onClick: null },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), style: "!text-red-500 !mt-2 !pt-2 border-t " },
    ];

    return (
        <div className="relative flex justify-between w-full items-center py-3 ">
            <div className="flex items-center  gap-2">
                <Menu placement="bottom-start">
                    <MenuHandler className="relative h-max min-w-max z-50 flex items-center  cursor-pointer">
                        <div className="flex items-center relative">
                            <Avatar
                                referrerPolicy="unsafe-url"
                                className="!flex BgUser !shadow cursor-pointer !h-12 !w-19"
                                variant="circular"
                                alt={user?.Profile.firstName || 'user'}
                                src={user?.Profile.image as string ?? '/image/person.svg'}
                            />
                            <OnlineDot
                                className="!bottom-0 !-right-0.5"
                                id={user?.id} />
                        </div>
                    </MenuHandler>
                    <MenuList className="!rounded-xl !shadow-xl">
                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                className={`flex items-center gap-2 !rounded-full !py-1 ${item.style || ''}`}
                                onClick={item.onClick || undefined}>
                                <Icon icon={item.icon} fill />
                                <Typography variant="small" className="font-medium">
                                    {item.text}
                                </Typography>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <div className="flex flex-col w-full items-start">
                    <Typography variant="h5" color="blue-gray">{user.Profile.firstName}</Typography>
                    <Typography color="blue-gray" className="-mt-1">{user?.GroupUser?.map((group) => group.Group?.name).join(', ')}</Typography>
                </div>
            </div>
            <NotifBadge />
        </div >
    );
}
