import { useEffect, useRef, useState } from "react";
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import DI from '../../../../di/ioc';
import { useSearchParams } from 'react-router-dom';
import { GroupView } from '../../../views/viewsEntities/GroupViewEntity';
import { LoadMoreButton } from '../../common/LoadMoreBtn';
import NavBarBottom from '../../common/NavBarBottom';
import { SkeletonGrid } from '../../common/Skeleton';
import { GroupCard } from "./GroupCard";
import TabsMenu from "../../common/TabsMenu";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { GroupCategory, GroupFilter } from "../../../../domain/entities/Group";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import { groupCategories } from "../../../constants";
import { getValue } from "../../../views/viewsEntities/utilsService";


export default function GroupPage() {
    const [notif, setNotif] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const groupViewModelFactory = DI.resolve('groupViewModel');
    const { groups, count, isLoading, refetch, fetchNextPage, hasNextPage, error } = groupViewModelFactory(filter, category);
    const [mines, setMines] = useState<boolean>(false);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);

    //// TABS 
    const filterTab = async (value?: GroupFilter) => {
        setParams({ filter: value as string || '', category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        value === GroupFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category })
        await refetch();
    }


    const Tabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "Je suis membre", value: GroupFilter.IMIN, result: () => filterTab(GroupFilter.IMIN) },
        { label: "Je suis conciliateur", value: GroupFilter.IMODO, result: () => filterTab(GroupFilter.IMODO) },
        { label: "j'ai créé", value: GroupFilter.MINE, result: () => filterTab(GroupFilter.MINE) },
    ]

    /// CATEGORIES SELECT 
    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), groupCategories).toLowerCase()
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        await refetch()
    }


    /// HANDLE SCROLL
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

    //// SETNOTIF
    const filterName = (): string => {
        switch (filter) {
            case GroupFilter.MINE: return 'que vous avez créé';
            case GroupFilter.IMIN: return 'où vous êtes membre';
            case GroupFilter.IMODO: return 'où vous êtes conciliateur';
            default: return '';
        }
    }
    const categorieName = (category: string): string => GroupCategory[category as keyof typeof GroupCategory] ?? '';

    useEffect(() => {
        switch (true) {
            case error: setNotif('Erreur de chargement'); break;
            case count === 0: setNotif(`Aucun groupe ${filterName()} ${categorieName(category)} trouvé`); break;
            default: setNotif('');
        }
    }, [groups, isLoading, error, filter, category]);

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    closeBtn
                    link={`/`}
                    qty={count}
                    type={`Groupes `}
                    place={`${filterName() ?? 'proche de chez vous'}`}
                />

                <TabsMenu
                    labels={Tabs}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort} />
                <div className="flex items-center justify-center gap-4 pb-1 lg:px-8">
                    <CategoriesSelect
                        categoriesArray={groupCategories}
                        change={change}
                        categorySelected={category.toString()} />


                </div>
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>
            <main
                ref={divRef}
                onScroll={() => handleScroll()}
                className="Grid">
                {isLoading || error ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4} />
                    ))
                    :

                    groups.map((group: GroupView, index: number) => (
                        <div className="SubGrid" key={index}>
                            <GroupCard
                                key={index}
                                mines={mines}
                                group={group}
                            />
                        </div>))}
                <LoadMoreButton
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={() => handleScroll()} />
            </main>
            <NavBarBottom addBtn={true} />
        </div>
    )
}

