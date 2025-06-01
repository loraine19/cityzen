import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PostCategory, PostFilter, PostSort } from "../../../../domain/entities/Post";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import NavBarBottom from "../../common/NavBarBottom";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import PostGridComp from "./PostComps/PostGridComp";
import { SkeletonGrid } from "../../common/Skeleton";
import { getValue } from "../../../views/viewsEntities/utilsService";
import DI from "../../../../di/ioc";
import { PostView } from "../../../views/viewsEntities/postViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { postCategories } from "../../../constants";
import PostCard from "./PostComps/PostCard";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { Icon } from "../../common/IconComp";

export default function PostListPage() {
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const [sort, setSort] = useState<PostSort>(PostSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);
    const postViewModelFactory = DI.resolve('postViewModel');
    const { posts, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = postViewModelFactory(filter, category, sort, reverse)
    const [notif, setNotif] = useState<string>('')
    const [mines, setMines] = useState<boolean>(false);
    const [view, setView] = useState(window.innerWidth > 768 ? "list" : "dashboard");

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    useEffect(() => { setCategory(params.category ?? ''); setFilter(params.filter ?? ''); }, []);


    //// FILTER TAB
    const filterTab = async (value?: PostFilter) => {
        setParams({ filter: value as string ?? '', category });
        value !== filter && setCategory('')
        setFilter(value || '');
        value === PostFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string ?? '', category })
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

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case PostFilter.MINE: return 'que j\'ai posté';
            case PostFilter.ILIKE: return 'que j\'aime';
            default: return '';
        }
    }
    const categoryName = (): string => PostCategory[category as keyof typeof PostCategory] ?? '';

    //// NOTIFICATION
    useEffect(() => {
        switch (true) {
            case (count === 0 && !isLoading): setNotif(`Aucune annonce ${filterName()} ${categoryName()} n'a été trouvé`); break;
            case (error): setNotif("Erreur lors du chargement, veuillez réessayer plus tard"); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, category, sort, reverse, count]);


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
            } else setIsBottom(false)
        }
    }
    const announcesToGrid = AnnouncesByFour(posts);
    const switchClick = () => setView(view === "dashboard" ? "list" : "dashboard");

    //// SORT LIST
    const sortList = [
        {
            label: "Nombre de likes",
            icon: "thumb_up",
            action: async () => await refetch()
        },
        {
            label: "Créé le",
            icon: "event",
            action: async () => await refetch()
        },
        {
            label: "Titre",
            icon: "sort_by_alpha",
            action: async () => await refetch()
        },
        {
            label: "Utilisateur",
            icon: "person",
            action: async () => await refetch()
        }
    ]

    return (
        <>
            <main>
                <div className="sectionHeader">
                    <SubHeader
                        qty={count}
                        type={`annonces  ${filterName()} ${PostCategory[category as keyof typeof PostCategory] ?? ''}`} />
                    <TabsMenu
                        labels={postTabs}
                        sortList={sortList}
                        selectedSort={sort}
                        setSelectedSort={setSort}
                        color={'orange'}
                        reverse={reverse}
                        setReverse={setReverse}
                    />
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
                        <div className={'notif'}>
                            {notif}
                            <Icon
                                title="Recharger la liste"
                                bg={!isLoading}
                                icon={isLoading ? '...' : 'refresh'}
                                onClick={() => refetch()} />
                        </div>}
                </div>
                <section
                    ref={divRef}
                    onScroll={handleScroll}>
                    {isLoading || !posts || error ?
                        <div className="Grid ">
                            {[...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                                <SkeletonGrid
                                    key={index}
                                    count={4} />
                            ))}</div>
                        : <>
                            {view === "list" ?
                                announcesToGrid.map((line, index) => (
                                    <PostGridComp
                                        key={index}
                                        line={line}
                                        update={refetch}
                                        change={change}
                                        mines={mines}
                                        view={view} />))
                                :
                                <div className="Grid">
                                    {posts?.map((post: PostView, index: number) => (
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

                </section>
            </main>

            <NavBarBottom addBtn={true} />
        </>
    );
}
