import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PostCategory, PostFilter } from "../../../../domain/entities/Post";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import AnnouncesGridComp from "./announceComps/AnnouncesGridComp";
import { SkeletonGrid } from "../../common/Skeleton";
import { getValue } from "../../../views/viewsEntities/utilsService";
import DI from "../../../../di/ioc";
import { PostView } from "../../../views/viewsEntities/postViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { postCategories } from "../../../constants";
import PostCard from "./announceComps/PostCard";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { Icon } from "../../common/IconComp";

export default function AnnounceListPage() {
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const postViewModelFactory = DI.resolve('postViewModel');
    const { posts, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = postViewModelFactory(filter, category)
    const [notif, setNotif] = useState<string>('')
    const [mines, setMines] = useState<boolean>(false);
    const [view, setView] = useState(window.innerWidth > 768 ? "list" : "dashboard");
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }

    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || ''); }, []);

    const [list, setList] = useState<PostView[]>(posts);
    useEffect(() => { posts && setList(posts) }, [isLoading, count, refetch])

    const filterTab = async (value?: PostFilter) => {
        setParams({ filter: value as string || '', category: category });
        value !== filter && setCategory('')
        setFilter(value || '');
        value === PostFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category: category })
        await refetch();
    }

    const postTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "J'aime", value: PostFilter.ILIKE, result: () => filterTab(PostFilter.ILIKE) },
        { label: "Mes annonces", value: PostFilter.MINE, result: () => filterTab(PostFilter.MINE) }
    ]

    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), postCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        await refetch();
    }


    const filterName = (): string => {
        switch (filter) {
            case PostFilter.MINE: return 'les miens';
            case PostFilter.ILIKE: return 'likée';
            default: return '';
        }
    }


    useEffect(() => {
        switch (true) {
            case (isLoading): setNotif('Chargement des annonces...'); break;
            case (count === 0): setNotif(`Aucune annonce ${filterName()} ${PostCategory[category as keyof typeof PostCategory] ?? ''} n'a été trouvé`); break;
            case (error): setNotif("Erreur lors du chargement des annonces, veuillez réessayer plus tard"); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, category]);


    useEffect(() => {
        const handleResize = () => setView(window.innerWidth > 768 ? "list" : "dashboard");
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const AnnouncesByFour = (array: PostView[]) => {
        const arrayTotal: PostView[][] = [];
        for (let i = 0; i < array?.length; i += 4)  arrayTotal.push(array.slice(i, i + 4))
        return arrayTotal;
    }

    //// HANDLE SCROLL
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                hasNextPage && fetchNextPage()
                sortList.find((s) => s.label === selectedSort)?.action();
            } else setIsBottom(false)
        }
    }
    const announcesToGrid = AnnouncesByFour(list);
    const switchClick = () => setView(view === "dashboard" ? "list" : "dashboard");

    const sortList = [
        {
            label: "Nombre de likes",
            icon: "thumb_up",
            action: () => setList([...posts].sort((a, b) => b?.Likes?.lenght - a?.Likes?.lenght)),
            reverse: () => setList([...posts].sort((a, b) => a?.Likes?.length - b?.Likes?.length))
        },
        {
            label: "Créé le",
            icon: "event",
            action: () => setList([...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())),
            reverse: () => setList([...posts].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
        },
        {
            label: "Titre",
            icon: "sort_by_alpha",
            action: () => setList([...posts].sort((a, b) => a.title.localeCompare(b.title))),
            reverse: () => setList([...posts].sort((a, b) => b.title.localeCompare(a.title)))
        }
    ]
    const [selectedSort, setSelectedSort] = useState<String>(sortList[0].label)

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    qty={count}
                    type={`annonces  ${filterName()} ${PostCategory[category as keyof typeof PostCategory] ?? ''}`} />
                <TabsMenu
                    labels={postTabs}
                    sortList={sortList}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                    color={'orange'} />
                <div className="flex items-center justify-center gap-4 pb-1 lg:px-8">
                    <CategoriesSelect
                        categoriesArray={postCategories}
                        change={change}
                        categorySelected={category.toString()} />

                    <Icon
                        icon={view === "list" ? "list" : "dashboard"}
                        onClick={switchClick}
                        size="3xl"
                        style="mt-1 hidden md:flex"
                    />
                </div>
                {notif &&
                    <div className="w-full flex justify-center p-8">
                        {notif}
                    </div>}
            </header>
            <main
                ref={divRef}
                onScroll={handleScroll}>
                {isLoading ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4} />
                    ))
                    : <>
                        {view === "list" ?
                            announcesToGrid.map((line, index) => (
                                <AnnouncesGridComp
                                    key={index}
                                    line={line}
                                    update={refetch}
                                    change={change}
                                    mines={mines}
                                    view={view} />))
                            :
                            <div className="Grid">
                                {list.map((post: PostView, index: number) => (
                                    <div className="SubGrid" key={index}>
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            change={change}
                                            update={refetch}
                                            mines={mines} />
                                    </div>
                                ))}

                            </div>
                        }
                    </>
                }
                <LoadMoreButton
                    color={'orange'}
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={handleScroll} />

            </main>
            <NavBarBottom
                addBtn={true}
                color="orange" />
        </div>
    );
}
