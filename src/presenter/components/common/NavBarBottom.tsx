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
        { to: "/service", icon: "partner_exchange", label: "Service", color: "!border-light-blue-500/20", col: 'light-blue' },
        { to: "/evenement", icon: "event", label: "Évenement", color: "!border-cyan-500/20", col: 'cyan' },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: "!border-rose-500/20", col: 'rose' },
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
            color: "!border-light-blue-500/20",
            col: 'light-blue'
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
            color: "!border-rose-500/20",
            col: 'rose'
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
        <>
            <div className={`${closeDial ? 'hidden' : ''} ${navBottom ? `bottom-[65px] h-[calc(100vh-70px)] max-h-[calc(100vh-70px)] w-full backdropBlur  bg fixed ` : 'hidden'}    `}>
            </div>

            <footer
                onDoubleClick={() => setNavBottom(!navBottom)}
                onDoubleClickCapture={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setNavBottom(!navBottom)
                }}

                className={
                    ((hideNavBottom && navBottom) ? 'transform-y[-100%] hidden opacity-0 anim z-0' : '!my-0 ') +
                    ((hideNavBottom && !navBottom) ? 'hidden ' : '') +
                    ((navBottom) ? `items-center pb-2 bottom-0 transform-y-0 opacity-100 anim ${color}BG backdropBlur w-respXl rounded-full justify-center` : 'pt-2 fixed left-1/2 -translate-x-1/2 -top-1 z-0 scale-90  w-[calc(100%-10rem)] lg:!max-w-[calc(1000px-8rem)] -ml-2 items-start !justify-start') +
                    ` flex gap-6`
                }>

                <Navbar className={`${navBottom ? 'min-w-max !max-w-[calc(100vw-8rem)] w-full' : ' overflow-x-auto lg:overflow-hidden !max-w-[calc(100%-6rem)]'} -ml-4  shadow-md overflow-auto flex rounded-full h-full items-center p-0 !bg-white/95 border border-blue-gray-100/50`}>
                    <div className={`${navBottom ? "flex-row" : 'flex-row-reverse '} w-full min-w-max h-full relative `}>
                        <ul className={`flex !max-w-[calc(100vw-8rem)] overflow-auto flex-row w-full  rounded-full justify-between  h-full gap-auto `}>
                            {navItems.map(({ to, icon, label, color, col }: NavItem, index) => (
                                <Typography
                                    onClick={() => { setColor(col) }}
                                    key={index}
                                    as="li"
                                    className={` text-${col}-500 flex rounded-full h-full items-center font-medium`}
                                >
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `flex gap-3 justify-center lg:justify-start p-[7px] items-center w-full  !h-[57px]  rounded-full  ${isActive ? ` animSlide border-[1px] shadowMid z-30 ${color} !bg-white  ` : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <Icon
                                                    bg
                                                    icon={icon}
                                                    fill={isActive ? true : false}
                                                    color={col}
                                                />
                                                <span className={`${navBottom ? 'md:block' : 'lg:block'} !text-[0.95rem] font-bold filter brightness-90 font-comfortaa hidden md:!text-[0.8rem] lg:pr-8 pr-3`}>
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
                    className="flex justify-center z-[22] items-center h-full -mr-4">
                    <div className={`rounded-full `}>
                        <SpeedDial
                            placement={navBottom ? 'top' : 'bottom'}
                            offset={10}>
                            <SpeedDialHandler >
                                <div className={`rounded-full text-white `}>
                                    <Icon
                                        icon="add"
                                        color='white'
                                        bg clear
                                        size='5xl'
                                        style={`${!closeDial ? '!text-white transition-transform group-hover:rotate-45 hover:scale-[1]' : 'hidden'} !text-[1.9rem] font-normal bg-${color}-500 h-10 w-10 !shadow-md`} />
                                </div>
                            </SpeedDialHandler>
                            <SpeedDialContent
                                className="flex relative flex-col h-max-max w-max">
                                {addBtnItem.map(({ to, icon, label, col }: NavItem, index) => <SpeedDialAction
                                    key={index}
                                    className="flex over:scale-[1.1] !h-[58px] gap-6 w-[58px] shadow-lg"
                                    title={label}>
                                    <div>
                                        <Icon
                                            size='md'
                                            style={`absolute ${col ? ` bg-white shadow` : 'bg-white'} top-1 -left-1`}
                                            icon="add"
                                            color={col} />
                                        <Icon
                                            bg
                                            fill={addBtn ? true : false}
                                            link={to}
                                            size='2xl'
                                            icon={icon}
                                            color={addBtn ? color : col} />
                                    </div>
                                    <div className={`py-2 px-4 right-[5rem] rounded-full text-${col}-500 absolute bg-white text-sm shadow-xl !border !border-gray-300`}>
                                        {label}
                                    </div>
                                </SpeedDialAction>)}
                            </SpeedDialContent>
                        </SpeedDial>
                    </div>
                </div>
            </footer >
            <div className={`${closeDial ? 'hidden' : ''} ${!navBottom ? 'z-[9] top-[70px] h-[calc(100vh-70px)] max-h-[calc(100vh-70px)] w-full backdropBlur fixed' : 'hidden'}`}>
            </div>
        </>
    );
};

export default NavBarBottom;
