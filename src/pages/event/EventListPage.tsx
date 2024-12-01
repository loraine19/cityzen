// + calendar view
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarBottom from "../../components/NavBarBottom";
import { CategoriesSelect } from "../../components/CategoriesSelect";
import NavBarTop from "../../components/NavBarTop";
import TabsMenu from "../../components/TabsMenu";
import { EventCard } from "../../components/eventComps/EventCard";
import { eventCategories } from "../../datas/enumsCategories";
import { eventsFaker } from "../../datas/fakers/eventsFaker";
import { label } from "../../types/label";
import { event } from "../../types/type";
import SubHeader from "../../components/SubHeader";
import CalendarCompLarge from "../../components/calendarComps/CalendarCompLarge";
import eventUsersFaker from "../../datas/fakers/eventUsers";
import { usersFaker } from "../../datas/fakers/usersFaker";
import { beInElement, deleteElement, getDays, getUsers, imIn } from "../../functions/GetDataFunctions";
import UserContext from "../../contexts/user.context";
import { userProfile } from "../../types/user";
import flagsFaker from "../../datas/fakers/flagsFaker";

export default function EventListPage() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [view, setView] = useState("view_agenda");
    const [tabSelected, setTabSelected] = useState<string>("");
    const [categorySelected, setCategorySelected] = useState<string>(eventCategories[0]);
    const [notif, setNotif] = useState<string>("");
    const [eventsTabled, setEventsTabled] = useState<event[]>([]);
    const [mines, setMines] = useState<boolean>(false);

    //// Initialise array
    const eventsWithUsers = getDays(getUsers(eventsFaker, eventUsersFaker as [], usersFaker as [], "event_id"));
    const arrayToFilter: event[] = eventsWithUsers;
    const [eventList, setEventList] = useState<event[]>(eventsWithUsers);

    ///// pass to card  
    const isFlaged = (element: any) => { return imIn(element, flagsFaker, user.id) };
    const isWithMe = (element: any) => { return imIn(element, eventUsersFaker, user.id, "event_id") };
    const handleGo = (elementLiked: event) => { beInElement(elementLiked, eventList, setEventList, eventUsersFaker, user, "event_id") }
    const handleClickDelete = (id: number) => deleteElement(id, eventList, setEventList);
    const handleClick = () => navigate("/evenement/create");

    /////FILTER FUNCTIONS
    const filterEvents = (newArray: event[], value: string) => {
        value !== tabSelected && setCategorySelected(eventCategories[0]);
        setEventsTabled(newArray);
        setEventList(newArray);
        setTabSelected(value);
        value === "j'organise" ? setMines(true) : setMines(false);
    };

    const eventTabs: label[] = [
        {
            label: "tous",
            value: "",
            result: () => filterEvents([...arrayToFilter], eventTabs[0].value),
        },
        {
            label: "validé",
            value: "validé",
            result: () => filterEvents([...arrayToFilter.filter((event) => event.participants <= event.users.length)], eventTabs[1].value),

        },
        {
            label: "j'y vais",
            value: "j'y vais",
            result: () => filterEvents([...arrayToFilter.filter((event: event) => event.users.find((userE: userProfile) => userE === user))], eventTabs[2].value)
        },
        {
            label: "j'organise",
            value: "j'organise",
            result: () => filterEvents([...arrayToFilter.filter((event) => event.user_id === user.id)], eventTabs[3].value)
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
            setEventList([...eventsTabled.filter((event: event) => event.category.toLowerCase() === e),
            ]);
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
                <main className="Grid">
                    {view === "view_agenda" &&
                        eventList.map((eventC: event, index: number) => (
                            <EventCard
                                key={eventC.id}
                                event={eventC}
                                avatarDatas={eventC.users}
                                change={change}
                                mines={mines}
                                handleClickDelete={(index: number) => handleClickDelete(index)}
                                index={index}
                                isFlaged={isFlaged(eventC)}
                                isWithMe={isWithMe(eventC)}
                                handleGo={(event: event) => handleGo(event)}
                            />
                        ))}
                </main>
            )}
            {view === "event" && (
                <main>{<CalendarCompLarge eventList={eventList} />}</main>
            )}
            <NavBarBottom handleClick={handleClick} addBtn={true} />
        </div>
    );
}
