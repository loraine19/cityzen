import { Navbar, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUserStore } from "../../../application/stores/user.store";

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
    const { setColor, color } = useNotificationStore((state) => state);
    const { setNavBottom, navBottom } = useUserStore((state) => state);

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
        <footer onDrag={
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                setNavBottom(!navBottom);
            }
        }
            className={(!navBottom ? 'justify-center items-center flex pb-2 ' : 'pt-1 pb-1.5 ') + 'px-1'}>
            <Navbar className={`${navBottom ? "shadow-lg" : 'shadow-md'} flex rounded-full h-full   items-center p-0 !bg-white/90 border border-blue-gray-100/50`}>
                <div className={`${navBottom ? "flex-row" : 'flex-row-reverse'} w-full h-full relative"`}>
                    <ul className={`flex flex-row w-full overflow-auto rounded-full justify-between  h-full`}>
                        {navItems.map(({ to, icon, label, color, col }: NavItem, index) => (
                            <Typography
                                onClick={() => { setColor(col) }}
                                key={index}
                                as="li"
                                variant="small"
                                color={col as any}
                                className={`flex rounded-full h-full  items-center  font-medium`}
                            >
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex  gap-3 justify-center lg:justify-start px-[0.55rem] items-center w-full !h-[3.7rem]  rounded-full  ${isActive ? `animSlide border-[1px] shadowMid z-30 ${color}  bg-white` : ''}`
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
                                            <span className={`!text-[0.85rem] font-bold
                                                 filter brightness-90 font-comfortaa hidden lg:block  pr-8`}>
                                                {label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </Typography>
                        ))}
                        {addBtn && (
                            <div className="flex-1 max-w-[3.75rem]">
                                <div className={`flex z-50 border items-center justify-center right-0 bg-${color}-100 h-full gap-12 w-full rounded-full shadowMid`}>
                                    <SpeedDial
                                        placement={navBottom ? 'top' : 'bottom'}
                                        offset={10}>
                                        <SpeedDialHandler>
                                            <div className={`bg-${color}-500  rounded-full `}>
                                                <Icon
                                                    onClick={() => setCloseDial(!closeDial)}
                                                    icon="add"
                                                    color={'white'}
                                                    style={`${!closeDial ? 'transition-transform group-hover:rotate-45 hover:scale-[1]' : ''}  !text-[1.9rem] font-normal bg-${color}-500 h-10 w-10`} />
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
                    </ul>
                </div>
            </Navbar>
        </footer>
    );
};

export default NavBarBottom;
