import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import { EventP } from "../../../domain/entities/Events";
import { EventService } from "../../../domain/repositories/EventRepository";
import { eventCategories, getValue, getLabel, getDays } from "../../../utils/GetDataFunctions";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import CalendarCompLarge from "../dashboard/CalendarComp";
import { EventCard } from "./eventComps/EventCard";


export default function EventListPage() {
    const [events, setEvents] = useState<EventP[]>([]);
    const [eventList, setEventList] = useState<EventP[]>([]);
    const [tabledList, setTabledList] = useState<EventP[]>([]);
    const [myEvents, setMyEvents] = useState<EventP[]>([]);
    const [IgoEvents, setIgoEvents] = useState<EventP[]>([]);
    const [validatedEvents, setValidatedEvents] = useState<EventP[]>([]);
    const [view, setView] = useState("view_agenda");
    const [notif, setNotif] = useState<string>("");
    const [mines, setMines] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<string>("");
    const [categorySelected, setCategorySelected] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const params = { tab: searchParams.get("search"), category: searchParams.get("category") }
    !eventCategories.some(category => category.value === '') && eventCategories.unshift({ label: 'tous', value: '' })
    const { getEvents, getEventsIgo, getEventsValidated, getEventsMines } = new EventService();
    type label = any;

    const UpdateList = async () => {
        const events = await getEvents();
        console.log(events)
        const IgoEvents = await getEventsIgo();
        const validatedEvents = await getEventsValidated();
        const myEvents = await getEventsMines();
        events.length > 0 && setLoading(false);
        setEvents(events);
        setMyEvents(myEvents);
        setIgoEvents(IgoEvents);
        setValidatedEvents(validatedEvents);
        switch (tabSelected) {
            case "myevents": setEventList(myEvents); break;
            case "igo": setEventList(IgoEvents); break;
            case "ok": setEventList(validatedEvents); break;
            default: setEventList(events); break;
        }
    }

    useEffect(() => {
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${params.tab}"]`)
        const fetch = async () => await UpdateList();
        fetch().then(() => Tab && Tab.click())
    }, []);

    const filterTab = async (newArray: EventP[], value: string) => {
        if (value !== tabSelected) { setCategorySelected(''); await UpdateList(); }
        setEventList(newArray)
        setTabledList(newArray)
        setTabSelected(value)
        value === "myevents" ? setMines(true) : setMines(false);
        setSearchParams({ search: value, category: categorySelected });
    };

    const eventTabs: label[] = [
        { label: "tous", value: "", result: () => filterTab([...events], "") },
        { label: "validé", value: "ok", result: () => filterTab([...validatedEvents], "ok") },
        { label: "j'y vais", value: "igo", result: () => filterTab([...IgoEvents], "igo") },
        { label: "j'organise", value: "myevents", result: () => filterTab([...myEvents], "myevents") },
    ];

    const change = (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedTab = eventTabs.find((tab: label) => tab.value === tabSelected);
        selectedTab?.result();
        const selectedCategory = typeof e !== "object" ? e.toLowerCase() : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        const filteredArray = selectedCategory === ''
            ? tabledList
            : tabledList.filter((event: EventP) => event.category.toString().toLowerCase() === selectedCategory);
        setEventList(filteredArray);
        setCategorySelected(selectedCategory.toUpperCase());
        setSearchParams({ search: tabSelected, category: selectedCategory });
    };

    useEffect(() => {
        eventList.length < 0 && !loading && setNotif(`Aucun évènement ${tabSelected} ${categorySelected !== '' ? getLabel(categorySelected, eventCategories).toLowerCase() : ''} na été trouvé`);
    }, [eventList])


    const switchClick = () => {
        setView(view === "view_agenda" ? "event" : "view_agenda");
        setCategorySelected(eventCategories[0].label);
        filterTab([...events], "");
    };

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader qty={eventList.length} type={`évènements ${categorySelected !== '' ? getLabel(categorySelected, eventCategories).toLowerCase() : ""}`} />
                <div className={view === "view_agenda" ? `flex flex-col` : `hidden`}>
                    <TabsMenu labels={eventTabs} subMenu={false} />
                </div>
                <div className={`flex items-center justify-center gap-4 lg:px-8`}>
                    <CategoriesSelect categoriesArray={eventCategories} change={change} categorySelected={categorySelected} disabled={view === "event"} />
                    <button onClick={switchClick}>
                        <span className="material-symbols-outlined text-gray-700 !text-4xl flex unFillThin items-center">
                            {view === "view_agenda" ? "calendar_month" : "list"}
                        </span>
                    </button>
                </div>
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>
            {view === "view_agenda" && (
                <main className="grid grid-cols-1 md:grid-cols-2 pt-2 w-full gap-3">
                    {loading ?
                        Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} count={10} height={300} className="my-2.5 !rounded-xl shadow-lg" />))
                        :
                        eventList.map((event: EventP, index: number) => (
                            <div className="pt-7 max-w-[calc(100vw-1rem)] mx-2" key={index}>
                                <EventCard key={event.id} event={event} change={change} mines={mines} update={UpdateList} />
                            </div>
                        ))
                    }
                </main>
            )}
            {view === "event" && <main><CalendarCompLarge eventList={getDays(events)} /></main>}
            <NavBarBottom addBtn={true} />
        </div>
    );
}
