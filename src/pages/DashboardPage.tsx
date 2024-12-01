import { AuthHeader } from "../components/authComps/AuthHeader";
import NavBarBottom from "../components/NavBarBottom";
import { Link } from "react-router-dom";
import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Typography,
    Option,
    Select
} from "@material-tailwind/react";
import { userProfile } from "../types/user";
import { useEffect, useState, useContext } from "react";
import { GetAdressGps } from "../functions/GeoMapFunction";
import { adressGps, event, notif } from "../types/type";
import { MapComp } from "../components/mapComps/MapComp";
import CalendarComp from "../components/calendarComps/CalendarComp";
import { eventsFaker } from "../datas/fakers/eventsFaker";
import { getDays, getNotifications, GetPathElement } from "../functions/GetDataFunctions";
import UserContext from "../contexts/user.context";
import { usersFaker } from "../datas/fakers/usersFaker";
import postsFaker from "../datas/fakers/postsFaker";
import { poolsFaker, surveysFaker } from "../datas/fakers/surveyFaker";
import { servicesFaker } from "../datas/fakers/servicesFaker";


export default function DashboardPage() {
    const { user, setUserCont, userNotif, setUserNotif } = useContext(UserContext)
    const selectUser = (e: string) => {
        const find: userProfile | undefined = usersFaker.find((user) => user.id === parseInt(e));
        find && setUserCont(find);
        setUserNotif(notifList.length)
    };
    const idS = user.id ? user.id : 0
    const notificationList = getNotifications(postsFaker, eventsFaker, surveysFaker, poolsFaker, servicesFaker, idS);
    const [notifList, setNotifList] = useState<notif[]>(notificationList ? notificationList : []);


    let { firstName, avatar, points, adress } = user;
    const [adressGps, setAdressGps] = useState<adressGps>({ lat: 0, lng: 0 });

    useEffect(() => {
        firstName = user.firstName;
        const loadGps = async () => {
            const adressGpsLoaded = await GetAdressGps(adress);
            adressGpsLoaded && setAdressGps(adressGpsLoaded);
        };
        setNotifList(getNotifications(postsFaker, eventsFaker, surveysFaker, poolsFaker, servicesFaker, idS))
        loadGps();
    }, [adress, user]);


    const [eventList] = useState<event[]>(getDays(eventsFaker));
    const userClasse = "flex row-span-3 lg:grid pt-6 ";
    const eventClasse = "h-full flex row-span-5 lg:grid ";
    const notifClasse = " row-span-2 grid min-h-[7.8rem]  lg:pt-6";
    const mapClasse = "flex row-span-6 lg:grid";


    return (
        <div className="Body gray">
            <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative"
            >
                <div>
                    <Select className="shadowborder-none capitalize  !p-0 !m-0" variant="standard" label="" name={"users"}
                        labelProps={{
                            className:
                                " before:border-none after:border-none "
                        }}
                        onChange={(e: any) => { selectUser(e) }}
                        value={"1"}>
                        {usersFaker.map(
                            (user: userProfile, index: number) => {
                                return (
                                    <Option value={user.id?.toString()} key={index} >
                                        {user.firstName}
                                    </Option>
                                )
                            }
                        )}
                    </Select>
                </div><AuthHeader />


                <Link to="/notification">
                    <div className="absolute flex font-medium  items-center justify-center w-2 h-2 bg-cyan-500 text-white text-sm pt-[0.8rem] pb-[0.7rem] p-3 rounded-full top-8 right-11 shadow z-30 lg:hidden">{userNotif}</div>
                    <button className="absolute top-4 right-4 OrangeChip rounded-full h-7 w-7 p-5 flex justify-center items-center shadow lg:hidden">
                        <span className="material-symbols-outlined fill OrangeChip !text-2xl">notifications</span>
                    </button>

                </Link>
            </div>

            <main className="flex">
                <div className={" flex-1 h-full flex flex-col lg:grid grid-cols-2 grid-rows-[auto_auto_auto_1fr_1fr_2fr_auto_auto] w-full gap-y-2 lg:gap-y-3 lg:gap-x-4 place-content-start overflow-auto"}>
                    <div className={`${userClasse}`}>
                        <Card className="lg:h-full p-0 flex-1 flex ">
                            <CardHeader className="flex flex-col items-center !p-0 justify-centerp-0 bg-transparent shadow-none">
                                <Avatar
                                    src={avatar}
                                    alt={firstName}
                                    variant="circular"
                                    className="!shadow-sm !shadow-gray-400 w-16 h-16 lg:w-20 lg:h-20"
                                />
                                <div className="flex flex-col items-center justify-center ">
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                    >
                                        {user.firstName}
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="flex flex-col items-center justify-center px-4 py-1 sm:pb-2">
                                <div className="flex gap-2">
                                    <Link to="/myprofile">
                                        <span
                                            className=" pt-[0.3rem] pb-[0.2rem]
                                     material-symbols-rounded fill bg-cyan-200 rounded-full p-1 !text-[1rem] text-cyan-800"
                                        >
                                            person_edit
                                        </span>
                                    </Link>
                                    <Link to="/">
                                        <span className=" pt-[0.3rem] pb-[0.2rem] material-symbols-rounded fill bg-orange-200 rounded-full p-1 !text-[1rem] text-orange-800">
                                            shield_person
                                        </span>
                                    </Link>
                                    <Link to="/">
                                        <span className="pt-[0.3rem] pb-[0.2rem] material-symbols-rounded fill bg-gray-400 rounded-full p-1 !text-[1rem] text-gray-800">
                                            book_4
                                        </span>
                                    </Link>
                                </div>
                                <Typography
                                    variant="h2"
                                    color="blue-gray"
                                    className="font-extrabold"
                                >
                                    {points}{" "}
                                    <span className="text-xs font-light ml-[-0.3rem]">
                                        pts
                                    </span>
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>


                    <div className={`hidden lg:${notifClasse}  h-full lg:grid`}>
                        <Card className=" orange100">
                            <CardBody className="h-full flex flex-col py-3 px-4">
                                <div className="flex gap-2 items-center">
                                    <Link to="/notification"><span className="material-symbols-rounded fill text-orange-800 !text-4xl" >circle_notifications</span> </Link>
                                    <div>
                                        <Typography color="blue-gray">
                                            {userNotif > 0 ? `${userNotif} notifications` : 'pas de notifications'}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full max-h-8 overflow-y-auto ">
                                    {notifList && (notifList.map((notifL: notif, index) => <div className="w-full font-light text-sm flex px-1 justify-between" key={index}><div><span className="text-orange-800 capitalize font-normal">{GetPathElement(notifL.type)}</span> : {notifL.element.title} </div><Link to={`/${GetPathElement(notifL.type)}/${notifL.element.id}`}><span className="material-symbols-rounded  text-orange-800 !text-2xl pb-1">arrow_circle_right</span></Link></div>))}</div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={mapClasse}>
                        <Card className="h-full flex-1 cyan">
                            <CardBody className="h-full min-h-[24vh] lg!min-h-[100%] flex flex-col  p-4">
                                <div className="flex items-center gap-2">
                                    <Link to="/service">
                                        <span className="material-symbols-rounded fill text-cyan-600 !text-4xl">
                                            explore_nearby
                                        </span>{" "}
                                    </Link>
                                    <div>
                                        <Typography color="blue-gray">
                                            Services
                                        </Typography>
                                    </div>
                                </div>
                                <MapComp adressGpsEvent={adressGps} />
                            </CardBody>
                        </Card>
                    </div>


                    <div className={eventClasse}>
                        <Card className="h-full flex-1  gray100">
                            <CardBody className="h-full flex flex-col p-4 ">
                                <CalendarComp eventList={eventList} />
                            </CardBody>
                        </Card>
                    </div>


                </div>
            </main>
            <NavBarBottom addBtn={false} />
        </div>
    );
}