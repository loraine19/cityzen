import { Button, Navbar, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function NavBarBottom(props: { handleClick?: () => void, addBtn?: boolean, color?: string }) {
    const navigate = useNavigate()
    const onclick = () => navigate(`/${type}/create`)
    const color = props.color || "cyan"
    const { addBtn } = props
    const type = (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')
    const [closeDial, setCloseDial] = useState<boolean>(false)

    return (

        <footer className="pt-0.5 pb-2 px-2 z-30 ">
            <Navbar className="flex rounded-full shadow-lg h-16 items-center justify-between p-0 !bg-white"
            >
                <div className="w-full self-center pl-4 pr-1 h-full -mb-1">
                    <ul className={`flex flex-row justify-around gap-4 pl-2 h-full  `}>
                        < Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="flex flex-1  justify-center items-center font-medium " >
                            <NavLink to="/" className={({ isActive }) => `flex w-[90%] justify-center flex-col items-center gap-0 lg:flex-row lg:gap-2 h-full ${isActive && 'border-b-4 border-blue-gray-600 '}`} >
                                <span className={`icon notranslate `}
                                >home</span>
                                <span className="text-[0.6rem] -mt-1 font-light lg:block lg:text-sm">Home</span>
                            </NavLink>
                        </Typography >
                        < Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="flex flex-1 justify-center items-center font-medium " >
                            <NavLink to="/service" className={({ isActive }) => `flex w-[90%] justify-center flex-col items-center gap-0 lg:flex-row lg:gap-2 h-full ${isActive && 'border-b-4 border-cyan-600'}`}>
                                <span className="icon notranslate UCyan">partner_exchange</span>
                                <span className="text-[0.6rem] -mt-1 font-light lg:block lg:text-sm">Service</span>
                            </NavLink>
                        </Typography >
                        < Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="flex flex-1 h-full justify-center items-center font-medium " >
                            <NavLink to="/evenement" className={({ isActive }) => `flex w-[90%] justify-center flex-col items-center gap-0 lg:flex-row lg:gap-2 h-full ${isActive && 'border-b-4 border-cyan-600'}`}>
                                <span className="icon notranslate ">event</span>
                                <span className="text-[0.6rem] -mt-1 font-light lg:block lg:text-sm">Évenement</span>
                            </NavLink>
                        </Typography >
                        < Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="flex flex-1 h-full justify-center items-center font-medium " >
                            <NavLink to="/annonce" className={({ isActive }) => `flex w-[90%] justify-center flex-col items-center gap-0 lg:flex-row lg:gap-2 h-full ${isActive && 'border-b-4 border-orange-600'}`}>
                                <span className="icon notranslate UOrange ">dashboard</span>
                                <span className="text-[0.6rem] -mt-1 font-light lg:block lg:text-sm">Annonce</span>
                            </NavLink>
                        </Typography >
                        < Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="flex flex-1 h-full justify-center  items-center font-medium " >
                            <NavLink to="/sondage" className={({ isActive }) => `flex w-[90%] justify-center flex-col items-center gap-0 lg:flex-row lg:gap-2 h-full ${isActive && 'border-b-4 border-orange-600'}`}>
                                <span className="icon notranslate UOrange">ballot</span>
                                <span className="text-[0.6rem] -mt-1 font-light lg:block lg:text-sm">Sondage</span>
                            </NavLink>
                        </Typography >
                    </ul >
                </div>
                <div className={addBtn ? "flex p-2 " : "hidden"}>
                    <SpeedDial offset={10}>
                        <SpeedDialHandler >
                            <Button size="sm" color={color as any} className={`flex items-center justify-center  rounded-full h-12 w-12 `} onClick={() => setCloseDial(!closeDial)}>
                                <span className={`icon notranslate ${!closeDial && 'transition-transform  group-hover:rotate-45'}`}>add</span>
                            </Button>
                        </SpeedDialHandler>
                        <SpeedDialContent className={`${closeDial && "hidden"}`}>
                            <SpeedDialAction className="h-14 gap-4 w-14 shadow-lg" title={`Ajouter un ${type}`} onClick={onclick}>
                                <span className={`icon notranslate  text-${color}-500`}>edit</span>
                                <div className=
                                    "py-2 px-4 mr-90 font-thin  rounded-full text-gray-900 absolute top-2/4 -left-3/4 -translate-y-2/4 -translate-x-3/4  bg-white text-xs shadow-xl lowercase">{`Ajouter un ${type}`}</div>
                            </SpeedDialAction>
                        </SpeedDialContent>
                    </SpeedDial>
                </div>
            </Navbar>
        </footer>
    );
}