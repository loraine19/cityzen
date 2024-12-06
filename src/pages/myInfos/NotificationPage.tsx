// + calendar view
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user.context";
import { deleteElementJoin, getNotifications } from "../../functions/GetDataFunctions";
import { label } from "../../types/label";
import { notif } from "../../types/type";
import NavBarBottom from "../../components/NavBarBottom";
import NavBarTop from "../../components/NavBarTop";
import SubHeader from "../../components/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import { NotifCard } from "../../components/NotifCard";
import { notifCategories } from "../../datas/enumsCategories";
import DataContext from "../../contexts/data.context";
import { Post, Survey, Pool, Service } from "../../types/class";

export default function NotificationPage() {
    const { user, setUserNotif } = useContext(UserContext)
    const idS = user.id ? user.id : 0
    const { data } = useContext(DataContext)
    const posts: Post[] = data.posts
    const events: Event[] = data.events
    const surveys: Survey[] = data.surveys
    const pools: Pool[] = data.pools
    const services: Service[] = data.services
    const notificationList = getNotifications(posts, events, surveys, pools, services, idS);
    const [notifList, setNotifList] = useState<any[]>(notificationList ? notificationList : []);
    const [arrayToFilter] = useState<any>(notificationList);
    const [tabSelected, setTabSelected] = useState<string>('Tous');
    const [categorySelected, setCategorySelected] = useState<string>(notifCategories[0]);
    const [notifFind, setNotifFind] = useState<string>('');
    const handleDelete = (notif: notif) => { deleteElementJoin(notif, notifList, setNotifList) }

    /////FILTER FUNCTIONS
    const filterNotifs = (newArray: any[], value: string) => {
        value !== tabSelected && setCategorySelected(notifCategories[0]);
        setNotifList(newArray);
        setTabSelected(value);
    }

    const notifTabs: label[] = [{
        label: "tous",
        value: "",
        result: () => { filterNotifs([...arrayToFilter], notifTabs[0].value) }
    },
    {
        label: "services",
        value: "services",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.type === "service")], notifTabs[1].value) }
    },
    {
        label: "évenements",
        value: "évenements",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.type === "event")], notifTabs[2].value) }
    },
    {
        label: "annonces",
        value: "annonces",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.type === "post")], notifTabs[3].value) }
    },
    {
        label: "sondages",
        value: "sondages",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.type === "survey")], notifTabs[4].value) }
    }, {
        label: "cagnottes",
        value: "cagnottes",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.type === "pool")], notifTabs[5].value) }
    }]

    //// USE EFFECT 
    useEffect(() => {
        notifList.length > 0 ? setNotifFind('') : setNotifFind(`Aucun Notification ${tabSelected} ${categorySelected != notifCategories[0] && categorySelected ? categorySelected : ""} na été trouvé`);
        setUserNotif(notifList.length)
    }, [notifList])


    return (
        <div className="Body gray">
            <header className=" px-4">
                <NavBarTop />
                <div className="flex ">
                    <SubHeader qty={notifList.length} type={"Notifications " + `${categorySelected != notifCategories[0] ? categorySelected : ""} `} /></div>
                <div className="max-w-[100vw] overflow-auto flex px-2 !py-0">
                    <TabsMenu labels={notifTabs} subMenu={false} />
                </div>

                <div className={notifFind && "w-full flex justify-center p-8"}>{notifFind}</div>
            </header>

            <main className="Grid !content-start !gap-3           ">
                {notifList.map((notif: notif, index: number) =>
                    <NotifCard key={index} notif={notif} handleClick={(notif: notif) => handleDelete(notif)} />)}
            </main>
            <NavBarBottom />

        </div >
    )

}