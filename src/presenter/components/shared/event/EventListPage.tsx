import { useEffect, useRef, useState } from "react";
import { EventFilter, EventView } from "../../../../domain/entities/Event";
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
import { SkeletonGrid } from "../../common/Skeleton";
import { useSearchParams } from "react-router-dom";
// Remove incorrect import

export default function EventListPage() {
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const eventViewModelFactory = DI.resolve('eventViewModel');
    const { events, loadingEvents, errorEvents, fetchNextPage, hasNextPage, refetch } = eventViewModelFactory(filter, category);
    const [eventList, setEventList] = useState<EventView[]>(!loadingEvents ? events : []);
    const [view, setView] = useState("view_agenda");
    const [notif, setNotif] = useState<string>("");
    const [mines, setMines] = useState<boolean>(false);
    const [filterParams, setFilterParams] = useSearchParams();
    const params = { filter: filterParams.get("filter"), category: filterParams.get("category") }

    !eventCategories.some(category => category.value === '') && eventCategories.unshift({ label: 'tous', value: '' })
    type label = TabLabel;

    useEffect(() => {
        setCategory(params.category || '');
        setFilter(params.filter || '');
    }, []);

    const update = async () => { await refetch(); setEventList([...events]) }

    const filterTab = async (value?: EventFilter) => {
        setFilterParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        value === EventFilter.MINE ? setMines(true) : setMines(false);
        setFilterParams({ filter: value as string || '', category: category })
        update()
    };

    const eventTabs: label[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "validé", value: EventFilter.VALIDATED, result: () => filterTab(EventFilter.VALIDATED) },
        { label: "j'y vais", value: EventFilter.IGO, result: () => filterTab(EventFilter.IGO) },
        { label: "j'organise", value: EventFilter.MINE, result: () => filterTab(EventFilter.MINE) },
    ];

    const change = (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ? e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        setCategory(selectedCategory);
        setFilterParams({ filter: filter as string || '', category: selectedCategory });
        update()
    }

    const notifUpdate =
        (events.length === 0 && !loadingEvents) &&
        `Aucun évènement ${filter !== '' ? getLabel(filter, eventTabs).toLowerCase() : ''} ${category !== '' ? getLabel(category, eventCategories).toLowerCase() : ''} na été trouvé`
        || errorEvents && "Une erreur s'est produite lors du chargement des évènements, veuillez réessayer plus tard"
        || '';
    useEffect(() => { setNotif(notifUpdate) }, [events])

    const switchClick = () => {
        setView(view === "view_agenda" ? "event" : "view_agenda");
        setCategory('');
        filterTab("" as EventFilter);
    }

    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) {
                    fetchNextPage();
                    setEventList(events);
                }
            } else {
                setIsBottom(false);
            }
        }
    };

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader qty={events.length > 9 ? 'plus de 10 ' : events?.length || 0} type={`évènements ${category !== '' ? getLabel(category, eventCategories).toLowerCase() : ""}`} />
                {view === "view_agenda" && <TabsMenu labels={eventTabs} defaultTab={params.filter || ''} />}
                <div className={`flex items-center justify-center gap-4 lg:px-8`}>
                    <CategoriesSelect
                        categoriesArray={eventCategories}
                        change={change}
                        categorySelected={category.toString()}
                        disabled={view === "event"} />
                    <Icon onClick={switchClick} icon={view === "view_agenda" ? "calendar_month" : "list"} size="4xl" color="gray" title={view === "view_agenda" ? "voir en mode calendrier" : "voir en mode liste"} />
                </div>
                {view === "view_agenda" && <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>}
            </header>
            {view === "view_agenda" && (
                <main ref={divRef}
                    onScroll={handleScroll} className="Grid">
                    {loadingEvents || !eventList || errorEvents ?
                        [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                            <SkeletonGrid
                                key={index}
                                count={4} />
                        ))
                        :
                        events.map((event: EventView, index: number) => (
                            <div className="SubGrid" key={index}>
                                <EventCard key={event.id} event={event} change={change} mines={mines} update={refetch} />
                            </div>
                        ))
                    }
                    <div className="absolute bottom-8 left-0 !w-full flex items-center justify-center ">
                        <Icon color='cyan' fill icon="keyboard_double_arrow_down" size="4xl" title="voir plus" style={(isBottom && hasNextPage) ? "mb-10" : "hidden"} onClick={handleScroll} /></div>
                </main>
            )}
            {view === "event" && !loadingEvents &&
                <main>
                    <CalendarComp />
                </main>}

            <NavBarBottom addBtn={true} />
        </div>
    );
}
