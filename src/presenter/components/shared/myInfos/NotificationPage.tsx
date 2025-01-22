import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { NotifView } from "../../../../domain/entities/Notif";
import { notifCategories } from "../../../../infrastructure/services/utilsService";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import { NotifCard } from "./NotifCard";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { useNotificationStore } from "../../../../application/stores/notificationStore";

export default function NotificationPage() {
    const { notifList, updateNotif, removeNotif } = useNotificationStore()
    const [list, setList] = useState<NotifView[]>(notifList)
    const [arrayToFilter] = useState<any>(notifList);
    const [tabSelected, setTabSelected] = useState<string>('Tous');
    const [categorySelected, setCategorySelected] = useState<string>(notifCategories[0].value);
    const [notifFind, setNotifFind] = useState<string>('');
    const [loading] = useState<boolean>(false);



    useEffect(() => { console.log(notifList); setList(notifList) }, [notifList])
    /////FILTER FUNCTIONS
    const filterNotifs = (newArray: any[], value: string) => {
        value !== tabSelected && setCategorySelected(notifCategories[0].value);
        setList(newArray);
        setTabSelected(value);
    }

    const notifTabs: TabLabel[] = [{
        label: "tous",
        value: "",
        result: () => { filterNotifs([...arrayToFilter], notifTabs[0].value) }
    },
    {
        label: "service",
        value: "service",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: NotifView) => notif.elementType === 'service')], notifTabs[1].value) }
    },
    {
        label: "évenement",
        value: "évenement",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: NotifView) => notif.elementType === 'evenement')], notifTabs[2].value) }
    },
    {
        label: "annonce",
        value: "annonce",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: NotifView) => notif.elementType === 'annonce')], notifTabs[3].value) }
    },
    {
        label: "sondage",
        value: "sondage",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: NotifView) => notif.elementType === 'sondage')], notifTabs[4].value) }
    }, {
        label: "cagnotte",
        value: "cagnotte",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: NotifView) => notif.elementType === 'cagnotte')], notifTabs[5].value) }
    }]

    //// USE EFFECT 
    useEffect(() => {
        notifList.length > 0 ? setNotifFind('') : setNotifFind(`Aucun Notification ${tabSelected} ${categorySelected != notifCategories[0].value && categorySelected ? categorySelected : ""} na été trouvé`);
    }, [notifList])


    return (
        <div className="Body gray">
            <header className=" px-4">
                <NavBarTop />
                <div className="flex ">
                    <SubHeader qty={notifList.length} type={"Notifications " + `${categorySelected != notifCategories[0].value ? categorySelected : ""} `} closeBtn link={'/'} /></div>
                <div className="max-w-[100vw] overflow-auto flex px-2 !py-0">
                    <TabsMenu labels={notifTabs} />
                </div>

                <div className={notifFind && "w-full flex justify-center p-8"}>{notifFind}</div>
            </header>

            <main className="Grid !content-start !gap-3
            ">
                {loading ? Array.from({ length: 10 }).map((_, index) =>
                    <Skeleton key={index} height={130} className="!rounded-2xl" />) :
                    list?.map((notif: NotifView, index: number) => notif.read === false &&
                        <NotifCard key={index} notif={notif} handleClick={(notif: NotifView) => {
                            removeNotif(notif.id); updateNotif(list)
                        }} />)}
            </main>
            <NavBarBottom />

        </div >
    )

}