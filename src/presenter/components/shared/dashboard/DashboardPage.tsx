//src/presenter/components/shared/dashboard/DashboardPage.tsx
import { Avatar, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { NotifView } from "../../../../domain/entities/Notif";
import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import NavBarBottom from "../../common/NavBarBottom";
import { Icon, LogOutButton } from "../../common/SmallComps";
import { AuthHeader } from "../auth/auth.Comps/AuthHeader";
import CalendarComp from "../../common/CalendarComp";
import { useNotificationStore } from "../../../../application/stores/notification.store";
import { useEffect, useState } from "react";
import { NotifBadge } from "../../common/NotifBadge";
import { Skeleton } from "../../common/Skeleton";
import { useUserStore } from "../../../../application/stores/user.store";
import { ConfirmModal } from "../../common/ConfirmModal";
import { useSearchParams } from "react-router-dom";

export default function DashboardPage() {
    const user = useUserStore((state) => state.user);
    const notifList = useNotificationStore((state) => state.notifList);
    const updateNotif = useNotificationStore((state) => state.updateNotif);
    const userNotif = useNotificationStore((state) => state.notifList?.filter((notif) => !notif.read).length);
    const userClasse = "flex row-span-3 lg:grid pt-6 ";
    const eventClasse = "h-full flex row-span-5 lg:grid ";
    const notifClasse = " row-span-2 grid min-h-[7.8rem]  lg:pt-6";
    const mapClasse = "flex row-span-6 lg:grid";
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        msg && setOpen(true)
    }, [msg])

    useEffect(() => {
        updateNotif(notifList)
    }, [notifList])

    return (
        <div className="Body gray">
            <ConfirmModal
                open={open}
                disableConfirm
                handleOpen={() => { }}
                handleConfirm={() => { setOpen(false); window.location.href = '/' }}
                handleCancel={() => { }}
                title="Notification"
                element={msg || ''}

            />
            <div className="relative flex-col w-full flex items-center  justify-center ">
                <div className="absolute flex justify-between lg:justify-end w-full max-w-[1000px] !m-auto  p-2">
                    <LogOutButton />
                    <div className="lg:hidden">
                        <NotifBadge />
                    </div>
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
                                    {!user ? <Skeleton className="rounded-full" /> : user?.Profile?.points}
                                    <span className={`${!user && 'hidden'} text-xs font-light `}>
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
                                            {notifList && userNotif > 0 ? `${userNotif} notifications` : 'pas de notifications'}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full max-h-8 overflow-y-auto ">
                                    {notifList && (notifList.map((notif: NotifView, index: number) => notif.read === false &&
                                        <div className="w-full font-light text-sm flex px-1 justify-between" key={index}>
                                            <p>
                                                <span className="text-orange-800 capitalize font-normal">{notif?.elementType}</span> :
                                                {notif?.title}
                                            </p>
                                            <Icon icon="arrow_circle_right" link={`/${notif?.elementType}/${notif.id}`} size="2xl" color="orange"
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