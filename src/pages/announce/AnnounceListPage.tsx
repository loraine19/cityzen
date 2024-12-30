import { useEffect, useState } from "react";
import { CategoriesSelect } from "../../components/UIX/CategoriesSelect";
import NavBarBottom from "../../components/UIX/NavBarBottom"
import NavBarTop from "../../components/UIX/NavBarTop";
import SubHeader from "../../components/UIX/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import { label } from "../../types/label";
import AnnouncesGridComp from "../../components/announceComps/AnnouncesGridComp";
import AnnouncesComp from "../../components/announceComps/AnnouncesComp";
import { Post, postCategory } from '../../types/class';
import { useSearchParams } from "react-router-dom";
import { getPosts, getPostsIlike, getPostsMines } from "../../functions/API/postsApi";

export default function postsPage() {
    const [notif, setNotif] = useState<string>('');
    const [view, setView] = useState(window.innerWidth > 768 ? "list" : "dashboard");
    const [posts, setPosts] = useState<Post[]>([])
    const [postList, setPostList] = useState<Post[]>(posts);
    const [arrayToFilter, setArrayToFilter] = useState<Post[]>(posts)
    const [myPosts, setMyPosts] = useState<Post[]>([])
    const [IlikePost, setIlikePost] = useState<Post[]>([])
    const [mines, setMines] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<string>('');
    const [announcesTabled, setAnnouncesTabled] = useState<Post[]>([]);
    const [activeTab] = useState<any>(document.querySelector(`li[data-value="${tabSelected}"]`))
    const postCategories = (postCategory.filter((category) => typeof category === "string").map((category) => category.toString().toLowerCase()));
    postCategories.unshift("tous");
    const [categorySelected, setCategorySelected] = useState<string>(postCategories[0]);

    //// PARAMS QUERY
    const [searchParams, setSearchParams] = useSearchParams();
    const params = { tab: (searchParams.get("search")), category: (searchParams.get("category")) }

    //// UPDATE FUNCTION
    const UpdateList = async () => {
        const posts = await getPosts()
        const myPosts = await getPostsMines()
        const IlikePosts = await getPostsIlike()
        posts.sort((a: any, b: any) => b.Likes?.length - a.Likes?.length)
        setPosts(posts)
        setMyPosts(myPosts)
        setIlikePost(IlikePosts)
        setArrayToFilter(posts)
        switch (tabSelected) {
            case "mines": setPostList(myPosts); break;
            case "liked": setPostList(IlikePosts); break;
            default: setPostList(posts); break;
        }
    }
    const update = async () => { activeTab && activeTab.click(); await UpdateList() }


    //// FETCH ON LOAD 
    useEffect(() => {
        const Tab: any = document.querySelector(`li[data-value="${params.tab}"]`);
        const fetch = async () => {
            const posts = await getPosts()
            setPosts(posts)
            await UpdateList()
        }
        fetch()
        Tab && Tab.click()
    }, []);


    /////FILTER FUNCTIONS
    const filterAnnounces = async (newArray: Post[], value: string) => {
        if (value !== tabSelected) { setCategorySelected(postCategories[0]); await UpdateList() }
        setAnnouncesTabled(newArray);
        setPostList(newArray.sort((a: any, b: any) => b.Likes?.length - a.Likes?.length));
        setTabSelected(value);
        value === "mines" ? setMines(true) : setMines(false);
        setSearchParams({ search: value, category: categorySelected });
    }

    const announceTabs: label[] = [{
        label: "tous",
        value: "",
        result: () => { filterAnnounces(([...arrayToFilter]), announceTabs[0].value) }
    },
    {
        label: "j'aime",
        value: "liked",
        result: () => { filterAnnounces(([...IlikePost]), announceTabs[1].value) }
    },
    {
        label: "les miens",
        value: "mines",
        result: () => { filterAnnounces([...myPosts], announceTabs[2].value) }
    },
    ]

    //// FILTER ON SELECT 
    const change = (e: string | React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTab = announceTabs.find((tab: label) => tab.value === tabSelected);
        selectedTab?.result()
        const selectedCategory = typeof e !== "object" ? e.toLowerCase() : e.target.innerText.toLowerCase()
        setSearchParams({ search: tabSelected, category: selectedCategory })
        setCategorySelected(selectedCategory);
        const filteredannounces = selectedCategory === postCategories[0]
            ? announcesTabled
            : announcesTabled.filter((post: Post) => post.category.toString().toLowerCase() === selectedCategory);
        setPostList(filteredannounces);
    }


    //// USE EFFECT 
    useEffect(() => {
        postList.length > 0 ? setNotif('') : setNotif(`Aucune annonce ${tabSelected} ${categorySelected != postCategories[0] && categorySelected ? "de la catégorie " + categorySelected : ""} n'a été trouvé`);
    }, [postList])
    useEffect(() => {
        window.addEventListener("resize", () => {
            window.innerWidth > 768 ? setView("list") : setView("dashboard");
        })
    })


    ////GRID FUNCTION
    const AnnouncesByFour = (array: Post[]) => {
        const arrayTotal: Post[][] = [];
        for (let i = 0; i < array.length; i += 4) {
            arrayTotal.push(array.slice(i, i + 4))
        }
        return arrayTotal;
    }
    const announcesToGrid = AnnouncesByFour(postList)

    const switchClick = () => {
        (view === "dashboard" ? setView("list") : setView("dashboard"));
    }
    const icon = view === "list" ? "list" : "dashboard"

    return (
        <div className="Body orange">
            <header className=" px-4">
                <NavBarTop />

                <SubHeader qty={postList.length} type={"annonce " + `${categorySelected != postCategories[0] ? categorySelected : ""} `} />

                <TabsMenu labels={announceTabs} subMenu={false} />
                <div className={`flex items-center justify-center gap-4 lg:px-8`} >
                    <CategoriesSelect categoriesArray={postCategories} change={change} categorySelected={categorySelected} />
                    <button onClick={switchClick} >
                        <span className="material-symbols-outlined text-gray-700 !text-4xl flex items-center" >
                            {icon}</span>
                    </button>
                </div>
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>

            <main>
                {
                    view === "list" && announcesToGrid.map((line, index) => (
                        <AnnouncesGridComp key={index} line={line} update={update} change={change} mines={mines} view={view} />
                    ))}
                {
                    view === "dashboard" &&
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-4 w-full gap-4">
                        {postList.map((announce, index) => (
                            <div className="pt-6 h-[calc(40Vh+2rem)] w-respLarge" key={index}>
                                <AnnouncesComp
                                    post={announce}
                                    change={change}
                                    update={update}
                                    mines={mines}
                                    key={announce.id}
                                />
                            </div>
                        ))}
                    </div>
                }
            </main>
            <NavBarBottom addBtn={true} />
        </div>
    )
}