import { useEffect, useRef, useState } from "react";
import { EventCategory, EventFilter } from "../../../../domain/entities/Event";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import CalendarComp from "../../common/CalendarComp";
import { EventCard } from "./eventComps/EventCard";
import DI from "../../../../di/ioc";
import { Icon } from "../../common/IconComp";
import { SkeletonGrid } from "../../common/Skeleton";
import { useSearchParams } from "react-router-dom";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { getValue } from "../../../views/viewsEntities/utilsService";
import { eventCategories, eventCategoriesS } from "../../../constants";
import { EventView } from "../../../views/viewsEntities/eventViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";

export default function EventListPage() {
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const eventViewModelFactory = DI.resolve('eventViewModel');
    const { events, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = eventViewModelFactory(filter, category)
    const [view, setView] = useState("view_agenda");
    const [notif, setNotif] = useState<string>("");
    const [mines, setMines] = useState<boolean>(false);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);
    const [list, setList] = useState<EventView[]>(events);
    useEffect(() => { setList(events) }, [isLoading, refetch, count])

    const filterTab = async (value?: EventFilter) => {
        setParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        value === EventFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category: category })
        refetch();
    }

    const eventTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "validé", value: EventFilter.VALIDATED, result: () => filterTab(EventFilter.VALIDATED) },
        { label: "j'y vais", value: EventFilter.IGO, result: () => filterTab(EventFilter.IGO) },
        { label: "j'organise", value: EventFilter.MINE, result: () => filterTab(EventFilter.MINE) },
    ]

    const change = (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        refetch();
    }


    const filterName = (): string => {
        switch (filter) {
            case EventFilter.MINE: return 'les miens';
            case EventFilter.IGO: return 'j\'y vais';
            case EventFilter.VALIDATED: return 'validé';
            default: return '';
        }
    }

    useEffect(() => {
        switch (true) {
            case isLoading: setNotif('Chargement...'); break;
            case error: setNotif('Erreur de chargement'); break;
            case count === 0: setNotif(`Aucun événement ${filterName()} trouvé`); break;
            default: setNotif('');
        }
    }, [events, isLoading, error, filter, category]);

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
                hasNextPage && fetchNextPage()
            } else setIsBottom(false)
        }
    }

    const sortList = [
        {
            label: "Commence le",
            icon: "event",
            action: () => setList([...events].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())),
            reverse: () => setList([...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()))
        },
        {
            label: 'Titre', icon: 'sort_by_alpha',
            action: () => setList([...events].sort((a, b) => a.title.localeCompare(b.title))),
            reverse: () => setList([...events].sort((a, b) => b.title.localeCompare(a.title)))
        }
        ,
        {
            label: 'Participants', icon: 'person',
            action: () => setList([...events].sort((a, b) => b.Participants.length - a.Participants.length)),
            reverse: () => setList([...events].sort((a, b) => a.Participants.length - b.Participants.length))
        },
        {
            label: 'Durée', icon: 'calendar_month',
            action: () => setList([...events].sort((a: EventView, b) => (b?.days?.length || 0) - (a?.days?.length || 0))),
            reverse: () => setList([...events].sort((a, b) => a.days.length - b.days.length))
        }
    ]

    const [selectedSort, setSelectedSort] = useState<String>(sortList[0].label)

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    qty={count || 0}
                    type={`évènements  ${filterName()} ${EventCategory[category as keyof typeof EventCategory] ?? ''}`} />
                {view === "view_agenda" &&
                    <TabsMenu
                        labels={eventTabs}
                        defaultTab={params.filter || ''}
                        sortList={sortList}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}


                    />}
                <div className={`flex items-center justify-center gap-4 lg:px-8`}>
                    <CategoriesSelect
                        categoriesArray={eventCategoriesS}
                        change={change}
                        categorySelected={category.toString()}
                        disabled={view === "event"} />
                    <Icon
                        onClick={switchClick}
                        icon={view === "view_agenda" ? "calendar_month" : "list"}
                        size="3xl"
                        style="mt-1"
                        color="gray"
                        title={view === "view_agenda" ? "voir en mode calendrier" : "voir en mode liste"} />
                </div>
                {view === "view_agenda" &&
                    <div className={notif && "w-full flex justify-center p-8"}>
                        {notif}
                    </div>}
            </header>
            {view === "view_agenda" && (
                <main
                    ref={divRef}
                    onScroll={handleScroll}
                    className="Grid">
                    {isLoading || error ?
                        [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                            <SkeletonGrid
                                key={index}
                                count={4} />
                        ))
                        :
                        list.map((event: EventView, index: number) => (
                            <div className="SubGrid" key={index}>
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    change={change}
                                    mines={mines}
                                    refetch={refetch} />
                            </div>
                        ))
                    }
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={handleScroll} />

                </main>
            )}
            {view === "event" && !isLoading &&
                <main>
                    <CalendarComp />
                </main>}

            <NavBarBottom addBtn={true} />
        </div>
    );
}
