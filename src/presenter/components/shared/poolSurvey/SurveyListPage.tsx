//import from REACT & REACT ROUTER DOM
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import Skeleton from "react-loading-skeleton";
import { Pool } from "../../../../domain/entities/Pool";
import { Survey } from "../../../../domain/entities/Survey";
import { PoolService, PoolSurveyService } from "../../../../domain/repositories-ports/PoolRepository";
import { SurveyService } from "../../../../domain/repositories-ports/SurveyRepository";
import { dayMS } from "../../../../infrastructure/services/utilsService";
import CheckCard from "../../common/CheckCard";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import { PoolCard } from "./poolSurveyComp/PoolCard";
import { SurveyCard } from "./poolSurveyComp/SurveyCard";


export default function SurveyListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = { tab: searchParams.get("search"), category: searchParams.get("category") };
    const [poolsSurveys, setPoolsSurveys] = useState<(Pool | Survey)[]>([]);
    const [myPoolsSurveys, setMyPoolsSurveys] = useState<(Pool | Survey)[]>([]);
    const [pools, setPools] = useState<Pool[]>([]);
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<(Pool | Survey)[]>([]);
    const [tabSelected, setTabSelected] = useState<string>("")
    const [mines, setMines] = useState<boolean>(false);
    const [tabledList, setTabledList] = useState<(Pool | Survey)[]>([]);
    const [notif, setNotif] = useState<string>("")
    const fifteenDaysAgo = new Date().getTime() - 15 * dayMS;
    const { getPools } = new PoolService();
    const { getPoolsSurveys, getPoolsSurveysMines, } = new PoolSurveyService()
    const { getSurveys } = new SurveyService();

    const UpdateList = async () => {
        const poolsSurveys = await getPoolsSurveys();
        const pools = await getPools();
        const surveys = await getSurveys()
        const myPoolsSurveys = await getPoolsSurveysMines()
        setPoolsSurveys(poolsSurveys)
        setMyPoolsSurveys(myPoolsSurveys)
        setPools(pools)
        setSurveys(surveys)
        switch (tabSelected) {
            case "mines": setList(myPoolsSurveys); break;
            case "pools": setList(pools); break;
            case "surveys": setList(surveys); break;
            default: setList(poolsSurveys); break;
        }
        setTabledList(list)
        poolsSurveys.length > 0 && setLoading(false);
        setNotif('')
    }

    useEffect(() => {
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${params.tab}"]`)
        const fetch = async () => await UpdateList()
        fetch().then(() => Tab && Tab.click())
    }, []);

    const filterTab = async (newArray: (Pool | Survey)[], value: string) => {
        if (value !== tabSelected) { setBoxSelected(boxArray); await UpdateList(); }
        setList(newArray)
        setTabledList(newArray)
        setTabSelected(value)
        value === "mines" ? setMines(true) : setMines(false);
        setSearchParams({ search: value });
    };

    const tabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab([...poolsSurveys], "") },
        { label: "cagnottes", value: "pools", result: () => filterTab([...pools], "pools") },
        { label: "sondages", value: "surveys", result: () => filterTab([...surveys], "surveys") },
        { label: "les miens", value: "mines", result: () => filterTab([...myPoolsSurveys], "mines") },
    ];

    const boxArray = ["nouveau", "en cours", "terminé"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray)

    const filterCheck = (boxSelected: string[]) => {
        const filters = [
            boxSelected.includes(boxArray[0]) ? [...tabledList.filter(element => { return new Date(element.createdAt).getTime() > fifteenDaysAgo })] : [],
            boxSelected.includes(boxArray[1]) ? [...tabledList.filter(element => { return element.Votes && element?.Votes?.length > 0 })] : [],
            boxSelected.includes(boxArray[2]) ? [...tabledList.filter(element => { return new Date(element.createdAt).getTime() < fifteenDaysAgo; })] : [],
        ]
        return [...new Set(filters.flat())];
    }

    useEffect(() => setList(filterCheck(boxSelected)), [boxSelected])

    useEffect(() => {
        if (list.length === 0 && !loading) {
            if (tabSelected === "pools") { setNotif(`Aucune cagnotte n'a été trouvée`) }
            else if (tabSelected === "surveys") { setNotif(`Aucun sondage n'a été trouvé`) }
            else { setNotif(`Aucun sondage ou cagnotte n'a été trouvé`) }
        }
        else { setNotif('') }
    }, [list, tabledList])

    return (

        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader qty={list.length > 0 ? list.length : 'aucun'} type={tabSelected === "pools" && "cagnottes" || tabSelected === "surveys" && "sondages" || 'sondages ou cagnottes'} />
                <TabsMenu labels={tabs} />
                <CheckCard
                    categoriesArray={boxArray}
                    boxSelected={boxSelected}
                    setBoxSelected={setBoxSelected}
                    color={"orange-500"} />
                <div className={(!loading && notif ? "w-full flex justify-center p-8" : "hidden")}>{notif}</div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 pt-2 w-full gap-3">
                {loading ?
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            count={10} height={300}
                            className="my-2.5 !rounded-xl shadow-lg" />
                    )) :
                    list.map((element: any, index: number) =>

                        element.category ?
                            <div className="pt-6 h-[calc(40Vh+2rem)] w-respLarge" key={index}>
                                <SurveyCard
                                    survey={element}
                                    key={index}
                                    change={() => { const Tab: HTMLElement | null = document.querySelector(`li[data-value="surveys"]`); Tab && Tab.click(); }}
                                    mines={mines}
                                    update={UpdateList} />
                            </div> :
                            <div className="pt-6 h-[calc(40Vh+2rem)] w-respLarge" key={index}>
                                <PoolCard
                                    pool={element}
                                    key={index}
                                    change={() => { const Tab: HTMLElement | null = document.querySelector(`li[data-value="pools"]`); Tab && Tab.click(); }}
                                    mines={mines}
                                    update={UpdateList} /></div>
                    )}

            </main>

            <NavBarBottom addBtn={true} color={'orange'} />
        </div>
    );
}
