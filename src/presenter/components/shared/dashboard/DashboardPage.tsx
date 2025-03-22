import { Avatar, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import NavBarBottom from "../../common/NavBarBottom";
import { Icon } from "../../common/IconComp";
import { AuthHeader } from "../auth/auth.Comps/AuthHeader";
import CalendarComp from "../../common/CalendarComp";
import { useEffect, useRef, useState } from "react";
import { NotifBadge } from "../../common/NotifBadge";
import { Skeleton } from "../../common/Skeleton";
import { useUserStore } from "../../../../application/stores/user.store";
import { ConfirmModal } from "../../common/ConfirmModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LogOutButton } from "../../common/LogOutBtn";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import { Role } from "../../../../domain/entities/GroupUser";
import DI from "../../../../di/ioc";
import { LoadMoreButton } from "../../common/LoadMoreBtn";

export default function DashboardPage() {
    const user = useUserStore((state) => state.user);
    const fetchUser = useUserStore((state) => state.fetchUser);
    useEffect(() => {
        const fetch = async () => {
            if (!user || !user.Profile) { await fetchUser() }
        }
        fetch()
    }, [])

    const navigate = useNavigate();
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { notifs, refetch, count, fetchNextPage, hasNextPage, isLoading } = notifViewModelFactory();
    const notifMapViewModelFactory = DI.resolve('notifMapViewModel');
    const { notifsMap, isLoadingMap } = notifMapViewModelFactory();


    const userClasse = "flex row-span-3 lg:grid pt-6 ";
    const eventClasse = "h-full flex row-span-5 lg:grid ";
    const notifClasse = " row-span-2 grid min-h-[7.8rem]  lg:pt-6";
    const mapClasse = "flex row-span-6 lg:grid";
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");
    const [open, setOpen] = useState<boolean>(msg ? true : false);

    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) {
                    fetchNextPage();
                }
            } else {
                setIsBottom(false);
            }
        }
    };

    return (
        <>
            <ConfirmModal
                open={open}
                disableConfirm
                handleOpen={() => { }}
                handleConfirm={() => { setOpen(false); window.location.href = '/' }}
                handleCancel={() => { }}
                title="Notification"
                element={msg || ''}

            />
            <div className="Body gray">
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
                                        src={user?.Profile?.image as string || '/image/person.svg'}
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
                                        <Icon
                                            link="/myprofile"
                                            icon="person_edit"
                                            color="cyan"
                                            fill bg
                                            size="lg"
                                            title="ouvrir la page profil" />
                                        <Icon
                                            link="/chat"
                                            icon="forum"
                                            color="orange"
                                            fill bg
                                            size="lg"
                                            title="ouvrir la page chat" />
                                        <Icon
                                            style={user?.GroupUser[0].role === Role.MODO ? '' : 'cursor-not-allowed'}
                                            link={user?.GroupUser[0].role === Role.MODO ? '/conciliation' : ''}
                                            icon="diversity_3"
                                            color={user?.GroupUser[0].role === Role.MODO ? 'red' : 'blue-gray'}
                                            fill bg
                                            size="lg"
                                            title="ouvrir la page conciliation" />
                                        <Icon
                                            link="/"
                                            icon="two_pager"
                                            color='green' fill bg
                                            size="lg"
                                            title="ouvrir la page réglement" />
                                    </div>
                                    <Typography
                                        variant="h2"
                                        color="blue-gray"
                                        className="font-extrabold"
                                    >
                                        {!user ?
                                            <Skeleton className="rounded-full" /> :
                                            user?.Profile?.points}
                                        <span className={`${!user && 'hidden'} text-xs font-light `}>
                                            {' pts'}
                                        </span>
                                    </Typography>
                                </CardBody>
                            </Card>
                        </div>
                        <div className={`hidden lg:${notifClasse}  h-full lg:grid`}>
                            <Card className=" orange100 ">
                                <CardBody className="h-full flex flex-col  pt-2 pb-0 px-4">
                                    <div className="flex gap-2 items-center">
                                        <Icon
                                            fill
                                            icon="circle_notifications"
                                            link="/notification"
                                            size="4xl"
                                            color="orange"
                                            title="voir mes notifications" />
                                        <div>
                                            <Typography
                                                color="blue-gray">
                                                {count > 0 ?
                                                    `${count} notifications` : 'pas de notifications'}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col -mt-0.5 max-h-10 overflow-y-auto"
                                        onScroll={() => handleScroll()}
                                        ref={divRef}>
                                        {!isLoading && (notifs.map((notif: NotifView, index: number) => notif.read === false &&
                                            <div key={index}
                                                className=" font-light text-sm flex items-center pl-2 justify-between hover:cursor-pointer hover:bg-orange-100 rounded-full py-0.5"
                                                onClick={async () => {
                                                    await readNotif(notif.id);
                                                    refetch();
                                                    notif.link && navigate(notif.link)
                                                }}>
                                                <p className="truncate max-w-[30vw]">
                                                    <span
                                                        className="text-orange-800 capitalize font-normal">
                                                        {notif?.typeS} :&nbsp;
                                                    </span>
                                                    <span className="">
                                                        {notif?.description}
                                                    </span>
                                                </p>

                                                {notif.link && <Icon
                                                    icon={notif.link ? "arrow_circle_right" : "cancel"}
                                                    onClick={async () => {
                                                        await readNotif(notif.id);
                                                        refetch();
                                                        notif.link && navigate(notif.link)
                                                    }}
                                                    size="2xl"
                                                    color="orange"
                                                    title={"voir les details de " + notif?.title} />}
                                            </div>))}

                                    </div>
                                    <LoadMoreButton
                                        style="-mb-8"
                                        color="orange"
                                        size="2xl"
                                        isBottom={isBottom}
                                        hasNextPage={hasNextPage}
                                        handleScroll={() => handleScroll()} />
                                </CardBody>
                            </Card>
                        </div>
                        <div className={mapClasse}>
                            <Card className="h-full flex-1 cyan">
                                <CardBody className="h-full min-h-[20vh] lg!min-h-[100%] flex flex-col !pt-2 p-4">
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            fill
                                            icon="explore_nearby"
                                            link="/service"
                                            size="4xl"
                                            color="cyan"
                                            style="hover:!bg-cyan-100"
                                            title="voir mes services" />
                                        <div>
                                            <Typography
                                                color="blue-gray">
                                                {isLoadingMap ?
                                                    'Chargement...' :
                                                    ` ${notifsMap.length} nouveautés à proximité`}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex">
                                        {user?.Profile?.Address && notifsMap.length > 0 ?
                                            <AddressMapOpen
                                                message=" 📍 Vous êtes ici "
                                                address={user?.Profile?.Address}
                                                notifs={notifsMap} /> :
                                            <Skeleton />}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className={eventClasse}>
                            <Card className="h-full flex-1  gray100 ">
                                <CardBody className="h-full flex flex-col !pt-1 p-4 ">
                                    <CalendarComp logo={true} />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </main>
                <NavBarBottom addBtn={false} />
            </div>
        </>
    );
}