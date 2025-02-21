import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PostFilter } from "../../../../domain/entities/Post";
import { CategoriesSelect } from "../../common/CategoriesSelect";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import AnnouncesGridComp from "./announceComps/AnnouncesGridComp";
import { SkeletonGrid } from "../../common/Skeleton";
import { getLabel, getValue } from "../../../views/viewsEntities/utilsService";
import DI from "../../../../di/ioc";
import { PostView } from "../../../views/viewsEntities/postViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { postCategories } from "../../../constants";
import PostCard from "./announceComps/PostCard";
import { TabLabel } from "../../../../domain/entities/frontEntities";

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

    const filterTab = async (value?: PostFilter) => {
        setParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        value === PostFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category: category })
        refetch();
    }

    const postTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "J'aime", value: PostFilter.ILIKE, result: () => filterTab(PostFilter.ILIKE) },
        { label: "Mes annonces", value: PostFilter.MINE, result: () => filterTab(PostFilter.MINE) }
    ]

    const change = (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), postCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        refetch();
    }

    useEffect(() => {
        const notifUpdate =
            (posts?.length === 0 && !isLoading) &&
            `Aucune annonce ${filter !== '' ?
                getLabel(filter, postCategories).toLowerCase() : ''} ${category !== '' ? getLabel(category, postCategories).toLowerCase() : ''} n'a été trouvé`
            || error && "Erreur lors du chargement des annonces, veuillez réessayer plus tard"
            || '';
        setNotif(notifUpdate);
    }, [posts, isLoading, error, filter, category]);


    useEffect(() => {
        const handleResize = () => setView(window.innerWidth > 768 ? "list" : "dashboard");
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const AnnouncesByFour = (array: PostView[]) => {
        const arrayTotal: PostView[][] = [];
        for (let i = 0; i < array?.length; i += 4) {
            arrayTotal.push(array.slice(i, i + 4));
        }
        return arrayTotal;
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
    const announcesToGrid = AnnouncesByFour(posts);
    const switchClick = () => setView(view === "dashboard" ? "list" : "dashboard");

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    qty={count}
                    type={`annonces ${category !== '' ? getLabel(category, postCategories).toLowerCase() : ""}`} />
                <TabsMenu
                    labels={postTabs} />
                <div className="flex items-center justify-center gap-4 lg:px-8">
                    <CategoriesSelect
                        categoriesArray={postCategories}
                        change={change}
                        categorySelected={category.toString()} />
                    <button onClick={switchClick}>
                        <span className="material-symbols-outlined text-gray-700 !text-4xl flex items-center">
                            {view === "list" ? "list" : "dashboard"}
                        </span>
                    </button>
                </div>
                {notif && <div className="w-full flex justify-center p-8">{notif}</div>}
            </header>
            <main
                ref={divRef}
                onScroll={handleScroll}>
                {isLoading || error ?
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
                                {posts.map((post: PostView, index: number) => (
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
