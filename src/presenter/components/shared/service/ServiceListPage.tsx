import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ServiceCategory, ServiceFilter, ServiceSort, ServiceStepFilter } from "../../../../domain/entities/Service";
import CheckCard from "../../common/CheckCard";
import SelectSearch from "../../common/SelectSearch";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import ServiceComp from "./serviceCards/ServiceCard";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from '../../../../di/ioc';
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { ServiceView } from "../../../views/viewsEntities/serviceViewEntity";
import { serviceCategoriesS } from "../../../constants";
import NotifDiv from "../../common/NotifDiv";

export default function ServicesPage() {
    const [notif, setNotif] = useState<string>('l');
    const [tabSelected] = useState<string>('');
    const [searchCat, setSearchCat] = useState<Label>({ label: 'tous', value: '' });
    const [mine, setMine] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [customFilter, setCustomFilter] = useState<boolean>(false);
    const [customList, setCustomList] = useState<ServiceView[]>([])
    const [sort, setSort] = useState<ServiceSort>(ServiceSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }

    //// VIEW MODEL
    const serviceViewModelFactory = DI.resolve('serviceViewModel');
    const { services, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = serviceViewModelFactory(mine, type, step, category, sort, reverse);
    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case ServiceFilter.MINE: return 'les miens';
            case ServiceFilter.DO: return 'offres';
            case ServiceFilter.GET: return 'demandes';
            default: return '';
        }
    }
    const stepName = (): string => ServiceStepFilter[step as keyof typeof ServiceStepFilter] ?? ''
    const categoryName = (): string => ServiceCategory[category as string as keyof typeof ServiceCategory] ?? ''

    //// BOXES FILTER
    const boxArray = ["offre", "demande", "nouveau", "en attente", "en cours", "terminé", "litige"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray)

    const CheckboxesFilter = () => {
        setCustomFilter(false);
        let steps = [];
        let types = [];
        boxSelected.includes(boxArray[0]) && types.push(ServiceFilter.DO);
        boxSelected.includes(boxArray[1]) && types.push(ServiceFilter.GET);
        boxSelected.includes(boxArray[2]) && steps.push(ServiceStepFilter.STEP_0);
        boxSelected.includes(boxArray[3]) && steps.push(ServiceStepFilter.STEP_1);
        boxSelected.includes(boxArray[4]) && steps.push(ServiceStepFilter.STEP_2);
        boxSelected.includes(boxArray[5]) && steps.push(ServiceStepFilter.STEP_3);
        boxSelected.includes(boxArray[6]) && steps.push(ServiceStepFilter.STEP_4);
        if (boxSelected.length === 0) {
            setType('');
            setStep('');
        }
        else {
            setStep(steps.join(','));
            setType(types.join(','));
        }
    }
    useEffect(() => { mine && CheckboxesFilter() }, [boxSelected]);

    //// FILTER TAB
    const filterTab = async (value?: ServiceFilter) => {
        setCustomFilter(false);
        setParams({ filter: value as string || '', category });
        value !== filter && setCategory('')
        setFilter(value || '');
        setMine(false)
        switch (value) {
            case ServiceFilter.MINE: { setMine(true), setType(''), setStep(''), setBoxSelected(boxArray) } break;
            case ServiceFilter.GET: { setType('GET'), setStep('') }; break;
            case ServiceFilter.DO: { setType('DO'), setStep('') }; break;
            default: { setType(''), setStep('') }; break;
        }
        setParams({ filter: value as string || '', category })
    };

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "demande", value: ServiceFilter.GET, result: () => filterTab(ServiceFilter.GET) },
        { label: "offre", value: ServiceFilter.DO, result: () => filterTab(ServiceFilter.DO) },
        { label: "les miens", value: ServiceFilter.MINE, result: () => filterTab(ServiceFilter.MINE) },
    ]

    //// SEARCH
    const search = (searchLabel: Label) => {
        setCustomFilter(false);
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
        else if (label !== 'tous') {
            setCustomFilter(true);
            setCustomList(services && services.filter((service: ServiceView) =>
                service.category.toString() === (value) ||
                service.categoryS.includes(label) ||
                service.typeS.includes(label) ||
                service.title.toLowerCase().includes(label.toLowerCase()) ||
                service.description.toLowerCase().includes(label.toLowerCase()) ||
                service.User.Profile.firstName.toLowerCase().includes(label.toLowerCase())
            ))
        }
    };

    //// NOTIFICATION
    useEffect(() => {
        switch (true) {
            case (count === 0 && !isLoading): setNotif(`Aucun service ${filterName()} ${stepName()} n'a été trouvé`); break;
            case (error): setNotif("Erreur lors du chargement, veuillez réessayer plus tard"); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, step]);

    //// HANDLE SCROLL
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                hasNextPage && fetchNextPage()
            }
            else setIsBottom(false)
        }
    }

    //// SORT LIST

    const sortList: SortLabel[] = [
        {
            label: "Publié le",
            key: ServiceSort.CREATED_AT,
            icon: "event",
            action: () => refetch(),
        },
        {
            key: ServiceSort.USER,
            label: "Utilisateur", icon: "person",
            action: () => refetch(),
        },
        {
            key: ServiceSort.TITLE,
            label: "Titre", icon: "sort_by_alpha",
            action: () => refetch(),
        },
        {
            key: ServiceSort.SKILL,
            label: "Compétence", icon: "design_services",
            action: () => refetch()
        },
        {
            key: ServiceSort.HARD,
            label: "Difficulté", icon: "signal_cellular_alt",
            action: () => refetch()
        }
    ]

    //// RENDER
    return (

        <main>
            <div className="sectionHeader">

                <TabsMenu
                    labels={serviceTabs}
                    sortList={sortList}
                    selectedSort={sort}
                    setSelectedSort={setSort}
                    reverse={reverse}
                    setReverse={setReverse}
                />
                {mine ?
                    <CheckCard
                        categoriesArray={boxArray}
                        boxSelected={boxSelected}
                        setBoxSelected={setBoxSelected} />
                    :
                    <SelectSearch
                        searchCat={searchCat}
                        setSearchCat={setSearchCat}
                        category={serviceCategoriesS}
                        search={search} />
                }

                {notif &&
                    <NotifDiv
                        notif={notif}
                        isLoading={isLoading}
                        refetch={refetch} />}  <SubHeader
                    qty={count}
                    type={`services ${filterName()} ${categoryName()}`} />
            </div>
            <section
                ref={divRef}
                onScroll={() => handleScroll()}
                className="Grid">
                {isLoading || error || !services ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4} />
                    ))
                    :
                    !customFilter ?
                        services.map((service: ServiceView, index: number) => (
                            <div className="SubGrid" key={index}>
                                <ServiceComp
                                    key={service.id}
                                    service={service}
                                    change={search as any}
                                    mines={mine}
                                    update={refetch} />
                            </div>)) :
                        customList.map((service: ServiceView, index: number) => (
                            <div className="SubGrid" key={index}>
                                <ServiceComp
                                    key={service.id}
                                    service={service}
                                    change={search as any}
                                    mines={mine}
                                    update={refetch} />

                            </div>
                        ))}
                <LoadMoreButton
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={() => handleScroll()} />
            </section>
        </main>
    );
}
