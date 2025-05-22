import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import CheckCard from "../../common/CheckCard";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import { PoolCard } from "./voteCards/PoolCard";
import { SurveyCard } from "./voteCards/SurveyCard";
import { SkeletonGrid } from "../../common/Skeleton";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { getLabel } from "../../../views/viewsEntities/utilsService";
import DI from "../../../../di/ioc";
import { PoolSurveyFilter, PoolSurveyStep } from "../../../../domain/entities/PoolSurvey";
import { PoolSurveyView } from "../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteTarget } from "../../../../domain/entities/Vote";


export default function VoteListPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [mine, setMine] = useState<boolean>(false)
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const voteViewModelFactory = DI.resolve('voteViewModel');
    const { poolsSurveys, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = voteViewModelFactory(filter, step);
    const [list, setList] = useState<any[]>(poolsSurveys);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), step: Params.get("step") }

    useEffect(() => {
        setStep(params.step || '');
        setFilter(params.filter || '')
    }, []);

    useEffect(() => { poolsSurveys && setList(poolsSurveys) }, [isLoading]);

    const boxArray = ["nouveau", "en attente", "validé", "rejeté"];
    const filterName = (): string => {
        switch (filter) {
            case PoolSurveyFilter.MINE: return 'les miens';
            case PoolSurveyFilter.POOL: return 'cagnottes';
            case PoolSurveyFilter.SURVEY: return 'sondages';
            default: return '';
        }
    }
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray)

    const CheckboxesFilter = () => {
        let steps = [];
        boxSelected.includes(boxArray[0]) && steps.push(PoolSurveyStep.NEW);
        boxSelected.includes(boxArray[1]) && steps.push(PoolSurveyStep.PENDING);
        boxSelected.includes(boxArray[2]) && steps.push(PoolSurveyStep.VALIDATED);
        boxSelected.includes(boxArray[3]) && steps.push(PoolSurveyStep.REJECTED);

        if (boxSelected.length === 0) {
            setStep('');
        }
        else {
            setStep(steps.join(','));
        }
    }

    useEffect(() => {
        CheckboxesFilter()
    }, [boxSelected]);


    const filterTab = async (value?: PoolSurveyFilter) => {
        setParams({ filter: value as string || '', step: step });
        if (value !== filter) { setStep('') }
        setFilter(value || '');
        setMine(false)
        switch (value) {
            case PoolSurveyFilter.MINE:
                { setMine(true), setStep(''), setBoxSelected(boxArray) };
                break;
            case PoolSurveyFilter.POOL:
                { setMine(false), setStep(''), setBoxSelected(boxArray) };
                break;
            case PoolSurveyFilter.SURVEY:
                { setMine(false), setStep(''), setBoxSelected(boxArray) };
                break;
            default:
                { setMine(false), setStep(''), setBoxSelected(boxArray) };
                break;
        }
        setParams({ filter: value as string || '', step: step })
    };

    const tabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "cagnotte", value: PoolSurveyFilter.POOL, result: () => filterTab(PoolSurveyFilter.POOL) },
        { label: "sondage", value: PoolSurveyFilter.SURVEY, result: () => filterTab(PoolSurveyFilter.SURVEY) },
        { label: "les miens", value: PoolSurveyFilter.MINE, result: () => filterTab(PoolSurveyFilter.MINE) },
    ]


    const sortList = [
        {
            label: "date",
            icon: "calendar_month",
            action: () => setList([...poolsSurveys].sort((a, b) => b.createdAt - a.createdAt)),
            reverse: () => setList([...poolsSurveys].sort((a, b) => a.createdAt - b.createdAt))
        },
        {
            label: "nom",
            icon: "sort_by_alpha",
            action: () => setList([...poolsSurveys].sort((a, b) => a.title.localeCompare(b.title))),
            reverse: () => setList([...poolsSurveys].sort((a, b) => b.title.localeCompare(a.title)))
        },
        {
            label: "Nombre de votes",
            icon: "smart_card_reader",
            action: () => setList([...poolsSurveys].sort((a, b) => b.pourcent - a.pourcent)),
            reverse: () => setList([...poolsSurveys].sort((a, b) => a.pourcent - b.pourcent))
        }
    ];

    useEffect(() => {
        !isLoading && setNotif(count > 0 ? '' : `Aucun  ${tabSelected} ${step !== '' && step ? ' ' : ''} n'a été trouvé`);
    }, [isLoading]);

    useEffect(() => {
        const notifUpdate =
            (count === 0 && !isLoading) &&
            `Aucun ${filter !== '' ? getLabel(filter, tabs).toLowerCase() : ''} ${step !== '' ? filterName() : ''} n'a été trouvé`
            || error && "Erreur lors du chargement des sondages, veuillez réessayer plus tard"
            || '';
        setNotif(notifUpdate);
    }, [isLoading, error, filter, step]);

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
        <>
            <div className="Body orange">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader
                        qty={count > 0 ? count : 'aucun'}
                        type={tabSelected === "pools" && "cagnottes" ||
                            tabSelected === "surveys" && "sondages" || 'sondages ou cagnottes'} />
                    <TabsMenu labels={tabs} sortList={sortList} color={"orange"} />
                    <CheckCard
                        categoriesArray={boxArray}
                        boxSelected={boxSelected}
                        setBoxSelected={setBoxSelected}
                        color={"orange-500"} />
                    <div className={(!isLoading && notif ? "w-full flex justify-center p-8" : "hidden")}>
                        {notif}
                    </div>
                </header>
                <main ref={divRef}
                    onScroll={() => handleScroll()}
                    className="Grid">
                    {isLoading || !poolsSurveys ?
                        [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                            <SkeletonGrid
                                key={index}
                                count={4} />
                        )) :
                        list.map((element: PoolSurveyView, index: number) =>
                            element.typeS === VoteTarget.SURVEY ?
                                <div className="SubGrid" key={'div' + index}>
                                    <SurveyCard
                                        survey={element}
                                        key={index}
                                        change={() => {
                                            const Tab: HTMLElement | null = document.querySelector(`li[data-value="surveys"]`);
                                            Tab && Tab.click();
                                        }}
                                        mines={mine}
                                        update={refetch} />
                                </div> :
                                <div className="SubGrid " key={'div' + index}>
                                    <PoolCard
                                        pool={element}
                                        key={index}
                                        change={() => {
                                            const Tab: HTMLElement | null = document.querySelector(`li[data-value="pools"]`);
                                            Tab && Tab.click();
                                        }}
                                        mines={mine}
                                        update={refetch}
                                    />
                                </div>
                        )}
                    <LoadMoreButton
                        color={'orange'}
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={() => handleScroll()} />
                </main>
                <NavBarBottom
                    addBtn={true}
                    color={'orange'} />
            </div>
        </>
    );
}
