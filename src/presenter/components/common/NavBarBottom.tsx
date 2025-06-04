import { Navbar, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";

interface NavBarBottomProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

const NavBarBottom: React.FC<NavBarBottomProps> = ({ addBtn = false }) => {
    const location = useLocation()
    const type = new URLSearchParams(location.pathname.split("/")[1]).toString().replace("=", '');
    const [closeDial, setCloseDial] = useState<boolean>(true)
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

    const addBtnItem = addBtn ? [{
        to: `/${type}/create`,
        icon: { service: "partner_exchange", evenement: "event", annonce: "dashboard", vote: "ballot", groupe: "groups" }[type] || "add",
        label: `Ajouter un ${type}`,
        color: "!border-blue-gray-500/20",
        col: 'blue-gray'
    }] : [
        {
            to: `/service/create`,
            icon: "partner_exchange",
            label: `Ajouter un Service`,
            color: "!border-cyan-500/20",
            col: 'cyan'
        }, {
            to: `/evenement/create`,
            icon: "event",
            label: `Ajouter un Événement`,
            color: "!border-cyan-500/20",
            col: 'cyan'

        },
        {
            to: `/annonce/create`,
            icon: "dashboard",
            label: `Ajouter une Annonce`,
            color: "!border-orange-500/20",
            col: 'orange'
        },
        {
            to: `/vote/create`,
            icon: "ballot",
            label: `Créer un Vote`,
            color: "!border-orange-500/20",
            col: 'orange'
        }
    ]



    return (
        <>    <div className={`${closeDial ? 'hidden' : ''} fixed bottom-[70px] h-[calc(100vh-70px)] w-full backdropBlur`}></div>
            {!hideNavBottom &&
                <div className="rounded-full">
                    <div className=" min-h-1 backdrop-blur-[0.5px]"></div >
                    <div className="min-h-1 backdrop-blur-[1px]"></div>
                </div >}
            <footer
                onDrag={
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setNavBottom(!navBottom);
                    }
                }

                className={(!navBottom ? 'pb-2 ' : 'pb-2 ') + ((hideNavBottom && navBottom) ? ' transform-y[-100%] opacity-0 anim' : '!my-0  ') + ((hideNavBottom && !navBottom) ? 'hidden' : '') + ((navBottom && !hideNavBottom) ? 'transform-y-0 opacity-100 anim' : '') +
                    ' w-respXl backdropBlur justify-center items-center flex gap-4'}>

                <Navbar className={`
              
                ${navBottom ? "shadow-lg" : 'shadow-md'} w-[calc(80%)] anim overflow-autoflex rounded-full h-full  min-w-max  lg:w-full  items-center p-0 !bg-white/95 border border-blue-gray-100/50`}>
                    <div className={`${navBottom ? "flex-row" : 'flex-row-reverse'} w-full min-w-max h-full relative`}>
                        <ul className={`flex flex-row w-full overflow-auto rounded-full justify-between  h-full gap-auto md:divide-x-4 divide-white/95 `}>
                            {navItems.map(({ to, icon, label, color, col }: NavItem, index) => (
                                <Typography
                                    onClick={() => { setColor(col) }}
                                    key={index}
                                    as="li"
                                    color={col as any}
                                    className={` flex rounded-full h-full items-center font-medium`}
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
                <div
                    onMouseLeave={() => setCloseDial(true)}
                    onMouseEnter={() => setCloseDial(false)}
                    className="flex justify-center items-center  h-full">
                    <div className={`flex-1 shadowMid border-${color}-500 border-[1px] border-opacity-30 rounded-full max-w-[58px] `}>

                        <SpeedDial
                            placement={navBottom ? 'top' : 'bottom'}
                            offset={10}>
                            <SpeedDialHandler >
                                <div
                                    onClick={() => setCloseDial(!closeDial)}
                                    className={`rounded-full text-white `}>
                                    <Icon
                                        icon="add"
                                        color='white'
                                        bg clear
                                        size='5xl'
                                        style={`${!closeDial ? ' !text-white transition-transform group-hover:rotate-45 hover:scale-[1]' : 'hidden'}  !text-[1.9rem] font-normal bg-${color}-500 h-10 w-10`} />
                                </div>
                            </SpeedDialHandler>
                            <SpeedDialContent
                                className="flex relative flex-col h-max-max w-max">
                                {addBtnItem.map(({ to, icon, label, col }: NavItem, index) => <SpeedDialAction
                                    key={index}
                                    className="flex !h-[58px] gap-6 w-[58px] shadow-lg"
                                    title={label}>
                                    <div>
                                        <Icon
                                            size='md'
                                            style='absolute !bg-white top-1 -left-1'
                                            icon="add"
                                            color={col} />
                                        <Icon
                                            link={to}
                                            size='3xl'
                                            icon={icon}
                                            color={addBtn ? color : col} />
                                    </div>
                                    <div className="py-2 px-4 mr-90 font-light rounded-full text-gray-900 absolute top-2/4 -left-3/4 -translate-y-2/4 -translate-x-3/4 bg-white text-xs shadow-xl lowercase">
                                        {label}
                                    </div>
                                </SpeedDialAction>)}
                            </SpeedDialContent>
                        </SpeedDial>
                    </div>
                </div>
            </footer></>
    );
};

export default NavBarBottom;
