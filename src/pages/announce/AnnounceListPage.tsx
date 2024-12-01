import { useContext, useEffect, useState } from "react";
import { CategoriesSelect } from "../../components/CategoriesSelect";
import NavBarBottom from "../../components/NavBarBottom"
import NavBarTop from "../../components/NavBarTop";
import SubHeader from "../../components/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import { announceCategories } from "../../datas/enumsCategories";
import { post } from '../../types/type';
import { label } from "../../types/label";
import { beInElement, deleteElement, getUsers, imIn } from '../../functions/GetDataFunctions';
import { usersFaker } from "../../datas/fakers/usersFaker";
import AnnouncesGridComp from "../../components/announceComps/AnnouncesGridComp";
import AnnouncesComp from "../../components/announceComps/AnnouncesComp";
import UserContext from "../../contexts/user.context";
import { userProfile } from '../../types/user';
import flagsFaker from "../../datas/fakers/flagsFaker";
import likesFaker from "../../datas/fakers/likesFaker";
import postsFaker from '../../datas/fakers/postsFaker';

export default function AnnounceListPage() {
    const { user } = useContext(UserContext);
    const [categorySelected, setCategorySelected] = useState<string>(announceCategories[0]);
    const [notif, setNotif] = useState<string>('');
    const [view, setView] = useState(window.innerWidth > 768 ? "list" : "dashboard");
    const [announceList, setAnnounceList] = useState<post[]>(postsFaker.sort((a: any, b: any) => b.users.length - a.users.length));
    const [mines, setMines] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<string>('');
    const [announcesTabled, setAnnouncesTabled] = useState<post[]>([]);;
    const handleLike = (elementLiked: post) => { beInElement(elementLiked, announceList, setAnnounceList, likesFaker, user, "post_id"); };
    const isFlaged = (element: any) => { return imIn(element, flagsFaker, user.id) ? true : false };
    const isLiked = (element: any) => { return imIn(element, likesFaker, user.id, "post_id") ? true : false };
    const handleClickDelete = (id: number) => deleteElement(id, announceList, setAnnounceList)

    /////FILTER FUNCTIONS
    const filterAnnounces = (newArray: post[], value: string) => {
        value !== tabSelected && setCategorySelected(announceCategories[0]);
        setAnnouncesTabled(newArray);
        setAnnounceList(newArray);
        setTabSelected(value);
        value === "les miens" ? setMines(true) : setMines(false);
    }

    const announceTabs: label[] = [{
        label: "tous",
        value: "",
        result: () => { filterAnnounces((postsFaker), announceTabs[0].value) }
    },
    {
        label: "j'aime",
        value: "j'aime",
        result: () => { filterAnnounces((postsFaker).filter((announce: post) => announce.users.find((userA: userProfile) => userA === user)), announceTabs[1].value) }
    },
    {
        label: "les miens",
        value: "les miens",
        result: () => { filterAnnounces((postsFaker).filter((announce: post) => announce.user_id === user.id), announceTabs[2].value) }
    },
    ]

    const change = (e: string | React.ChangeEvent<HTMLSelectElement>) => {
        let functTab: () => void = announceTabs.find((tab: label) => tab.value === tabSelected)?.result ?? (() => { })
        functTab();
        typeof (e) !== 'object' ? e = e.toLowerCase() : e = (e.target).innerText.toLowerCase()
        setCategorySelected(e)
        e === announceCategories[0] ? setAnnounceList([...announcesTabled]) : setAnnounceList([...announcesTabled.filter((post: post) => post.category.toLowerCase() === e)]);
    }



    //// USE EFFECT 
    useEffect(() => {
        announceList.length > 0 ? setNotif('') : setNotif(`Aucune annonce ${tabSelected} ${categorySelected != announceCategories[0] && categorySelected ? "de la catégorie " + categorySelected : ""} n'a été trouvé`);
    }, [announceList])

    useEffect(() => {
        filterAnnounces((postsFaker), announceTabs[0].value);
        (getUsers(postsFaker, likesFaker as [], usersFaker as [], 'post_id'))
    }, [postsFaker])

    useEffect(() => {
        window.addEventListener("resize", () => {
            window.innerWidth > 768 ? setView("list") : setView("dashboard");
        })
    })

    const AnnouncesByFour = (array: post[]) => {
        let i = 0
        const arrayTotal: any[] = []
        while (i < array.length) {
            const subArray = []
            for (let j = 0; j < 4; j++) {
                subArray.push(array[i])
                j === 3 && arrayTotal.push(subArray)
                i++
            }
        }
        return arrayTotal
    }

    const announcesToGrid = AnnouncesByFour(announceList)
    const switchClick = () => {
        (view === "dashboard" ? setView("list") : setView("dashboard"));
    }
    const icon = view === "list" ? "list" : "dashboard"

    return (
        <div className="Body orange">
            <header className=" px-4">
                <NavBarTop />

                <SubHeader qty={announceList.length} type={"annonce " + `${categorySelected != announceCategories[0] ? categorySelected : ""} `} />

                <TabsMenu labels={announceTabs} subMenu={false} />
                <div className={`flex items-center justify-center gap-4 lg:px-8`} >
                    <CategoriesSelect categoriesArray={announceCategories} change={change} categorySelected={categorySelected} />
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
                        <AnnouncesGridComp key={index} line={line} change={change} mines={mines} view={view}
                            handleClickDelete={handleClickDelete} handleLike={(post: post) => handleLike(post)} user={user.id} />
                    ))}
                {
                    view === "dashboard" &&
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-4 w-full gap-4">
                        {announceList.map((announce, index) => (
                            <div className="pt-6 h-[35Vh]" key={index}>
                                <AnnouncesComp
                                    post={announce}
                                    change={change}
                                    mines={mines}
                                    key={announce.id}
                                    isLiked={isLiked(announce)}
                                    isFlaged={isFlaged(announce)}
                                    handleClickDelete={handleClickDelete}
                                    handleLike={(post: post) => handleLike(post)} />
                            </div>
                        ))}
                    </div>
                }
            </main>
            <NavBarBottom addBtn={true} />
        </div>
    )
}