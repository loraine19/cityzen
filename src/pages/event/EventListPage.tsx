import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBarBottom from "../../components/UIX/NavBarBottom";
import { CategoriesSelect } from "../../components/UIX/CategoriesSelect";
import NavBarTop from "../../components/UIX/NavBarTop";
import TabsMenu from "../../components/TabsMenu";
import { EventCard } from "../../components/eventComps/EventCard";
import { label } from "../../types/label";
import SubHeader from "../../components/UIX/SubHeader";
import CalendarCompLarge from "../../components/calendarComps/CalendarCompLarge";
import { eventCategories, getDays, getLabel, getValue } from "../../functions/GetDataFunctions";
import { EventP } from "../../types/class";
import { getEvents, getEventsIgo, getEventsMines, getEventsValidated } from '../../functions/API/eventsApi';

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
    const params = { tab: searchParams.get("search"), category: searchParams.get("category") }
    !eventCategories.some(category => category.value === '') && eventCategories.unshift({ label: 'tous', value: '' })

    const UpdateList = async () => {
        const events = await getEvents();
        const IgoEvents = await getEventsIgo();
        const validatedEvents = await getEventsValidated();
        const myEvents = await getEventsMines();
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
        eventList.length > 0 ? setNotif('') : setNotif(`Aucun évènement ${tabSelected} ${categorySelected !== '' ? getLabel(categorySelected, eventCategories).toLowerCase() : ''} na été trouvé`);
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
                <main className="grid grid-cols-1 md:grid-cols-2 pt-4 w-full gap-4">
                    {eventList.map((event: EventP) => (
                        <EventCard key={event.id} event={event} change={change} mines={mines} update={UpdateList} />
                    ))}
                </main>
            )}
            {view === "event" && <main><CalendarCompLarge eventList={getDays(events)} /></main>}
            <NavBarBottom addBtn={true} />
        </div>
    );
}
