import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Service, ServiceFilter, ServiceStep } from "../../../../domain/entities/Service";
import { serviceCategories, getLabel, getValue } from "../../../../infrastructure/services/utilsService";
import CheckCard from "../../common/CheckCard";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SelectSearch from "../../common/SelectSearch";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import ServiceComp from "./servicesComps/ServiceCard";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from '../../../../di/ioc';
import { Icon } from "../../common/SmallComps";


export default function ServicesPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [tabledList] = useState<Service[]>([]);
    const [cat, setCat] = useState<string>('')
    !serviceCategories.some(category => category.value === '') && serviceCategories.unshift({ label: 'tous', value: '' })
    const [mine, setMine] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const label = getLabel(category, serviceCategories);
    const serviceViewModelFactory = DI.resolve('serviceViewModel');
    const { services, isLoading, error, fetchNextPage, hasNextPage, refetch } = serviceViewModelFactory(mine, type, step, category);

    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    //
    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);

    const boxArray = ["offre", "demande", "nouveau", "en attente", "en cours", "terminé", "litige"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray)


    useEffect(() => {
        //if (mine) setServiceList(filterCheck(boxSelected));
        boxSelected.includes(boxArray[0]) && setType('DO')
        boxSelected.includes(boxArray[1]) && setType('GET')
        if (boxSelected.includes(boxArray[0]) && boxSelected.includes(boxArray[1])) { setType('') }
        boxSelected.includes(boxArray[2]) && setStep(ServiceStep.STEP_0 as unknown as string)
        boxSelected.includes(boxArray[3]) && setStep(ServiceStep.STEP_1 as unknown as string)
        boxSelected.includes(boxArray[4]) && setStep(ServiceStep.STEP_2 as unknown as string)
        boxSelected.includes(boxArray[5]) && setStep(ServiceStep.STEP_3 as unknown as string)
        boxSelected.includes(boxArray[6]) && setStep(ServiceStep.STEP_4 as unknown as string)
        if (boxSelected.length === 0) { setType(''), setStep('') }

        update()
        console.log(services)
    }, [boxSelected]);

    const update = async () => { await refetch() }

    const filterTab = async (value?: ServiceFilter) => {
        setParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        console.log('value', value)
        setMine(false)
        switch (value) {
            case ServiceFilter.MINE: { setMine(true), setType(''), setStep(''), setBoxSelected(boxArray) }; break;
            case ServiceFilter.GET: { setMine(false), setType('GET'), setStep('') }; break;
            case ServiceFilter.DO: { setMine(false), setType('DO'), setStep('') }; break;
            default: { setMine(false), setType(''), setStep('') }; break;
        }
        setParams({ filter: value as string || '', category: category })
        update()
    };

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "demande", value: ServiceFilter.GET, result: () => filterTab(ServiceFilter.GET) },
        { label: "offre", value: ServiceFilter.DO, result: () => filterTab(ServiceFilter.DO) },
        { label: "les miens", value: ServiceFilter.MINE, result: () => filterTab(ServiceFilter.MINE) },
    ]

    const search = (cat: string) => {
        let value = getValue(cat, serviceCategories);
        setCategory(value);
        const result = tabledList.filter(service =>
            service.category.toString() === value ||
            service.title.toLowerCase().includes(cat.toLowerCase()) ||
            service.description.toLowerCase().includes(cat.toLowerCase())
        );
        console.log('result', result)
        //  setServices(value !== '' ? result : tabledList);
        setParams({ search: tabSelected, category: value });
    };

    useEffect(() => {
        !isLoading && setNotif(services.length > 0 ? '' : `Aucun service ${tabSelected} ${category !== '' && category ? ' ' + cat : ''} n'a été trouvé`);
    }, [services]);

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
    };

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader qty={services.length} type={`service ${category !== '' ? label : ''}`} />
                <TabsMenu labels={serviceTabs} />
                {mine ? (
                    <CheckCard categoriesArray={boxArray} boxSelected={boxSelected} setBoxSelected={setBoxSelected} />
                ) : (
                    <SelectSearch cat={cat} setCat={setCat} category={serviceCategories} search={search} />
                )}
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>
            <main>
                <div className="Grid">
                    {isLoading || error ?
                        [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                            <SkeletonGrid
                                key={index}
                                count={4} />
                        ))
                        :
                        services.map((service: Service, index: number) => (
                            <div className="SubGrid" key={index}>
                                <ServiceComp
                                    key={service.id}
                                    service={service}
                                    change={search}
                                    mines={mine}
                                    update={update} />
                            </div>
                        ))}
                    <div className="absolute bottom-8 bg-blue-gray-600 left-0 !w-full flex items-center justify-center z-50 ">
                        <Icon color='cyan' fill icon="keyboard_double_arrow_down" size="4xl" title="voir plus" style={(isBottom && hasNextPage) ? "mb-10" : "hidden"} onClick={handleScroll} /></div>
                </div>
            </main>
            <NavBarBottom addBtn={true} />
        </div>
    );
}
