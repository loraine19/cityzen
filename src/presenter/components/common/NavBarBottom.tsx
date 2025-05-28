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
        { to: "/", icon: "home", label: "Home", color: "!border-blue-gray-600", col: 'blue-gray' },
        { to: "/service", icon: "partner_exchange", label: "Service", color: "!border-cyan-600", col: 'cyan' },
        { to: "/evenement", icon: "event", label: "Évenement", color: "!border-cyan-600", col: 'cyan' },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: "!border-orange-600", col: 'orange' },
        { to: "/vote", icon: "ballot", label: "Vote", color: "!border-orange-600", col: 'orange' },
    ];

    return (
        <footer className="pt-0.5 pb-2 px-1 lg:px-4 z-30">
            <Navbar className="flex rounded-full shadow-lg h-[4rem] items-center  p-0 !bg-white ">
                <div className="w-full h-full relative">
                    <ul className={` flex flex-row  w-full justify-between  h-full `}>
                        {navItems.map(({ to, icon, label, color, col }) => (
                            <Typography
                                key={to}
                                as="li"
                                variant="small"
                                color={col as any}
                                className={`flex flex-1 items-center  lg:-mb-0.5 font-medium`}
                            >
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex lg:flex-row gap-3 justify-center lg:justify-end flex-col items-center px-3 h-full ${color} ${isActive ? `border-b-4 ` : ''}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                bg
                                                style={`!pb-[0.4rem] !text-[1.8rem] `}
                                                icon={icon}
                                                fill={isActive ? true : false}
                                                color={col}
                                            />
                                            <span className={`!text-[0.8rem] ${isActive && '!-mb-0.5'} font-normal font-comfortaa hidden lg:block lg:text-sm`}>
                                                {label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </Typography>
                        ))}
                        {addBtn && (
                            <div className="flex items-center px-3 ">
                                <SpeedDial offset={10}>
                                    <SpeedDialHandler>
                                        <Button
                                            size="sm"
                                            color={color as any}
                                            className="flex items-center justify-center rounded-full h-11 w-11"
                                        >
                                            <Icon
                                                onClick={() => setCloseDial(!closeDial)}
                                                icon="add"
                                                color="white"
                                                size="3xl"
                                                style={`${!closeDial ? 'transition-transform group-hover:rotate-45' : ''} !text-[1.8rem]`} />
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
                    </ul>
                </div>

            </Navbar>
        </footer>
    );
};

export default NavBarBottom;
