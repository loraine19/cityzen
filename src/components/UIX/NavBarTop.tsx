import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/user.context";
import { Icon, NotifBadge } from "./SmallComps";

export default function NavBarTop() {
    const { userProfile, userNotif } = useContext(UserContext);
    const { firstName, image } = userProfile;
    const navigate = useNavigate();


    return (
        <div className="flex justify-between w-full items-center py-3">
            <div className="flex items-center lg:min-w-40  gap-2">
                <Menu placement="bottom-start" >
                    <MenuHandler >
                        <Avatar
                            className="BgUser !shadow cursor-pointer"
                            variant="circular"
                            alt={firstName}
                            src={image as string}
                        />
                    </MenuHandler>
                    <MenuList className="!rounded-xl !shadow-xl ">
                        <MenuItem className="flex items-center gap-2 !rounded-full !py-1"
                            onClick={() => navigate('/')}>
                            <Icon icon="home" fill />
                            <Typography variant="small" className="font-medium">
                                Home
                            </Typography>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 !rounded-full !py-1"
                            onClick={() => navigate('/myprofile')}>
                            <Icon icon="person_edit" fill />
                            <Typography variant="small" className="font-medium">
                                Profile
                            </Typography>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 !rounded-full !py-1">
                            <Icon icon="inbox" fill />
                            <Typography variant="small" className="font-medium">
                                Inbox
                            </Typography>
                        </MenuItem>
                        <hr className="my-2 border-blue-gray-50" />
                        <MenuItem className="flex items-center gap-2 !rounded-full py-1"
                            onClick={() => navigate('/logout')}>
                            <Icon icon="exit_to_app" fill style="!text-red-500 pb-1" />
                            <Typography variant="small" className="font-medium">
                                Sign Out
                            </Typography>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <div className="flex flex-col w-full items-start ">
                    <Typography variant="h5" color="blue-gray">{firstName} </Typography>
                    <Typography color="blue-gray" className="-mt-1">Quartier</Typography>
                </div>
            </div>
            <NotifBadge qty={userNotif} />
        </div>
    )
}