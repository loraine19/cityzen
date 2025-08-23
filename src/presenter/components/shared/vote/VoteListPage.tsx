import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import CheckCard from "../../common/CheckCard";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import { PoolCard } from "./voteCards/PoolCard";
import { SurveyCard } from "./voteCards/SurveyCard";
import { SkeletonGrid } from "../../common/Skeleton";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import DI from "../../../../di/ioc";
import { PoolSurveyFilter, PoolSurveysFindParams, PoolSurveySort, PoolSurveyStep } from "../../../../domain/entities/PoolSurvey";
import { PoolSurveyView } from "../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteTarget } from "../../../../domain/entities/Vote";
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import SelectSearch from "../../common/SelectSearch";
import { surveyCategories } from "../../../constants";

export default function VoteListPage() {
    //// STATE
    const { navBottom } = useUxStore((state) => state);

    //// INITIALIZE
    const pageColor = 'orange'
    const [notif, setNotif] = useState<string>('');
    const [mine, setMine] = useState<boolean>(false)
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [sort, setSort] = useState<PoolSurveySort>(PoolSurveySort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);
    const [category, setCategory] = useState<string>('');
    const [searchString, setSearchString] = useState<string>('');

    //// VIEW MODEL
    const voteViewModelFactory = (params: PoolSurveysFindParams) => DI.resolve('voteViewModel')(params);
    const { poolsSurveys, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = voteViewModelFactory({
        filter: filter as PoolSurveyFilter,
        step: step as PoolSurveyStep,
        sort,
        reverse,
        search: searchString ?? category,
    });
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

    //// SEARCH
    const [searchCat, setSearchCat] = useState<Label>({ label: 'tous', value: '' });
    const [tabSelected] = useState<string>('');
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
        else if (label !== 'tous') setSearchString(label)
    };


    //// SORT LIST
    const sortList: SortLabel[] = [
        { label: "Créé le", icon: "event", key: PoolSurveySort.CREATED_AT },
        { label: "Titre", icon: "sort_by_alpha", key: PoolSurveySort.TITLE },
        { label: "Nombre de votes", icon: "smart_card_reader", key: PoolSurveySort.VOTES },
        { label: "Utilisateur", icon: "person", key: PoolSurveySort.USER }
    ]

    //// NOTIFICATION
    useEffect(() => {
        if (error) {
            setNotif(error.message || "Erreur inconnue");
            return;
        }
        switch (true) {
            case ((count === 0 || !poolsSurveys) && !isLoading): setNotif(`Aucun ${filterName()} ${stepName()} n'a été trouvé`); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, step]);

    //// HANDLE SCROLL
    const utils = DI.resolve('utils')
    const handleScroll = (params: HandleScrollParams) => utils.handleScroll(params)
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const onScroll = useCallback(() => {
        const params: HandleScrollParams = {
            divRef,
            hasNextPage,
            fetchNextPage,
            setIsBottom,
        }
        handleScroll(params)
    }, [divRef]);


    //// HANDLE HIDE  
    const handleHide = (params: HandleHideParams) => utils.handleHide(params)
    const { setHideNavBottom, hideNavBottom } = useUxStore((state) => state);
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide }
        handleHide(params)
    }, [divRef]);
    const [hide, setHide] = useState<boolean>(false);
    useEffect(() => { (hide !== hideNavBottom) && setHideNavBottom(hide) }, [hide]);




    return (

        <main className={navBottom ? "withBottom" : ""}>
            <div className="sectionHeader relative">

                <TabsMenu
                    labels={tabs}
                    sortList={sortList}
                    selectedSort={sort}
                    setSelectedSort={setSort}
                    reverse={reverse}
                    setReverse={setReverse}
                    action={refetch}
                />
                <div className="flex items-center flex-col-reverse lg:flex-row justify-between gap-4 " >

                    <CheckCard
                        categoriesArray={boxArray}
                        boxSelected={boxSelected}
                        setBoxSelected={setBoxSelected}
                        style={'flex-1'} />
                    <SelectSearch
                        searchCat={searchCat}
                        setSearchCat={setSearchCat}
                        category={filter === PoolSurveyFilter.SURVEY ? surveyCategories : []}
                        search={search}
                        style={' lg:w-1/3'} />

                </div>
                <SubHeader
                    qty={count > 0 ? count : 'aucun'}
                    type={`${filter === PoolSurveyFilter.SURVEY ? '' :
                        filter === PoolSurveyFilter.POOL ? '' :
                            'cagnottes et sondages'} ${filterName()}`} />
                {notif &&
                    <NotifDiv
                        error={error}
                        notif={notif}
                        isLoading={isLoading}
                        refetch={refetch} />}
            </div>
            {isLoading || !poolsSurveys ?
                <SkeletonGrid /> :
                <section
                    ref={divRef}
                    onScroll={() => { onScroll(); handleHideCallback() }}
                    className="Grid">

                    {poolsSurveys.map((element: PoolSurveyView, index: number) =>
                        element.type === VoteTarget.SURVEY ?
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
                            </div>)}


                    <LoadMoreButton
                        color={pageColor}
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll} />
                </section>}
        </main>
    );
}
