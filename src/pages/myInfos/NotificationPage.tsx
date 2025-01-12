// + calendar view
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user.context";
import { label } from "../../types/label";
import { notif } from "../../types/type";
import NavBarBottom from "../../components/UIX/NavBarBottom";
import NavBarTop from "../../components/UIX/NavBarTop";
import SubHeader from "../../components/UIX/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import { NotifCard } from "../../components/NotifCard";
import { notifCategories } from "../../datas/enumsCategories";
import Skeleton from "react-loading-skeleton";
import { ElementNotif, Notif } from "../../types/class";

export default function NotificationPage() {
    const { setUserNotif, notifList, setNotifList, updateNotifs, userNotif } = useContext(UserContext)
    const [arrayToFilter, setArrayToFilter] = useState<any>(notifList);
    const [tabSelected, setTabSelected] = useState<string>('Tous');
    const [categorySelected, setCategorySelected] = useState<string>(notifCategories[0]);
    const [notifFind, setNotifFind] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const removeNotification = async (notifId: number, element: ElementNotif) => {
        const updatedNotifList = notifList.map((notif) => (notif.id !== notifId && notif.element !== element) ? notif : { ...notif, read: true });
        setArrayToFilter(updatedNotifList);
        setUserNotif(userNotif - 1);
        localStorage.setItem('notifList', JSON.stringify(updatedNotifList));
        updateNotifs();
    }

    useEffect(() => {
        updateNotifs();
        setNotifList(notifList);
        setArrayToFilter(notifList);
        notifList.length > 0 && setLoading(false);
    }, []);


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
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.element === ElementNotif.SERVICE)], notifTabs[1].value) }
    },
    {
        label: "évenements",
        value: "évenements",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.element === ElementNotif.EVENT)], notifTabs[2].value) }
    },
    {
        label: "annonces",
        value: "annonces",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.element === ElementNotif.POST)], notifTabs[3].value) }
    },
    {
        label: "sondages",
        value: "sondages",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.element === ElementNotif.SURVEY)], notifTabs[4].value) }
    }, {
        label: "cagnottes",
        value: "cagnottes",
        result: () => { filterNotifs([...arrayToFilter.filter((notif: notif) => notif.element === ElementNotif.POOL)], notifTabs[5].value) }
    }]

    //// USE EFFECT 
    useEffect(() => {
        userNotif > 0 ? setNotifFind('') : setNotifFind(`Aucun Notification ${tabSelected} ${categorySelected != notifCategories[0] && categorySelected ? categorySelected : ""} na été trouvé`);
    }, [notifList])


    return (
        <div className="Body gray">
            <header className=" px-4">
                <NavBarTop />
                <div className="flex ">
                    <SubHeader qty={userNotif} type={"Notifications " + `${categorySelected != notifCategories[0] ? categorySelected : ""} `} /></div>
                <div className="max-w-[100vw] overflow-auto flex px-2 !py-0">
                    <TabsMenu labels={notifTabs} subMenu={false} />
                </div>

                <div className={notifFind && "w-full flex justify-center p-8"}>{notifFind}</div>
            </header>

            <main className="Grid !content-start !gap-3
            ">
                {loading ? Array.from({ length: userNotif }).map((_, index) =>
                    <Skeleton key={index} height={130} className="!rounded-2xl" />) :
                    notifList.map((notif: Notif, index: number) => notif.read === false &&
                        <NotifCard key={index} notif={notif} handleClick={(notif: Notif) => removeNotification(notif.id, notif.element)} />)}
            </main>
            <NavBarBottom />

        </div >
    )

}