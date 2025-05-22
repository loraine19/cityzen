import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ServiceCategory, ServiceFilter, ServiceStepFilter } from "../../../../domain/entities/Service";
import CheckCard from "../../common/CheckCard";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SelectSearch from "../../common/SelectSearch";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import ServiceComp from "./serviceCards/ServiceCard";
import { Label, TabLabel } from "../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from '../../../../di/ioc';
import { getLabel } from "../../../views/viewsEntities/utilsService";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { ServiceView } from "../../../views/viewsEntities/serviceViewEntity";
import { serviceCategories, serviceCategoriesS } from "../../../constants";

export default function ServicesPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [searchCat, setSearchCat] = useState<Label>({ label: 'tous', value: '' });
    const [mine, setMine] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const serviceViewModelFactory = DI.resolve('serviceViewModel');
    const { services, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = serviceViewModelFactory(mine, type, step, category);
    const [customFilter, setCustomFilter] = useState<boolean>(false);
    const [customList, setCustomList] = useState<ServiceView[]>([]);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }

    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);

    const boxArray = ["offre", "demande", "nouveau", "en attente", "en cours", "terminé", "litige"];
    const filterName = (): string => mine && 'les miens' || filter === ServiceFilter.GET && 'demande' || filter === ServiceFilter.DO && 'offre' || ''
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


    const filterTab = async (value?: ServiceFilter) => {
        setCustomFilter(false);
        setParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        setMine(false)
        switch (value) {
            case ServiceFilter.MINE: { setMine(true), setType(''), setStep(''), setBoxSelected(boxArray) }; break;
            case ServiceFilter.GET: { setMine(false), setType('GET'), setStep('') }; break;
            case ServiceFilter.DO: { setMine(false), setType('DO'), setStep('') }; break;
            default: { setMine(false), setType(''), setStep('') }; break;
        }
        setParams({ filter: value as string || '', category: category })
    };

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "demande", value: ServiceFilter.GET, result: () => filterTab(ServiceFilter.GET) },
        { label: "offre", value: ServiceFilter.DO, result: () => filterTab(ServiceFilter.DO) },
        { label: "les miens", value: ServiceFilter.MINE, result: () => filterTab(ServiceFilter.MINE) },
    ]

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
            setCustomList(services && list.filter((service: ServiceView) =>
                service.category.toString() === (value) ||
                service.categoryS.includes(label) ||
                service.typeS.includes(label) ||
                service.title.toLowerCase().includes(label.toLowerCase()) ||
                service.description.toLowerCase().includes(label.toLowerCase()) ||
                service.User.Profile.firstName.toLowerCase().includes(label.toLowerCase())
            ))
        }
    };

    useEffect(() => {
        !isLoading && setNotif(count > 0 ? '' : `Aucun service ${tabSelected} ${category !== '' && category ? ' ' + searchCat.label.toLowerCase() : ''} n'a été trouvé`);
        !error && setNotif('erreur de chargement des services');
    }, [services]);

    useEffect(() => {
        const notifUpdate =
            (count === 0 && !isLoading) &&
            `Aucun service ${filter !== '' ? getLabel(filter, serviceTabs).toLowerCase() : ''} ${category !== '' ? getLabel(category, serviceCategories).toLowerCase() : ''} n'a été trouvé`
            || error && "Erreur lors du chargement des services, veuillez réessayer plus tard"
            || '';
        setNotif(notifUpdate);
    }, [services, isLoading, error, filter, category]);

    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                hasNextPage && fetchNextPage()
            } else {
                setIsBottom(false);
            }
        }
    }

    const [list, setList] = useState<ServiceView[]>(services);
    useEffect(() => { setList(services) }, [isLoading, refetch, count])

    const sortList = [
        {
            label: "Publié le",
            icon: "event",
            action: () => setList([...services].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())),
            reverse: () => setList([...services].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
        },
        {
            label: "Titre", icon: "sort_by_alpha",
            action: () => setList([...services].sort((a, b) => a.title.localeCompare(b.title))),
            reverse: () => setList([...services].sort((a, b) => b.title.localeCompare(a.title)))
        }
    ]
    const [selectedSort, setSelectedSort] = useState<String>(sortList[0].label)

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    qty={count}
                    type={`services ${filterName()} ${category ? ServiceCategory[category as string as keyof typeof ServiceCategory] : ''}`} />

                <TabsMenu
                    labels={serviceTabs}
                    sortList={sortList}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort} />
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
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>
            <main
                ref={divRef}
                onScroll={() => handleScroll()}
                className="Grid">
                {isLoading || error ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4} />
                    ))
                    :
                    !customFilter ?
                        list.map((service: ServiceView, index: number) => (
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
            </main>
            <NavBarBottom addBtn={true} />
        </div>
    );
}
