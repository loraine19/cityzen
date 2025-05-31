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
import DI from "../../../../di/ioc";
import { PoolSurveyFilter, PoolSurveySort, PoolSurveyStep } from "../../../../domain/entities/PoolSurvey";
import { PoolSurveyView } from "../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteTarget } from "../../../../domain/entities/Vote";
import { Icon } from "../../common/IconComp";

export default function VoteListPage() {
    const pageColor = 'orange'
    const [notif, setNotif] = useState<string>('');
    const [mine, setMine] = useState<boolean>(false)
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [sort, setSort] = useState<PoolSurveySort>(PoolSurveySort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);
    const voteViewModelFactory = DI.resolve('voteViewModel');
    const { poolsSurveys, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = voteViewModelFactory(filter, step, sort, reverse);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), step: Params.get("step") }

    useEffect(() => { setStep(params.step || ''); setFilter(params.filter || '') }, []);

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case PoolSurveyFilter.MINE: return 'que j\'ai posté';
            case PoolSurveyFilter.POOL: return 'cagnottes';
            case PoolSurveyFilter.SURVEY: return 'sondages';
            default: return '';
        }
    }
    const stepName = (): string => {
        switch (step) {
            case PoolSurveyStep.NEW: return 'nouveau';
            case PoolSurveyStep.PENDING: return 'en attente';
            case PoolSurveyStep.VALIDATED: return 'validé';
            case PoolSurveyStep.REJECTED: return 'rejeté';
            default: return '';
        }
    }

    //// BOXES FILTER
    const boxArray = ["nouveau", "en attente", "validé", "rejeté"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray)
    const CheckboxesFilter = () => {
        let steps = [];
        boxSelected.includes(boxArray[0]) && steps.push(PoolSurveyStep.NEW);
        boxSelected.includes(boxArray[1]) && steps.push(PoolSurveyStep.PENDING);
        boxSelected.includes(boxArray[2]) && steps.push(PoolSurveyStep.VALIDATED);
        boxSelected.includes(boxArray[3]) && steps.push(PoolSurveyStep.REJECTED);
        boxSelected.length === 0 ? setStep('') : setStep(steps.join(','));
    }
    useEffect(() => { CheckboxesFilter() }, [boxSelected]);


    //// FILTER TAB
    const filterTab = async (value?: PoolSurveyFilter) => {
        setParams({ filter: value as string || '', step });
        value !== filter && setStep('')
        setFilter(value || '');
        setBoxSelected(boxArray)
        value === PoolSurveyFilter.MINE ? setMine(true) : setMine(false);
        setParams({ filter: value as string || '', step })
    };

    const tabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "cagnotte", value: PoolSurveyFilter.POOL, result: () => filterTab(PoolSurveyFilter.POOL) },
        { label: "sondage", value: PoolSurveyFilter.SURVEY, result: () => filterTab(PoolSurveyFilter.SURVEY) },
        { label: "les miens", value: PoolSurveyFilter.MINE, result: () => filterTab(PoolSurveyFilter.MINE) },
    ]


    //// SORT LIST
    const sortList = [
        {
            label: "Créé le",
            icon: "event",
            key: PoolSurveySort.CREATED_AT,
            action: async () => await refetch(),
        },
        {
            label: "Titre",
            icon: "sort_by_alpha",
            key: PoolSurveySort.TITLE,
            action: async () => await refetch(),
        },
        {
            label: "Nombre de votes",
            icon: "smart_card_reader",
            key: PoolSurveySort.VOTES,
            action: async () => await refetch(),
        },
        {
            label: "Utilisateur",
            icon: "person",
            key: PoolSurveySort.USER,
            action: async () => await refetch(),
        }
    ]

    //// NOTIFICATION
    useEffect(() => {
        switch (true) {
            case (isLoading): setNotif('Chargement...'); break;
            case (count === 0): setNotif(`Aucun ${filterName()} ${stepName()} n'a été trouvé`); break;
            case (error): setNotif("Erreur lors du chargement des sondages, veuillez réessayer plus tard"); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, step]);

    //// HANDLE SCROLL
    const divRef = useRef(null)
    const [isBottom, setIsBottom] = useState<boolean>(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                hasNextPage && fetchNextPage()
            } else setIsBottom(false)
        }
    }


    return (
        <div className={`Body ${pageColor}`}>
            <header>
                <NavBarTop />
                <SubHeader
                    qty={count > 0 ? count : 'aucun'}
                    type={`${filter === PoolSurveyFilter.SURVEY ? '' :
                        filter === PoolSurveyFilter.POOL ? '' :
                            'cagnottes et sondages'} ${filterName()}`} />
                <TabsMenu
                    labels={tabs}
                    sortList={sortList}
                    color={pageColor}
                    selectedSort={sort}
                    setSelectedSort={setSort}
                    reverse={reverse}
                    setReverse={setReverse}
                />
                <CheckCard
                    categoriesArray={boxArray}
                    boxSelected={boxSelected}
                    setBoxSelected={setBoxSelected}
                    color={"orange-500"} />
                {notif &&
                    <div className={'notif'}>
                        {notif}
                        <Icon
                            bg={!isLoading}
                            icon={isLoading ? '...' : 'refresh'}
                            onClick={() => refetch()} />
                    </div>}
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
                    poolsSurveys.map((element: PoolSurveyView, index: number) =>
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
                            <div className="SubGrid "
                                key={'div' + index}>
                                <PoolCard
                                    pool={element}
                                    key={index}
                                    change={() => {
                                        const Tab: HTMLElement | null = document.querySelector(`li[data-value="pools"]`);
                                        Tab && Tab.click();
                                    }}
                                    mines={mine}
                                    update={refetch} />
                            </div>
                    )}
                <LoadMoreButton
                    color={pageColor}
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={() => handleScroll()} />
            </main>
            <NavBarBottom
                addBtn={true}
                color={pageColor} />
        </div>
    );
}
