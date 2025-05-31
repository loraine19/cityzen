import { useEffect, useRef, useState } from "react";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import { NotifCard } from "./NotifCard";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import DI from "../../../../di/ioc";
import { useSearchParams } from "react-router-dom";
import { ElementNotif } from "../../../../domain/entities/Notif";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { PathElement } from "../../../constants";
import { ReadAllButton } from "../../common/ReadAllBtn";
import { useNotificationStore } from "../../../../application/stores/notification.store";
import { Icon } from "../../common/IconComp";

export default function NotificationPage() {
    const [notifFind, setNotifFind] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { notifs, isLoading, refetch, count, fetchNextPage, hasNextPage } = notifViewModelFactory(filter)

    const { setUnReadNotif } = useNotificationStore()

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter") }
    useEffect(() => { setFilter(params.filter || '') }, [])


    //// FILTER TAB
    const notifTabs: TabLabel[] = [{
        label: "tous", value: "", result: () => filterTab()
    },
    {
        label: "message",
        value: ElementNotif.MESSAGE, result: () => filterTab(ElementNotif.MESSAGE)
    },
    {
        label: "service",
        value: ElementNotif.SERVICE, result: () => filterTab(ElementNotif.SERVICE)
    },
    {
        label: 'Conciliation',
        value: ElementNotif.ISSUE, result: () => filterTab(ElementNotif.ISSUE)
    },
    {
        label: "évenement",
        value: ElementNotif.EVENT, result: () => filterTab(ElementNotif.EVENT)
    },
    {
        label: 'Participation',
        value: ElementNotif.PARTICIPANT, result: () => filterTab(ElementNotif.PARTICIPANT)
    },
    {
        label: "annonce",
        value: ElementNotif.POST, result: () => filterTab(ElementNotif.POST)
    },
    {
        label: "like",
        value: ElementNotif.LIKE, result: () => filterTab(ElementNotif.LIKE)
    },
    {
        label: "sondage",
        value: ElementNotif.SURVEY, result: () => filterTab(ElementNotif.SURVEY)
    }, {
        label: "cagnotte",
        value: ElementNotif.POOL, result: () => filterTab(ElementNotif.POOL)
    },
    {
        label: "vote",
        value: ElementNotif.VOTE, result: () => filterTab(ElementNotif.VOTE)
    },
    {
        label: "signalement",
        value: ElementNotif.FLAG, result: () => filterTab(ElementNotif.FLAG)
    }]

    const filterTab = async (value?: ElementNotif) => {
        setParams({ filter: String(value) || '' });
        setFilter(value ? String(value) : '');
        setParams({ filter: (value as unknown as string) || '' })
        await refetch();
    };


    //// NOTIFICATION
    useEffect(() => {
        count > 0 ?
            setNotifFind('') :
            setNotifFind(`Aucun Notification ${PathElement[filter as keyof typeof PathElement] ?? ""} na été trouvé`);
    }, [notifs, count, isLoading, filter])


    //// HANDLE SCROLL
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(true);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) fetchNextPage()
            } else setIsBottom(false)
        }
    }

    return (
        <div className="Body gray">
            <header className=" px-4">
                <NavBarTop />
                <div className="flex ">
                    <SubHeader
                        qty={count}
                        type={"Notifications " + `${PathElement[filter as keyof typeof PathElement] ?? ""} `}
                        closeBtn
                        link={'/'} />
                </div>
                <div className="relative max-w-[100vw] overflow-auto flex pl-1 !py-0 pr-10">
                    <TabsMenu
                        labels={notifTabs} />
                    <ReadAllButton
                        update={refetch} />
                </div>
                {notifFind &&
                    <div className={'notif'}>
                        {notifFind}
                        <Icon
                            title="Recharger la liste"
                            bg={!isLoading}
                            icon={isLoading ? '...' : 'reload'}
                            onClick={() => refetch()} />
                    </div>}
            </header>

            <main
                ref={divRef}
                onScroll={handleScroll}
                className="GridSmall ">
                {isLoading ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4}
                            small={true} />
                    )) :
                    notifs?.map((notif: NotifView, index: number) => notif.read === false &&
                        <div className="SubGrid" key={'div' + index}>
                            <NotifCard
                                key={index}
                                notif={notif}
                                handleClick={async (notif: NotifView) => {
                                    readNotif(notif.id)
                                    setUnReadNotif(count - 1);
                                    await refetch();
                                }} />
                        </div>)}
                <LoadMoreButton
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={handleScroll} />
            </main>
            <NavBarBottom />
        </div >
    )

}