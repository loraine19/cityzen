import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import { EventView } from "../../../../domain/entities/Event";
import { eventCategories, getValue, getLabel } from "../../../../infrastructure/services/utilsService";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import CalendarComp from "../../common/CalendarComp";
import { EventCard } from "./eventComps/EventCard";
import DI from "../../../../di/ioc";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { Icon } from "../../common/SmallComps";

export default function EventListPage() {
    const { events, eventsMines, eventsIgo, loadingEvents, loadingEventsMines, loadingEventsIgo, loadingEventsValidated, eventsValidated } = DI.resolve('eventViewModel');
    const [eventList, setEventList] = useState<EventView[]>(!loadingEvents ? events : []);
    const [tabledList, setTabledList] = useState<EventView[]>([]);
    const [view, setView] = useState("view_agenda");
    const [notif, setNotif] = useState<string>("");
    const [mines, setMines] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<string>("");
    const [categorySelected, setCategorySelected] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const params = { tab: searchParams.get("search"), category: searchParams.get("category") }
    const [loading, setLoading] = useState<boolean>(false);
    !eventCategories.some(category => category.value === '') && eventCategories.unshift({ label: 'tous', value: '' })
    type label = TabLabel;

    const UpdateList = () => {
        switch (tabSelected) {
            case "myevents": setEventList(events); break;
            case "igo": setEventList(eventsIgo); break;
            case "ok": setEventList(eventsValidated); break;
            default: setEventList(events); break;
        }
    }
    useEffect(() => {
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${params.tab}"]`)
        UpdateList();
        Tab && Tab.click()
    }, [loadingEvents]);

    const filterTab = async (newArray: EventView[], value: string) => {
        if (value !== tabSelected) { setCategorySelected(''); UpdateList(); }
        setEventList(newArray)
        setTabledList(newArray)
        setTabSelected(value)
        value === "myevents" ? setMines(true) : setMines(false);
        setSearchParams({ search: value, category: categorySelected });
    };

    const eventTabs: label[] = [
        { label: "tous", value: "", result: () => filterTab([...events], "") },
        { label: "validé", value: "ok", result: () => filterTab([...eventsValidated], "ok") },
        { label: "j'y vais", value: "igo", result: () => filterTab([...eventsIgo], "igo") },
        { label: "j'organise", value: "myevents", result: () => filterTab([...eventsMines], "myevents") },
    ];

    const change = (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedTab = eventTabs.find((tab: label) => tab.value === tabSelected);
        selectedTab?.result();
        const selectedCategory = typeof e !== "object" ? e.toLowerCase() : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        const filteredArray = selectedCategory === ''
            ? tabledList
            : tabledList.filter((event: EventView) => event.category.toString().toLowerCase() === selectedCategory);
        setEventList(filteredArray);
        setCategorySelected(selectedCategory.toUpperCase());
        setSearchParams({ search: tabSelected, category: selectedCategory });
    };

    ///USE EFFECTS

    useEffect(() => {
        !eventList && setEventList(events);
        eventList.length === 0 ? setNotif(`Aucun évènement ${tabSelected} ${categorySelected !== '' ? getLabel(categorySelected, eventCategories).toLowerCase() : ''} na été trouvé`) : '';
    }, [eventList])


    useEffect(() => {
        setLoading(loadingEvents || loadingEventsMines || loadingEventsIgo || loadingEventsValidated);
        !eventList && setEventList(events);
    }, [loadingEvents, loadingEventsMines, loadingEventsIgo, loadingEventsValidated])


    const switchClick = () => {
        setView(view === "view_agenda" ? "event" : "view_agenda");
        setCategorySelected(eventCategories[0].label);
        filterTab([...events], "");
    };


    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader qty={eventList?.length || 0} type={`évènements ${categorySelected !== '' ? getLabel(categorySelected, eventCategories).toLowerCase() : ""}`} />
                {view === "view_agenda" && <TabsMenu labels={eventTabs} />}
                <div className={`flex items-center justify-center gap-4 lg:px-8`}>
                    <CategoriesSelect categoriesArray={eventCategories} change={change} categorySelected={categorySelected} disabled={view === "event"} />
                    <Icon onClick={switchClick} icon={view === "view_agenda" ? "calendar_month" : "list"} size="4xl" color="gray" title={view === "view_agenda" ? "voir en mode calendrier" : "voir en mode liste"} />
                </div>
                {view === "view_agenda" && !eventList && <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>}
            </header>
            {view === "view_agenda" && (
                <main className="grid grid-cols-1 md:grid-cols-2 pt-2 w-full gap-3">
                    {loading || !eventList ?
                        Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} count={10} height={300} className="my-2.5 !rounded-xl shadow-lg" />))
                        :
                        eventList.map((event: EventView, index: number) => (
                            <div className="pt-7 max-w-[calc(100vw-1rem)] mx-2" key={index}>
                                <EventCard key={event.id} event={event} change={change} mines={mines} update={UpdateList} />
                            </div>
                        ))
                    }
                </main>
            )}
            {view === "event" && !loading &&
                <main>
                    <CalendarComp />
                </main>}
            <NavBarBottom addBtn={true} />
        </div>
    );
}
