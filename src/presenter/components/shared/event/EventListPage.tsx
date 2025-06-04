import { useCallback, useEffect, useRef, useState } from "react";
import { EventCategory, EventFilter, EventSort } from "../../../../domain/entities/Event";
import { CategoriesSelect } from "../../common/CategoriesSelect";
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
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";

export default function EventListPage() {
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const eventViewModelFactory = DI.resolve('eventViewModel');
    const [sort, setSort] = useState<EventSort>(EventSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(false);
    const { events, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = eventViewModelFactory(filter, category, sort, reverse);
    const [view, setView] = useState("view_agenda");
    const [notif, setNotif] = useState<string>("");
    const [mines, setMines] = useState<boolean>(false);
    const [Params, setParams] = useSearchParams();

    const params = { filter: Params.get("filter"), category: Params.get("category") }

    useEffect(() => {
        setCategory(params.category || ''); setFilter(params.filter || '')
    }, []);


    //// FILTER TAB 
    const filterTab = async (value?: EventFilter) => {
        setParams({ filter: value as string || '', category: category });
        console.log('filterTab called with value:', value);
        value !== filter && setCategory('')
        setFilter(value || '');
        value === EventFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category: category })
        await refetch();
    }

    const eventTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "validé", value: EventFilter.VALIDATED, result: () => filterTab(EventFilter.VALIDATED) },
        { label: "j'y vais", value: EventFilter.IGO, result: () => filterTab(EventFilter.IGO) },
        { label: "j'organise", value: EventFilter.MINE, result: () => filterTab(EventFilter.MINE) },
    ]

    const filterName = (): string => {
        switch (filter) {
            case EventFilter.MINE: return 'que j\'organise';
            case EventFilter.IGO: return 'où je vais';
            case EventFilter.VALIDATED: return 'validé';
            default: return '';
        }
    }

    //// HANDLE CATEGORY CHANGE
    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        await refetch();
    }

    //// NOTIFICATION
    useEffect(() => {
        switch (true) {
            case error: setNotif('Erreur de chargement'); break;
            case (count === 0 && !isLoading): setNotif(`Aucun événement ${filterName()} trouvé`); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, category, count]);

    //// HANDLE VIEW CHANGE
    const switchClick = () => {
        setView(view === "view_agenda" ? "event" : "view_agenda");
        setCategory('');
        filterTab("" as EventFilter)
        setHideNavBottom(view !== "event");
    }


    //// HANDLE SCROLL
    const utils = DI.resolve('utils')
    const handleScroll = (params: HandleScrollParams) => utils.handleScroll(params)
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const onScroll = useCallback(() => {
        const params: HandleScrollParams = {
            divRef,
            hasNextPage,
            fetchNextPage,
            setIsBottom,
        }
        handleScroll(params)
    }, [divRef]);


    //// HANDLE HIDE  
    const handleHide = (params: HandleHideParams) => utils.handleHide(params)
    const { setHideNavBottom, hideNavBottom } = useUxStore((state) => state);
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide }
        handleHide(params)
    }, [divRef]);
    const [hide, setHide] = useState<boolean>(false);
    useEffect(() => { (hide !== hideNavBottom) && setHideNavBottom(hide) }, [hide]);


    //// SORT LIST
    const sortList: any = [
        {
            label: 'créé le',
            key: EventSort.CREATED_AT,
            icon: "event",
            action: () => refetch()
        },
        {
            label: 'titre',
            key: EventSort.AZ,
            icon: 'sort_by_alpha',
            action: () => refetch(),
        }
        ,
        {
            label: 'participants',
            key: EventSort.PARTICIPANTS,
            icon: 'person',
            action: () => refetch(),
        },
        {
            label: 'jours',
            key: EventSort.INDAYS,
            icon: 'calendar_month',
            action: () => refetch(),
        }
    ]

    const { navBottom } = useUxStore((state) => state);
    return (

        <main className={navBottom ? "withBottom" : ""}>
            <div className="sectionHeader ">
                {view === "view_agenda" &&
                    <TabsMenu
                        labels={eventTabs}
                        defaultTab={params.filter || ''}
                        sortList={sortList}
                        selectedSort={sort}
                        setSelectedSort={setSort}
                        reverse={reverse}
                        setReverse={setReverse}
                    />}
                <div className={` flex items-center justify-center gap-2`}>
                    <CategoriesSelect
                        categoriesArray={eventCategoriesS}
                        change={change}
                        categorySelected={category.toString()}
                        disabled={view === "event"} />
                    <Icon
                        onClick={switchClick}
                        icon={view === "view_agenda" ? "calendar_month" : "list"}
                        size="lg"
                        color="gray"
                        title={view === "view_agenda" ? "voir en mode calendrier" : "voir en mode liste"} />
                    {(view === "view_agenda" && notif) &&
                        <NotifDiv
                            notif={notif}
                            isLoading={isLoading}
                            refetch={refetch} />
                    }
                </div>
                <SubHeader
                    qty={count || 0}
                    type={`évènements ${filterName()} ${EventCategory[category as keyof typeof EventCategory] ?? ''}`} />
            </div>
            {view === "view_agenda" &&
                <>
                    {isLoading ?
                        <SkeletonGrid /> :
                        <section
                            ref={divRef}
                            onScroll={() => {
                                onScroll()
                                handleHideCallback()

                            }}
                            className="Grid">
                            {events.map((event: EventView, index: number) => (
                                <div className="SubGrid "
                                    key={index} >
                                    <EventCard
                                        event={event}
                                        change={change}
                                        mines={mines}
                                        refetch={refetch} />
                                </div>
                            ))}
                            <LoadMoreButton
                                isBottom={isBottom}
                                hasNextPage={hasNextPage}
                                handleScroll={onScroll} />
                        </section>}
                </>
            }
            {view === "event" && !isLoading &&
                <section>
                    <CalendarComp />
                </section>}

        </main>
    );
}
