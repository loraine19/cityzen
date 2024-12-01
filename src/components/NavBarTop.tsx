import { Avatar, Card, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/user.context";


function hasUnread(hasUnreadNotifications: boolean, userNotif: number) {

    if (hasUnreadNotifications) {
        return (
            <div className="relative w-max">
                <div className="absolute flex font-medium  items-center justify-center w-2 h-2 bg-cyan-500 text-white text-sm   p-3 rounded-full bottom-0 right-9 shadow z-30">{userNotif}</div>
                <IconButton className="rounded-full bg-[#FFEDD5]" size="lg" >
                    <NavLink to="/notification" className="flex items-center gap-2">
                        <span className="material-symbols-outlined fill text-[#F97316]">notifications</span>
                    </NavLink>
                </IconButton>
            </div>
        )
    } else {
        return (
            <div>
                <IconButton className="rounded-full bg-[#BDC9CF]" size="lg" >
                    <NavLink to="/notification" className="flex items-center gap-2">
                        <span className="material-symbols-outlined fill text-[#3F4F58]">notifications</span>
                    </NavLink>
                </IconButton>
            </div>
        )
    }
}

export default function NavBarTop() {
    const { user, userNotif, } = useContext(UserContext);
    let hasUnreadNotifications: boolean = userNotif > 0
    return (
        <>
            <Card color="transparent" shadow={false} className="w-full lg:px-4">
                <CardHeader color="transparent" floated={false} shadow={false} className="mx-0 flex items-center gap-4 pt-0 pb-0">

                    <NavLink to="/myprofile" className="flex items-center gap-2 w-20 h-20">
                        <Avatar size="lg" variant="circular" src={user.avatar} alt="tania andrew" />
                    </NavLink>

                    <div className="flex w-full items-start justify-between gap-0.5">


                        <div className="flex flex-col">
                            <Typography variant="h5" color="blue-gray">{user.firstName} {user.id}</Typography>
                            <Typography color="blue-gray">Quartier BLOB</Typography>
                        </div>

                        <nav className="5 flex items-center gap-1">
                            {hasUnreadNotifications ? hasUnread(true, userNotif) : hasUnread(false, userNotif)}
                        </nav>

                    </div>
                </CardHeader>
            </Card>
        </>
    )
}