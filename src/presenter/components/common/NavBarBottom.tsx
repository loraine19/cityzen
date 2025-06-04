import { Navbar, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";

interface NavBarBottomProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

const NavBarBottom: React.FC<NavBarBottomProps> = ({ addBtn = false }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const type = new URLSearchParams(location.pathname.split("/")[1]).toString().replace("=", '');
    const [closeDial, setCloseDial] = useState<boolean>(false)
    const handleNavigate = () => navigate(`/${type}/create`)
    const { } = useNotificationStore((state) => state);
    const { setNavBottom, navBottom, setColor, color, hideNavBottom } = useUxStore((state) => state);

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
        {
            to: "/annonce", icon: "dashboard", label: "Annonce", color: "!border-orange-500/20", col: 'orange'
        },
        { to: "/vote", icon: "ballot", label: `${addBtn ? "Vote⠀" : 'Votes⠀⠀'}`, color: "!border-orange-500/20", col: 'orange' },
    ]


    return (
        <footer
            onDrag={
                (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setNavBottom(!navBottom);
                }
            }

            className={(!navBottom ? 'pb-2 ' : 'pb-2 ') + ((hideNavBottom && navBottom) ? 'invisible' : '!my-0 backdrop-blur-sm backdrop-opacity-75 ') + ((hideNavBottom && !navBottom) ? 'hidden' : '') +
                ' w-respXl  justify-center items-center flex gap-4 '}>
            <Navbar className={`${navBottom ? "shadow-lg" : 'shadow-md'} w-[calc(80%)] overflow-autoflex rounded-full h-full  min-w-max  lg:w-full  items-center p-0 !bg-white/95 border border-blue-gray-100/50`}>
                <div className={`${navBottom ? "flex-row" : 'flex-row-reverse'} w-full min-w-max h-full relative`}>
                    <ul className={`flex flex-row w-full overflow-auto rounded-full justify-between  h-full gap-auto md:divide-x-4 divide-white/95 `}>
                        {navItems.map(({ to, icon, label, color, col }: NavItem, index) => (
                            <Typography
                                onClick={() => { setColor(col) }}
                                key={index}
                                as="li"
                                color={col as any}
                                className={`flex rounded-full h-full items-center font-medium`}
                            >
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex gap-3 justify-center lg:justify-start p-[7px] items-center w-full  !h-[57px]  rounded-full  ${isActive ? `animSlide border-[1px] shadowMid z-30 ${color} !bg-white  ` : ''}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                bg
                                                style={``}
                                                icon={icon}
                                                fill={isActive ? true : false}
                                                color={col}
                                            />
                                            <span className={`!text-[0.9rem] font-bold
                                                 filter brightness-90 font-comfortaa hidden md:!text-[0.65rem] md:block lg:pr-8 pr-3`}>
                                                {label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </Typography>
                        ))}

                    </ul>
                </div>
            </Navbar>
            {addBtn && (
                <div className={`flex-1 border-${color}-500 border-[1px] border-opacity-30 rounded-full max-w-[58px] `}>
                    <div className={`flex z-50 items-center justify-center right-5  h-full gap-12 w-full rounded-full shadowMid`}>
                        <SpeedDial
                            placement={navBottom ? 'top' : 'bottom'}
                            offset={10}>
                            <SpeedDialHandler>
                                <div className={`rounded-full `}>
                                    <Icon
                                        onClick={() => setCloseDial(!closeDial)}
                                        icon="add"
                                        color='white'
                                        bg clear
                                        size='5xl'
                                        style={`${!closeDial ? ' !text-white transition-transform group-hover:rotate-45 hover:scale-[1]' : ''}  !text-[1.9rem] font-normal bg-${color}-500 h-10 w-10`} />
                                </div>
                            </SpeedDialHandler>
                            <SpeedDialContent
                                className={`!z-[99999] absolute flex items-center justify-center `}>
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
        </footer>
    );
};

export default NavBarBottom;
