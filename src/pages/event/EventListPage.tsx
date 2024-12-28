// + calendar view
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBarBottom from "../../components/NavBarBottom";
import { CategoriesSelect } from "../../components/CategoriesSelect";
import NavBarTop from "../../components/NavBarTop";
import TabsMenu from "../../components/TabsMenu";
import { EventCard } from "../../components/eventComps/EventCard";
import { eventCategories } from "../../datas/enumsCategories";
import { label } from "../../types/label";
import SubHeader from "../../components/SubHeader";
import CalendarCompLarge from "../../components/calendarComps/CalendarCompLarge";
import { beInElement, deleteElement, getDays, getUsers, imIn } from "../../functions/GetDataFunctions";
import DataContext from "../../contexts/data.context";
import { EventP, Profile, User } from "../../types/class";
import { getUserMe } from "../../functions/API/usersApi";
import { getEvents } from "../../functions/API/eventsApi";

export default function EventListPage() {
    const { data, setDataInLocal } = useContext(DataContext)
    const { flags, profiles } = data
    const [user, setUser] = useState<User>({} as User)
    const [profile, setProfile] = useState<Profile>({} as Profile)
    const [events, setEvents] = useState<EventP[]>([])
    const [eventList, setEventList] = useState<EventP[]>(events);
    const [arrayToFilter, setArrayToFilter] = useState<EventP[]>(events)
    const [participants, setParticipants] = useState<Profile[]>(data.participants)
    const [view, setView] = useState("view_agenda");
    const [tabSelected, setTabSelected] = useState<string>("");
    const [categorySelected, setCategorySelected] = useState<string>(eventCategories[0]);
    const [notif, setNotif] = useState<string>("");
    const [eventsTabled, setEventsTabled] = useState<EventP[]>([]);
    const [mines, setMines] = useState<boolean>(false);
    const activeTab: any = document.querySelector(`li[data-value="${tabSelected}"]`);

    /// insert params queri 
    const [searchParams, setSearchParams] = useSearchParams();
    const params = (searchParams.get("search"))
    useEffect(() => {
        const Tab: any = document.querySelector(`li[data-value="${params}"]`);
        Tab && Tab.click();
    }, [params])



    ///// FETCH ON LOAD 
    useEffect(() => {
        console.log("fetching")
        const fetch = async () => {
            const user = await getUserMe()
            setProfile(user.Profile);
            setUser(user)
            const events = await getEvents()
            setEvents(getDays(events));
            setArrayToFilter(events);
            setEventList(events);
            console.log(events)
        }
        fetch()
    }, []);


    //// Initialise array


    ///// pass to card  
    const isFlaged = (element: any) => { return imIn(element, flags, 1) };
    // const isWithMe = (element: any) => { return imIn(element, participants, user.id, "event_id") };
    // const isWithMe = (element: any): boolean => { return element.Particpants.find((particpant: User) => particpant.id === user.id) ? true : false };
    const isWithMe = (element: any): boolean => { return element.Participants.find((particpant: any) => particpant.userId === user.id) ? true : false };
    const handleGo = (elementLiked: EventP) => {
        beInElement(elementLiked, eventList, setEventList, participants, setParticipants, user.Profile, "event_id");
        setDataInLocal({ ...data, events: eventList, participants: participants })
    };
    const handleClickDelete = (id: number) => {
        deleteElement(id, eventList, setEventList);
        setDataInLocal({ ...data, events: data.events.filter((event: EventP) => event.id !== id) })
        activeTab.click();
    }
    /////FILTER FUNCTIONS
    const filterEvents = (newArray: EventP[], value: string) => {
        console.log("filterEvents", newArray)
        value !== tabSelected && setCategorySelected(eventCategories[0]);
        setEventsTabled(newArray);
        setEventList(newArray);
        setTabSelected(value);
        value === "mines" ? setMines(true) : setMines(false);
        setSearchParams({ search: value });
    };

    const eventTabs: label[] = [
        {
            label: "tous",
            value: "",
            result: () => filterEvents([...arrayToFilter], eventTabs[0].value),
        },
        {
            label: "validé",
            value: "ok",
            result: () => filterEvents([...arrayToFilter.filter((event) => event.participantsMin <= event.Participants.length)], eventTabs[1].value),

        },
        {
            label: "j'y vais",
            value: "igo",
            result: () => filterEvents([...arrayToFilter.filter((event: EventP) => event.Participants.find((participant: any) => participant.userId === user.id))], eventTabs[2].value)
        },
        {
            label: "j'organise",
            value: "mines",
            result: () => filterEvents([...arrayToFilter.filter((event) => event.userId === user.id)], eventTabs[3].value)
        },
    ];

    /// FILTER ON SELECT 
    const change = (e: string | React.ChangeEvent<HTMLSelectElement>) => {
        eventTabs.find((tab: label) => tab.value === tabSelected)?.result();
        typeof e !== "object"
            ? (e = e.toLowerCase())
            : (e = e.target.innerText.toLowerCase());
        setCategorySelected(e);
        e === eventCategories[0] ?
            setEventList([...eventsTabled]) :
            setEventList([...eventsTabled.filter((event: EventP) => event.category.toString().toLowerCase() === e),
            ]);
        setSearchParams({ search: tabSelected, category: e });
    };

    //// CALENDAR VIEW FUNCTIONS
    const switchClick = () => {
        view === "view_agenda" ? setView("event") : setView("view_agenda");
        setCategorySelected(eventCategories[0]);
        filterEvents([...arrayToFilter], eventTabs[0].value);
    };

    //// USE EFFECT avoid to many render
    useEffect(() => {
        eventList.length > 0 ? setNotif("") : setNotif(
            `Aucun évènement ${tabSelected} ${categorySelected != eventCategories[0] && categorySelected
                ? categorySelected : ""
            } na été trouvé`
        );
    }, [eventList]);



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
                        eventList.map((event: EventP, index: number) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                avatarDatas={event.Participants}
                                change={change}
                                mines={mines}
                                handleClickDelete={(id: number) => handleClickDelete(id)}
                                index={index}
                                // isFlaged={isFlaged(eventC)}
                                isWithMe={isWithMe(event)}
                                handleGo={(event: EventP) => handleGo(event)}
                            />
                        ))}
                </main>
            )}
            {view === "event" && (
                <main>{<CalendarCompLarge eventList={eventList} />}</main>
            )}
            <NavBarBottom addBtn={true} />
        </div>
    );
}
