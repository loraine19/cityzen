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
import { getDays } from "../../functions/GetDataFunctions";
import { eventCategory, EventP } from "../../types/class";
import { getEvents, getEventsIgo, getEventsMines, getEventsValidated } from '../../functions/API/eventsApi';

export default function EventListPage() {
    //// CONTEXT AND STATE DECLARATIONS
    const [events, setEvents] = useState<EventP[]>([])
    const [eventList, setEventList] = useState<EventP[]>(events);
    const [myEvents, setMyEvents] = useState<EventP[]>([])
    const [IgoEvents, setIgoEvents] = useState<EventP[]>([])
    const [validatedEvents, setValidatedEvents] = useState<EventP[]>([])
    const [arrayToFilter, setArrayToFilter] = useState<EventP[]>(events)
    const [view, setView] = useState("view_agenda");
    const [notif, setNotif] = useState<string>("");
    const [eventsTabled, setEventsTabled] = useState<EventP[]>([]);
    const [mines, setMines] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<string>("");
    const [activeTab] = useState<any>(document.querySelector(`li[data-value="${tabSelected}"]`))
    const eventCategories = (eventCategory.filter((category) => typeof category === "string").map((category) => category.toString().toLowerCase()));
    eventCategories.unshift("tous");
    const [categorySelected, setCategorySelected] = useState<string>(eventCategories[0]);

    //// INSERT PARAMS QUERY
    const [searchParams, setSearchParams] = useSearchParams();
    const params = (searchParams.get("search"))
    useEffect(() => {
        const Tab: any = document.querySelector(`li[data-value="${params}"]`);
        Tab && Tab.click();
    }, [params])

    //// UPDATE EVENT LIST FUNCTION
    const UpdateList = async () => {
        const events = await getEvents()
        const IgoEvents = await getEventsIgo()
        const validatedEvents = await getEventsValidated()
        const myEvents = await getEventsMines()
        setEvents(getDays(events));
        setArrayToFilter(events);
        setMyEvents(myEvents);
        setIgoEvents(IgoEvents);
        setValidatedEvents(validatedEvents);
        switch (tabSelected) {
            case "mines": setEventList(myEvents);
                break;
            case "igo": setEventList(IgoEvents);
                break;
            case "ok": setEventList(validatedEvents);
                break;
            default: setEventList(events);
                break;
        }
    }

    //// FETCH ON LOAD 
    useEffect(() => {
        const Tab: any = document.querySelector(`li[data-value="${params}"]`);
        const fetch = async () => {
            await UpdateList()
        }
        fetch().then(() => Tab && Tab.click())
    }, []);


    //// HANDLE CLICK DELETE FUNCTION
    const update = async () => { activeTab && activeTab.click(); await UpdateList() }

    //// FILTER FUNCTIONS
    const filterEvents = async (newArray: EventP[], value: string) => {
        if (value !== tabSelected) { setCategorySelected(eventCategories[0]); await UpdateList() }
        setEventsTabled(newArray);
        setEventList(newArray);
        setTabSelected(value);
        value === "mines" ? setMines(true) : setMines(false);
        setSearchParams({ search: value });
    };

    //// EVENT TABS
    const eventTabs: label[] = [
        {
            label: "tous",
            value: "",
            result: () => filterEvents([...arrayToFilter], eventTabs[0].value),
        },
        {
            label: "validé",
            value: "ok",
            result: () => filterEvents([...validatedEvents], eventTabs[1].value),

        },
        {
            label: "j'y vais",
            value: "igo",
            result: () => filterEvents([...IgoEvents], eventTabs[2].value)
        },
        {
            label: "j'organise",
            value: "mines",
            result: () => filterEvents([...myEvents], eventTabs[3].value)
        },
    ];

    //// FILTER ON SELECT 
    const change = (e: string | React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTab = eventTabs.find((tab: label) => tab.value === tabSelected);
        selectedTab?.result();
        const selectedCategory = typeof e !== "object" ? e.toLowerCase() : e.target.innerText.toLowerCase();
        setCategorySelected(selectedCategory);
        const filteredEvents = selectedCategory === eventCategories[0]
            ? eventsTabled
            : eventsTabled.filter((event: EventP) => event.category.toString().toLowerCase() === selectedCategory);
        setEventList(filteredEvents);
        setSearchParams({ search: tabSelected, category: selectedCategory });
    };

    //// CALENDAR VIEW FUNCTIONS
    const switchClick = () => {
        view === "view_agenda" ? setView("event") : setView("view_agenda");
        setCategorySelected(eventCategories[0]);
        filterEvents([...arrayToFilter], eventTabs[0].value);
    };

    //// USE EFFECT AVOID TOO MANY RENDERS
    useEffect(() => {
        eventList.length > 0 ? setNotif("") : setNotif(
            `Aucun évènement ${tabSelected} ${categorySelected != eventCategories[0] && categorySelected
                ? categorySelected : ""
            } na été trouvé`
        );
    }, [eventList]);

    //// RETURN JSX
    return (
        <div className="Body cyan">
            <header className=" px-4">
                <NavBarTop />
                <SubHeader
                    qty={eventList.length}
                    type={
                        "évènements " +
                        `${categorySelected != eventCategories[0] ? categorySelected : ""} `
                    }
                />
                <div className={view === "view_agenda" ? `flex flex-col` : `hidden`}>
                    <TabsMenu labels={eventTabs} subMenu={false} />
                </div>

                <div className={`flex items-center justify-center gap-4 lg:px-8`} >
                    <CategoriesSelect
                        categoriesArray={eventCategories}
                        change={change}
                        categorySelected={categorySelected}
                        disabled={view === "event" ? true : false}
                    />
                    <button onClick={switchClick}>
                        <span className="material-symbols-outlined text-gray-700 !text-4xl flex unFillThin items-center">
                            {view === "view_agenda" ? "calendar_month" : "list"}
                        </span>
                    </button>
                </div>
                <div className={notif && "w-full flex justify-center p-8"}>
                    {notif}
                </div>
            </header>

            {view === "view_agenda" && (
                <main className="grid grid-cols-1 md:grid-cols-2 pt-4 w-full gap-4">
                    {view === "view_agenda" &&
                        eventList.map((event: EventP) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                change={change}
                                mines={mines}
                                update={update}
                            />
                        ))}
                </main>
            )}
            {view === "event" && (
                <main>{<CalendarCompLarge eventList={getDays(events)} />}</main>
            )}
            <NavBarBottom addBtn={true} />
        </div>
    );
}
