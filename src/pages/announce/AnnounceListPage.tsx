import { useEffect, useState } from "react";
import { CategoriesSelect } from "../../components/UIX/CategoriesSelect";
import NavBarBottom from "../../components/UIX/NavBarBottom";
import NavBarTop from "../../components/UIX/NavBarTop";
import SubHeader from "../../components/UIX/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import AnnouncesGridComp from "../../components/announceComps/AnnouncesGridComp";
import AnnouncesComp from "../../components/announceComps/AnnouncesComp";
import { Post } from '../../types/class';
import { useSearchParams } from "react-router-dom";
import { getPosts, getPostsIlike, getPostsMines } from '../../functions/API/postsApi';
import { getLabel, getValue, postCategories } from "../../functions/GetDataFunctions";

export default function AnnounceListPage() {
    const [notif, setNotif] = useState<string>('')
    const [mines, setMines] = useState<boolean>(false);
    const [view, setView] = useState(window.innerWidth > 768 ? "list" : "dashboard");
    const [posts, setPosts] = useState<Post[]>([]);
    const [postList, setPostList] = useState<Post[]>([]);
    const [myPosts, setMyPosts] = useState<Post[]>([]);
    const [IlikePost, setIlikePost] = useState<Post[]>([]);
    const [tabSelected, setTabSelected] = useState<string>('');
    const [tabledList, setTabledList] = useState<Post[]>([]);
    const [categorySelected, setCategorySelected] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const params = { tab: searchParams.get("search"), category: searchParams.get("category") };
    !postCategories.some(category => category.label === "tous") && postCategories.unshift({ label: "tous", value: "" });
    const label = getLabel(categorySelected, postCategories).toLowerCase();

    const UpdateList = async () => {
        const posts = await getPosts();
        const myPosts = await getPostsMines();
        const IlikePosts = await getPostsIlike();
        posts.sort((a, b) => b.Likes?.length - a.Likes?.length)
        setPosts(posts)
        setMyPosts(myPosts)
        setIlikePost(IlikePosts)
        switch (tabSelected) {
            case "myposts": setPostList(myPosts); break;
            case "liked": setPostList(IlikePosts); break;
            default: setPostList(posts); break;
        }
    }

    useEffect(() => {
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${params.tab}"]`)
        const fetch = async () => await UpdateList();
        fetch().then(() => Tab && Tab.click())
    }, []);

    const filterTab = async (newArray: Post[], value: string) => {
        if (value !== tabSelected) { setCategorySelected(''); await UpdateList() }
        newArray.sort((a, b) => b.Likes?.length - a.Likes?.length);
        setTabledList(newArray);
        setPostList(newArray)
        setTabSelected(value)
        value === "myposts" ? setMines(true) : setMines(false);
        setSearchParams({ search: value, category: label });
    };

    const announceTabs = [
        { label: "tous", value: "", result: () => filterTab([...posts], "") },
        { label: "j'aime", value: "liked", result: () => filterTab([...IlikePost], "liked") },
        { label: "les miens", value: "myposts", result: () => filterTab([...myPosts], "myposts") },
    ];

    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedTab = announceTabs.find(tab => tab.value === tabSelected)
        await selectedTab?.result()
        const selectedCategory = typeof e !== "object" ? e : getValue(e.target.innerText.toLowerCase(), postCategories)
        const filteredArray = selectedCategory === '' ? tabledList
            : tabledList.filter((element: Post) => element.category.toString().toLowerCase() === selectedCategory.toLowerCase());
        setPostList(filteredArray)
        setCategorySelected(selectedCategory.toUpperCase());
        setSearchParams({ search: tabSelected, category: label });
    }

    useEffect(() => {
        setNotif(postList.length > 0 ? '' : `Aucune annonce ${tabSelected} ${categorySelected !== '' && categorySelected ? "de la catégorie " + label : ""} n'a été trouvée`);
    }, [postList]);

    useEffect(() => {
        const handleResize = () => setView(window.innerWidth > 768 ? "list" : "dashboard");
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const AnnouncesByFour = (array: Post[]) => {
        const arrayTotal: Post[][] = [];
        for (let i = 0; i < array.length; i += 4) {
            arrayTotal.push(array.slice(i, i + 4));
        }
        return arrayTotal;
    };

    const announcesToGrid = AnnouncesByFour(postList);
    const switchClick = () => setView(view === "dashboard" ? "list" : "dashboard");

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader qty={postList.length} type={`annonce ${categorySelected !== '' ? label : ''}`} />
                <TabsMenu labels={announceTabs} subMenu={false} />
                <div className="flex items-center justify-center gap-4 lg:px-8">
                    <CategoriesSelect categoriesArray={postCategories} change={change} categorySelected={categorySelected} />
                    <button onClick={switchClick}>
                        <span className="material-symbols-outlined text-gray-700 !text-4xl flex items-center">
                            {view === "list" ? "list" : "dashboard"}
                        </span>
                    </button>
                </div>
                {notif && <div className="w-full flex justify-center p-8">{notif}</div>}
            </header>
            <main>
                {view === "list" ? (
                    announcesToGrid.map((line, index) => (
                        <AnnouncesGridComp key={index} line={line} update={UpdateList} change={change} mines={mines} view={view} />
                    ))
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-4 w-full gap-4">
                        {postList.map((post, index) => (
                            <div className="pt-6 h-[calc(40Vh+2rem)] w-respLarge" key={index}>
                                <AnnouncesComp key={post.id} post={post} change={change} update={UpdateList} mines={mines} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <NavBarBottom addBtn={true} />
        </div>
    );
}
