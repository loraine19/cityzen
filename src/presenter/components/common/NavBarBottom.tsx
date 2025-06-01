import { Navbar, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";

interface NavBarBottomProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

const NavBarBottom: React.FC<NavBarBottomProps> = ({ addBtn = false, color = "cyan" }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const type = new URLSearchParams(location.pathname.split("/")[1]).toString().replace("=", '');
    const [closeDial, setCloseDial] = useState<boolean>(false)
    const handleNavigate = () => navigate(`/${type}/create`)
    const { setColor } = useNotificationStore((state) => state);

    type NavItem = {
        to: string;
        icon: string;
        label: string;
        color: string,
        col: string;
    }
    const navItems: NavItem[] = [
        { to: "/", icon: "home", label: "Home", color: "!border-blue-gray-500/20", col: 'blue-gray' },
        { to: "/service", icon: "partner_exchange", label: "Service", color: "!border-cyan-500/20", col: 'cyan' },
        { to: "/evenement", icon: "event", label: "Évenement", color: "!border-cyan-500/20", col: 'cyan' },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: "!border-orange-500/20", col: 'orange' },
        { to: "/vote", icon: "ballot", label: `${addBtn ? "Vote⠀" : 'Votes⠀⠀'}`, color: "!border-orange-500/20", col: 'orange' },
    ]

    return (
        <footer className="pt-0.5 pb-2 px-1 lg:px-4 z-30">
            <Navbar className="flex rounded-full shadow-lg h-[4rem]  items-center p-0 !bg-white ">
                <div className="w-full h-full relative">
                    <ul className={`flex flex-row w-full overflow-auto rounded-full justify-between  h-full `}>
                        {navItems.map(({ to, icon, label, color, col }: NavItem, index) => (
                            <Typography
                                onClick={() => { setColor(col) }}
                                key={index}
                                as="li"
                                variant="small"
                                color={col as any}
                                className={`flex rounded-full items-center  ${addBtn ? 'justify-start pl-0' : 'justify-center px-0'} font-medium`}
                            >
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex lg:flex-row gap-3 justify-center lg:justify-end flex-col items-center h-full rounded-full px-2 lg:px-2.5 ${isActive ? `animSlide border-[1px] shadowMid z-30 ${color} bg-white` : ''}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                bg
                                                style={`!pb-[0.4rem] !text-[1.9rem] `}
                                                icon={icon}
                                                fill={isActive ? true : false}
                                                color={col}
                                            />
                                            <span className={`!text-[0.85rem] font-bold
                                                 filter brightness-90 font-comfortaa hidden lg:block  pr-2.5`}>
                                                {label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </Typography>
                        ))}
                        {addBtn && (
                            <div className="flex-0 w-10">
                                <div className={`flex absolute items-center justify-center right-0 bg-${color}-100 h-full gap-12 w-16 rounded-full shadowMid`}>
                                    <SpeedDial offset={10}>
                                        <SpeedDialHandler>
                                            <div className={`bg-${color}-500  rounded-full `}>
                                                <Icon
                                                    onClick={() => setCloseDial(!closeDial)}
                                                    icon="+"
                                                    color={'white'}
                                                    style={`${!closeDial ? 'transition-transform group-hover:rotate-45 hover:scale-[1]' : ''}  !text-[1.9rem] font-normal bg-${color}-500 h-10 w-10`} />
                                            </div>
                                        </SpeedDialHandler>
                                        <SpeedDialContent className={`${closeDial && "hidden"}`}>
                                            <SpeedDialAction
                                                className="flex h-12 gap-8 w-12 shadow-lg"
                                                title={`Ajouter un ${type}`}
                                                onClick={handleNavigate}>
                                                <Icon
                                                    size='3xl'
                                                    icon='edit'
                                                    color={color} />
                                                <div className="py-2 px-4 mr-90 font-light rounded-full text-gray-900 absolute top-2/4 -left-3/4 -translate-y-2/4 -translate-x-3/4 bg-white text-xs shadow-xl lowercase">
                                                    {`Ajouter un ${type}`}
                                                </div>
                                            </SpeedDialAction>
                                        </SpeedDialContent>
                                    </SpeedDial>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </Navbar>
        </footer>
    );
};

export default NavBarBottom;
