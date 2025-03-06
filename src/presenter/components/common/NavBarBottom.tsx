import { Button, Navbar, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from "./IconComp";

interface NavBarBottomProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

const NavBarBottom: React.FC<NavBarBottomProps> = ({ addBtn = false, color = "cyan" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const type = new URLSearchParams(location.pathname.split("/")[1]).toString().replace("=", '');
    const [closeDial, setCloseDial] = useState<boolean>(false);
    const handleNavigate = () => navigate(`/${type}/create`);

    const navItems = [
        { to: "/", icon: "home", label: "Home", color: "!border-blue-gray-600" },
        { to: "/service", icon: "partner_exchange", label: "Service", color: "!border-cyan-600" },
        { to: "/evenement", icon: "event", label: "Évenement", color: "!border-cyan-600" },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: "!border-orange-600" },
        { to: "/vote", icon: "ballot", label: "Vote", color: "!border-orange-600" },
    ];

    return (
        <footer className="pt-0.5 pb-2 px-2 z-30">
            <Navbar className="flex rounded-full shadow-lg h-16 items-center justify-between p-0 !bg-white ">
                <div className="w-full self-center px-4  h-full -mb-1">
                    <ul className="flex flex-row justify-around gap-4 pl-2 h-full">
                        {navItems.map(({ to, icon, label, color }) => (

                            <Typography
                                key={to}
                                as="li"
                                variant="small"
                                color="blue-gray"
                                className={`flex flex-1 justify-center items-center font-medium `}
                            >
                                <NavLink
                                    to={to}
                                    className={({ isActive }) => `flex w-[90%] justify-center flex-col items-center gap-0 lg:flex-row lg:gap-2 h-full ${color} ${isActive ? `border-b-4 ` : ''}`}>
                                    <Icon
                                        style={`pb-0.5`}
                                        size='3xl'
                                        icon={icon}
                                        color='blue-gray' />
                                    <span className="text-[0.6rem] lg:-mt-1 font-light lg:block lg:text-sm">
                                        {label}
                                    </span>
                                </NavLink>
                            </Typography>
                        ))}
                    </ul>
                </div>
                {addBtn && (
                    <div className="flex p-2 -ml-2">
                        <SpeedDial offset={10}>
                            <SpeedDialHandler>
                                <Button
                                    size="sm"
                                    color={color as any}
                                    className="flex items-center justify-center rounded-full h-12 w-12"
                                    onClick={() => setCloseDial(!closeDial)}>
                                    <Icon
                                        icon="add"
                                        color="white"
                                        size="sm"
                                        style={`${!closeDial ? 'transition-transform group-hover:rotate-45' : ''} !scale-[3.5]`} />
                                </Button>
                            </SpeedDialHandler>
                            <SpeedDialContent className={`${closeDial && "hidden"}`}>
                                <SpeedDialAction
                                    className="h-14 gap-4 w-14 shadow-lg"
                                    title={`Ajouter un ${type}`}
                                    onClick={handleNavigate}>
                                    <Icon
                                        size='3xl'
                                        icon='edit'
                                        color={color} />
                                    <div className="py-2 px-4 mr-90 font-thin rounded-full text-gray-900 absolute top-2/4 -left-3/4 -translate-y-2/4 -translate-x-3/4 bg-white text-xs shadow-xl lowercase">
                                        {`Ajouter un ${type}`}
                                    </div>
                                </SpeedDialAction>
                            </SpeedDialContent>
                        </SpeedDial>
                    </div>
                )}
            </Navbar>
        </footer>
    );
};

export default NavBarBottom;
