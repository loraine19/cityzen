import { AuthHeader } from "../components/authComps/AuthHeader";
import NavBarBottom from "../components/UIX/NavBarBottom";
import { Link } from "react-router-dom";
import { Avatar, Card, CardBody, CardHeader, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState, useContext } from "react";
import { addressGps, notif } from "../types/type";
import CalendarComp from "../components/calendarComps/CalendarComp";
import { getDays, GetPathElement } from "../functions/GetDataFunctions";
import UserContext from "../contexts/user.context";
import DataContext from "../contexts/data.context";
import { EventP, Profile, } from "../types/class";
import { getNotifs, getUserMe } from "../functions/API/usersApi";
import { getEvents } from "../functions/API/eventsApi";
import { refreshAccess } from "../functions/API/useApi";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AddressMapOpen from "../components/mapComps/AddressMapOpen";


export default function DashboardPage() {
    const { setUserCont, userNotif, setUserNotif } = useContext(UserContext)
    const [user, setUser] = useState<Profile>({} as Profile);
    const [events, setEvents] = useState<EventP[]>([] as EventP[]);
    const { data, resetData } = useContext(DataContext)
    1 > 2 && console.log('data', data)
    const [loading, setLoading] = useState<boolean>(true);
    const [notifList, setNotifList] = useState<notif[]>(localStorage.getItem('notifs') ? JSON.parse(localStorage.getItem('notifs') as string) : []);
    let { firstName, image, points, } = user;
    const [addressGps, setAddressGps] = useState<addressGps>({ lat: 0, lng: 0 });
    1 > 2 && console.log(addressGps)

    useEffect(() => {
        const fetch = async () => {
            const me = await getUserMe()
            const userProfile = me.Profile as Profile;
            setUser(userProfile);
            setUserCont(userProfile);
            localStorage.setItem('user', JSON.stringify(userProfile));
            setAddressGps({ lat: Number(userProfile.Address.lat), lng: Number(userProfile.Address.lng) });
            const events = await getEvents()
            setEvents(getDays(events));
            me && setLoading(false);
            if (userNotif === 0) {
                const notif = await getNotifs()
                if (notif) {
                    setNotifList(notif);
                    setUserNotif(notif.length);
                    localStorage.setItem('notifs', JSON.stringify(notif));
                }
            }
        }
        fetch()
    }, []);


    const fetchRefreshToken = async () => await refreshAccess()
    const userClasse = "flex row-span-3 lg:grid pt-6 ";
    const eventClasse = "h-full flex row-span-5 lg:grid ";
    const notifClasse = " row-span-2 grid min-h-[7.8rem]  lg:pt-6";
    const mapClasse = "flex row-span-6 lg:grid";

    return (
        <div className="Body gray">
            <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
                <div className="flex items-center  gap-2">
                    <Button ripple={false} variant="text" size="sm" onClick={() => { resetData() }} className="text-sm !font-light rounded-full flex-1 px-5">Reset local </Button>
                    <button onClick={() => fetchRefreshToken()} className="text-sm !font-light rounded-full flex-1 px-5">refresh token</button>
                </div>
                <AuthHeader />
                <Link to="/notification">
                    <div className="absolute flex font-medium  items-center justify-center w-2 h-2 bg-cyan-500 text-white text-sm pt-[0.8rem] pb-[0.7rem] p-3 rounded-full top-8 right-11 shadow z-30 lg:hidden">{userNotif}</div>
                    <button className="absolute top-4 right-4 OrangeChip rounded-full h-7 w-7 p-5 flex justify-center items-center shadow lg:hidden">
                        <span className="material-symbols-rounded notranslate fill OrangeChip !text-2xl">notifications</span>
                    </button>
                </Link>
            </div>
            <main className="flex">
                <div className={" flex-1 h-full flex flex-col lg:grid grid-cols-2 grid-rows-[auto_auto_auto_1fr_1fr_2fr_auto_auto] w-full gap-y-2 lg:gap-y-3 lg:gap-x-4 place-content-start overflow-auto"}>
                    <div className={`${userClasse}`}>
                        <Card className="lg:h-full p-0 flex-1 flex ">
                            <CardHeader className="flex flex-col items-center !p-0 justify-centerp-0 bg-transparent shadow-none">
                                <Avatar
                                    src={image as string}
                                    alt={firstName}
                                    variant="circular"
                                    className="!shadow-sm !shadow-gray-400 w-16 h-16 lg:w-20 lg:h-20 BgUser"
                                />
                                <div className="flex flex-col items-center justify-center ">
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                    >
                                        {user.firstName || <Skeleton />}
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="flex flex-col items-center justify-center px-4 py-1 sm:pb-2">
                                <div className="flex gap-2">
                                    <Link to="/myprofile">
                                        <span
                                            className=" pt-[0.3rem] pb-[0.2rem]
                                     material-symbols-rounded !notranslate fill bg-cyan-200 rounded-full p-1 !text-[1rem] text-cyan-800"
                                        >
                                            &#xf4fa;
                                        </span>
                                    </Link>
                                    <Link to="/">
                                        <span className=" pt-[0.3rem] pb-[0.2rem] material-symbols-rounded notranslate  fill bg-orange-200 rounded-full p-1 !text-[1rem] text-orange-800">
                                            &#xef3d;
                                        </span>
                                    </Link>
                                    <Link to="/">
                                        <span className="pt-[0.3rem] pb-[0.2rem] material-symbols-rounded notranslate fill bg-gray-400 rounded-full p-1 !text-[1rem] text-gray-800">
                                            &#xf53c;
                                        </span>
                                    </Link>
                                </div>
                                <Typography
                                    variant="h2"
                                    color="blue-gray"
                                    className="font-extrabold"
                                >
                                    {loading ? <Skeleton width={50} height={50} circle={true} /> : points}
                                    <span className={`${loading && 'hidden'} text-xs font-light `}>
                                        {' pts'}
                                    </span>
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={`hidden lg:${notifClasse}  h-full lg:grid`}>
                        <Card className=" orange100">
                            <CardBody className="h-full flex flex-col py-3 px-4">
                                <div className="flex gap-2 items-center">
                                    <Link to="/notification"><span className="material-symbols-rounded notranslate fill text-orange-800 !text-4xl" >circle_notifications</span> </Link>
                                    <div>
                                        <Typography color="blue-gray">
                                            {notifList.length > 0 ? `${notifList.length} notifications` : 'pas de notifications'}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full max-h-8 overflow-y-auto ">
                                    {notifList && (notifList.map((notifL: any, index: number) =>
                                        <div className="w-full font-light text-sm flex px-1 justify-between" key={index}><div>
                                            <span className="text-orange-800 capitalize font-normal">{GetPathElement(notifL.element.toLowerCase())}</span> : {notifL?.title} </div>
                                            <Link to={`/${GetPathElement(notifL.element.toLowerCase())}/${notifL.id}`}>
                                                <span className="material-symbols-rounded notranslate text-orange-800 !text-2xl pb-1">arrow_circle_right</span></Link></div>))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={mapClasse}>
                        <Card className="h-full flex-1 cyan">
                            <CardBody className="h-full min-h-[24vh] lg!min-h-[100%] flex flex-col  p-4">
                                <div className="flex items-center gap-2">
                                    <Link to="/service">
                                        <span className="material-symbols-rounded notranslate fill text-cyan-600 !text-4xl">
                                            explore_nearby
                                        </span>{" "}
                                    </Link>
                                    <div>
                                        <Typography color="blue-gray">
                                            Services
                                        </Typography>
                                    </div>
                                </div>
                                {loading ? <Skeleton /> : <AddressMapOpen address={user.Address} />}
                            </CardBody>
                        </Card>
                    </div>
                    <div className={eventClasse}>
                        <Card className="h-full flex-1  gray100">
                            <CardBody className="h-full flex flex-col p-4 ">
                                <CalendarComp eventList={events} />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </main>
            <NavBarBottom addBtn={false} />
        </div>
    );
}