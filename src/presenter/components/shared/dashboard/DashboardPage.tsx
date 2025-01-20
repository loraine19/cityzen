//src/presenter/components/shared/dashboard/DashboardPage.tsx
import { Avatar, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import DI from '../../../../di/ioc'
import { useContext } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Notif } from "../../../../domain/entities/Notif";
import { GetPathElement } from "../../../../infrastructure/services/utilsService";
import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import NavBarBottom from "../../common/NavBarBottom";
import { NotifBadge, Icon } from "../../common/SmallComps";
import { AuthHeader } from "../auth/authComps/AuthHeader";
import CalendarComp from "./CalendarComp";
import { logOut } from "../../../../infrastructure/services/authService";
import UserContext from "../../../../contexts/user.context";

export default function DashboardPage() {

    const { user, loadingUser, errorUser } = DI.resolve('userViewModel');
    console.log(user, loadingUser, errorUser)
    // const { notifs } = DI.resolve('notifsViewModel');
    const { notifList } = useContext(UserContext);

    const userClasse = "flex row-span-3 lg:grid pt-6 ";
    const eventClasse = "h-full flex row-span-5 lg:grid ";
    const notifClasse = " row-span-2 grid min-h-[7.8rem]  lg:pt-6";
    const mapClasse = "flex row-span-6 lg:grid";


    return (
        <div className="Body gray">
            <div className="relative flex-col w-full flex items-center  justify-center ">
                <div className="absolute flex justify-between  w-full max-w-[1000px] !m-auto  p-2">
                    <Icon icon="exit_to_app" size="2xl" style="px-3" onClick={logOut} title="se déconnecter" />
                    <NotifBadge notifList={notifList} />
                </div>
                <AuthHeader />
            </div>
            <main className="relative flex -top-6 -mb-5 h-[calc(100%-3.5rem)]">
                <div className={" flex-1 h-full flex flex-col lg:grid grid-cols-2 grid-rows-[auto_auto_auto_1fr_1fr_2fr_auto_auto] w-full gap-y-2 lg:gap-y-3 lg:gap-x-4 place-content-start overflow-auto"}>
                    <div className={`${userClasse}`}>
                        <Card className="lg:h-full p-0 flex-1 flex ">
                            <CardHeader className="flex flex-col items-center !p-0 justify-centerp-0 bg-transparent shadow-none">
                                <Avatar
                                    src={user?.Profile?.image as string}
                                    alt={user?.Profile?.firstName}
                                    variant="circular"
                                    className="!shadow-sm !shadow-gray-400 w-16 h-16 lg:w-20 lg:h-20 BgUser"
                                />
                                <div className="flex flex-col items-center justify-center ">
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                    >
                                        {user?.Profile?.firstName || <Skeleton />}
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="flex flex-col items-center justify-center px-4 py-1">
                                <div className="flex gap-2  justify-center items-center">
                                    <Icon link="/myprofile" icon="person_edit" color="cyan" fill bg size="lg"
                                        title="ouvrir la page profil" />
                                    <Icon link="/inbox" icon="diversity_3" color="orange" fill bg size="lg" title="ouvrir la page conciliation" />
                                    <Icon link="/" icon="two_pager" color='green' fill bg size="lg"
                                        title="ouvrir la page réglement" />
                                </div>
                                <Typography
                                    variant="h2"
                                    color="blue-gray"
                                    className="font-extrabold"
                                >
                                    {loadingUser ? <Skeleton width={50} height={50} circle={true} /> : user?.Profile?.points}
                                    <span className={`${loadingUser && 'hidden'} text-xs font-light `}>
                                        {' pts'}
                                    </span>
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={`hidden lg:${notifClasse} h-full lg:grid`}>
                        <Card className=" orange100">
                            <CardBody className="h-full flex flex-col py-3 px-4">
                                <div className="flex gap-2 items-center">
                                    <Icon fill icon="circle_notifications" link="/notifications" size="4xl" color="orange" title="voir mes notifications" />
                                    <div>
                                        <Typography color="blue-gray">
                                            {notifList && notifList.length > 0 ? `${notifList.length} notifications` : 'pas de notifications'}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full max-h-8 overflow-y-auto ">
                                    {notifList && (notifList.map((notif: Notif, index: number) => notif.read === false &&
                                        <div className="w-full font-light text-sm flex px-1 justify-between" key={index}>
                                            <p>
                                                <span className="text-orange-800 capitalize font-normal">{GetPathElement(notif.element.toString().toLowerCase())}</span> :
                                                {notif?.title}
                                            </p>
                                            <Icon icon="arrow_circle_right" link={`/${GetPathElement(notif.element.toString().toLowerCase())}/${notif.id}`} size="2xl" color="orange"
                                                title={"voir les details de " + notif.title} />
                                        </div>))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={mapClasse}>
                        <Card className="h-full flex-1 cyan">
                            <CardBody className="h-full min-h-[20vh] lg!min-h-[100%] flex flex-col  p-4">
                                <div className="flex items-center gap-2">
                                    <Icon fill icon="explore_nearby" link="/service" size="4xl" color="cyan"
                                        title="voir mes services" />
                                    <div>
                                        <Typography color="blue-gray">
                                            Services
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex-1 flex">
                                    {user?.Profile?.Address ? <AddressMapOpen address={user?.Profile?.Address} /> : <Skeleton />}</div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={eventClasse}>
                        <Card className="h-full flex-1  gray100">
                            <CardBody className="h-full flex flex-col p-4 ">
                                <CalendarComp logo={true} />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </main>
            <NavBarBottom addBtn={false} />
        </div>
    );
}