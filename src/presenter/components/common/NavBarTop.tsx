import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./SmallComps";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";

export default function NavBarTop() {
    const user = useUserStore((state) => state.user);
    const { firstName, image } = user && user.Profile || {} as any;
    const navigate = useNavigate();

    return (
        <div className="flex justify-between w-full items-center py-3">
            <div className="flex items-center w-full  gap-2">
                <Menu placement="bottom-start" >
                    <MenuHandler className="flex items-center gap-2 BgUser !rounded-full !shadow cursor-pointer">
                        <Avatar
                            className="BgUser !shadow cursor-pointer "
                            variant="circular"
                            alt={firstName}
                            src={image ? image as string : '../public/person.svg'}
                        />
                    </MenuHandler>
                    <MenuList className="!rounded-xl !shadow-xl ">
                        <MenuItem className="flex items-center gap-2 !rounded-full !py-1">
                            <Icon icon="toll" fill />
                            <Typography variant="small" className="font-medium">
                                {user?.Profile?.points} points
                            </Typography>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 !rounded-full !py-1"
                            onClick={() => navigate('/')}>
                            <Icon icon="home" fill />
                            <Typography variant="small" className="font-medium">
                                Accueil
                            </Typography>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 !rounded-full !py-1"
                            onClick={() => navigate('/myprofile')}>
                            <Icon icon="person_edit" fill />
                            <Typography variant="small" className="font-medium">
                                Modifier mon profil
                            </Typography>
                        </MenuItem>
                        <hr className="my-2 border-blue-gray-50" />
                        <MenuItem className="flex items-center gap-2 !rounded-full py-1"
                            onClick={() => navigate('/signin')}>
                            <Icon icon="exit_to_app" fill style="!text-red-500 pb-1" />
                            <Typography variant="small" className="font-medium">
                                Déconnexion
                            </Typography>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <div className="flex flex-col w-full items-start ">
                    <Typography variant="h5" color="blue-gray">{firstName} </Typography>
                    <Typography color="blue-gray" className="-mt-1">Quartier</Typography>
                </div>
            </div>
            <NotifBadge />
        </div>
    )
}