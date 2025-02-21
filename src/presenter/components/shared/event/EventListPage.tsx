import { useEffect, useRef, useState } from "react";
import { EventFilter } from "../../../../domain/entities/Event";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import CalendarComp from "../../common/CalendarComp";
import { EventCard } from "./eventComps/EventCard";
import DI from "../../../../di/ioc";
import { Icon } from "../../common/SmallComps";
import { SkeletonGrid } from "../../common/Skeleton";
import { useSearchParams } from "react-router-dom";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { getLabel, getValue } from "../../../views/viewsEntities/utilsService";
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

    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || ''); }, []);

    const filterTab = async (value?: EventFilter) => {
        setParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        value === EventFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category: category })
        refetch();
    };

    const eventTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "validé", value: EventFilter.VALIDATED, result: () => filterTab(EventFilter.VALIDATED) },
        { label: "j'y vais", value: EventFilter.IGO, result: () => filterTab(EventFilter.IGO) },
        { label: "j'organise", value: EventFilter.MINE, result: () => filterTab(EventFilter.MINE) },
    ];

    const change = (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        refetch();
    }

    useEffect(() => {
        const notifUpdate =
            (events?.length === 0 && !isLoading) &&
            `Aucun évènement ${filter !== '' ? getLabel(filter, eventTabs).toLowerCase() : ''} ${category !== '' ? getLabel(category, eventCategories).toLowerCase() : ''} n'a été trouvé`
            || error && "Erreur lors du chargement des évènements, veuillez réessayer plus tard"
            || '';
        setNotif(notifUpdate);
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
                if (hasNextPage) {
                    fetchNextPage();
                }
            } else {
                setIsBottom(false);
            }
        }
    }

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    qty={count || 0}
                    type={`évènements ${category !== '' ? getLabel(category, eventCategories).toLowerCase() : ""}`} />
                {view === "view_agenda" &&
                    <TabsMenu
                        labels={eventTabs}
                        defaultTab={params.filter || ''} />}
                <div className={`flex items-center justify-center gap-4 lg:px-8`}>
                    <CategoriesSelect
                        categoriesArray={eventCategoriesS}
                        change={change}
                        categorySelected={category.toString()}
                        disabled={view === "event"} />
                    <Icon
                        onClick={switchClick}
                        icon={view === "view_agenda" ? "calendar_month" : "list"}
                        size="4xl"
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
                        events.map((event: EventView, index: number) => (
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
