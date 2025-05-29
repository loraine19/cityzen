import { Avatar, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import NavBarBottom from "../../common/NavBarBottom";
import { Icon } from "../../common/IconComp";
import CalendarComp from "../../common/CalendarComp";
import { useEffect, useRef, useState } from "react";
import { NotifBadge } from "../../common/NotifBadge";
import { Skeleton } from "../../common/Skeleton";
import { useUserStore } from "../../../../application/stores/user.store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LogOutButton } from "../../common/LogOutBtn";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import { Role } from "../../../../domain/entities/GroupUser";
import DI from "../../../../di/ioc";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { ElementNotif } from "../../../../domain/entities/Notif";
import { useNotificationStore } from "../../../../application/stores/notification.store";
import { useAlertStore } from "../../../../application/stores/alert.store";

export default function DashboardPage() {

    //// USER & AUTORISATION
    const { user, fetchUser, setIsLoggedIn } = useUserStore((state) => state);
    const modo = user?.GroupUser?.map(g => g.role).includes(Role.MODO) || false;
    useEffect(() => {
        !user ? setIsLoggedIn(false) : setIsLoggedIn(true);
        !user.Profile && fetchUser()
    }, [user])
    const navigate = useNavigate();

    //// CLASSES
    const userClasse = "flex row-span-3 lg:grid pt-6 ";
    const eventClasse = "h-full flex row-span-5 lg:grid ";
    const notifClasse = " row-span-2 grid min-h-[8rem] lg:pt-6";
    const mapClasse = "flex row-span-6 lg:grid";

    //// PARAMS
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");

    //// NOTIFICATIONS
    const { unReadMsgNotif, unReadNotMessages } = useNotificationStore((state) => state);
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { notifs, refetch, count, fetchNextPage, hasNextPage, isLoading } = notifViewModelFactory();
    const notifMapViewModelFactory = DI.resolve('notifMapViewModel');
    const { notifsMap, isLoadingMap } = notifMapViewModelFactory();

    //// HANDLE SCROLL NOTIFICATIONS
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true)
                if (hasNextPage) fetchNextPage()
            } else setIsBottom(false)
        }
    }

    //// HANDLE NOTIFICATIONS ALERT
    const { setAlertValues, setOpen } = useAlertStore(state => state)
    useEffect(() => {
        msg && setOpen(true)
        setAlertValues({
            handleConfirm: () => { setOpen(false); window.location.href = '/' },
            title: "Notification",
            element: msg || '',
            disableConfirm: true,
            confirmString: 'ok',
        });
    }, [msg]);


    return (
        <>
            <div className="Body gray"
                data-cy="dashboard-body" >
                <div className="relative w-respXl w-full flex lg:justify-center justify-between items-center">
                    <div className="flex w-full lg:justify-center flex-1 items-center lg:gap-4 pl-1 lg:pl-0 py-2 lg:-ml-16 lg:pr-8 ">
                        <img
                            className="h-12 w-12 mx-2 lg:h-16 lg:w-16 object-cover object-center drop-shadow-[0_0_1px_rgba(0,0,0,0.1)]"
                            src="/image/logo.svg"
                            alt="logo" />
                        <Typography
                            color="blue-gray"
                            className="font-comfortaa text-[1.8rem] lg:text-[2.7rem] font-bold">City'Do
                        </Typography>
                    </div>
                    <div className="z-50 absolute right-3 -top-1.5 w-full h-full items-start flex ">
                        <NotifBadge onBoard />
                    </div>
                </div>
                <main className="relative flex -top-5 -mb-3 h-[calc(100%-3.5rem)]">
                    <div className={" flex-1 h-full flex flex-col lg:grid grid-cols-2 grid-rows-[auto_auto_auto_1fr_1fr_2fr_auto_auto] w-full gap-y-2 lg:gap-y-3 lg:gap-x-4 place-content-start overflow-auto"}>
                        <div className={`${userClasse}`}>
                            <Card className="lg:h-full p-0 flex-1 flex ">
                                <CardHeader className="flex flex-col items-center justify-center  bg-transparent shadow-none">
                                    <Avatar
                                        onError={(e) => e.currentTarget.src = '/image/person.svg'}
                                        src={user?.Profile?.image as string}
                                        alt={user?.Profile?.firstName}
                                        variant="circular"
                                        className="!shadow-md w-16 h-16 lg:w-20 lg:h-20 BgUser" />
                                    <div className="flex flex-col items-center justify-center pt-1">
                                        <Typography
                                            className={'border-b-[1px] px-4 !border-gray-400'}
                                            variant="h6"
                                            color="blue-gray" >
                                            {user?.Profile?.firstName}
                                        </Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className="flex flex-col items-center justify-center px-4 py-0">
                                    <div className="flex gap-2 pt-3 pb-4 justify-center items-center ">
                                        <Icon
                                            link="/myprofile"
                                            icon="person_edit"
                                            color="cyan"
                                            fill bg
                                            size="lg"
                                            title="ouvrir la page profil" />
                                        <Icon
                                            link="/groupe"
                                            icon="groups"
                                            color='green'
                                            fill bg
                                            size="lg"
                                            title="ouvrir la page des groupes" />
                                        <Icon
                                            link={modo ? '/conciliation' : ''}
                                            icon="diversity_3"
                                            color={modo ? 'orange' : 'blue-gray'}
                                            fill bg
                                            size="lg"
                                            title={modo ? "ouvrir la page conciliation" : "vous devez être concialiateur dans un groupe"} />
                                        <Icon
                                            icon={(user?.Profile?.points.toString() ?? '0')}
                                            color="amber"
                                            fill bg
                                            style="!text-[1rem] !pt-1.5 w-8 h-8 !rounded-full !flex items-center justify-center !font-extrabold"
                                            title={` vous avez ${user?.Profile?.points} pts`} />
                                        <LogOutButton />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className={`hidden lg:${notifClasse} h-full lg:grid`}>
                            <Card className=" orange100 ">
                                <CardBody className="h-full flex flex-col pt-2.5 pb-0 px-4">
                                    <div className="flex gap-2.5 py-1 items-center">
                                        <div className="relative">
                                            <Icon
                                                fill bg
                                                icon="notifications"
                                                link="/notification"
                                                size="xl"
                                                color="orange"
                                                title="voir mes notifications" />
                                            <span className={unReadNotMessages < 1 ? "hidden" : " absolute -top-0.5 right-0 w-2.5 h-2.5 rounded-full bg-orange-700 border-2"} />
                                        </div>
                                        <div className="relative">
                                            < Icon
                                                fill bg
                                                icon="forum"
                                                link="/chat"
                                                size="xl"
                                                color="cyan"
                                                title="voir mes messages" />
                                            <span className={unReadMsgNotif < 1 ? "hidden" : " absolute -top-0.5 right-0 w-2.5 h-2.5 rounded-full bg-cyan-700 border-2"} />
                                        </div>
                                        <Typography> {count > 0 ?
                                            <>{count} notifications </> :
                                            'Vous n\'avez pas de notifications'}
                                        </Typography>
                                    </div>
                                    <div className="relative flex flex-col max-h-12 overflow-y-auto"
                                        onScroll={() => handleScroll()}
                                        ref={divRef}>
                                        {!isLoading && (notifs.map((notif: NotifView, index: number) => notif.read === false &&
                                            <div key={index}
                                                className={`${notif.type !== ElementNotif.MESSAGE ? 'hover:bg-orange-500' : 'hover:bg-cyan-500'} font-light text-sm flex mr-9 items-center pl-2 justify-between hover:cursor-pointer hover:bg-opacity-20 rounded-full py-0.5`}
                                                onClick={async () => {
                                                    await readNotif(notif.id);
                                                    await refetch();
                                                    notif.link && navigate(notif.link)
                                                }}>
                                                <p className="line-clamp-1">
                                                    <span
                                                        className={`mr-1 capitalize font-normal ${notif.typeS === 'message' ? 'text-cyan-800' : 'text-orange-800'}`}>
                                                        {notif?.typeS} :&nbsp;
                                                    </span>
                                                    <span className="">
                                                        {notif?.description}
                                                    </span>
                                                </p>
                                                {<Icon
                                                    icon={"close"}
                                                    onClick={async () => {
                                                        await readNotif(notif.id);
                                                        await refetch();
                                                        notif.link && navigate(notif.link)
                                                    }}
                                                    style={'absolute z-40 right-0'}
                                                    size="md"
                                                    title={"fermer " + notif?.title} />}
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
                                            bg
                                            icon="location_on"
                                            link="/service"
                                            size="xl"
                                            color="cyan"
                                            style="hover:!bg-cyan-100 mb-2"
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
                                        {user?.Profile?.Address && notifsMap ?
                                            <AddressMapOpen
                                                message=" 📍 Vous êtes ici "
                                                address={user?.Profile?.Address}
                                                notifs={notifsMap} /> : <>

                                                {isLoadingMap ? <Skeleton /> :
                                                    <Card className="FixCard h-full w-full flex-1 justify-center items-center bg-gray-50">
                                                        <Typography variant="small" className="p-8"> Veuillez renseigner votre adresse pour voir les services à proximité
                                                        </Typography>
                                                    </Card>
                                                }</>}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className={eventClasse}>
                            <Card className="h-full flex-1 gray100 ">
                                <CardBody className="h-full flex flex-col !pt-0 p-4 ">
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