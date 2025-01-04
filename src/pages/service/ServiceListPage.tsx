import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckCard from "../../components/UIX/CheckCard";
import NavBarBottom from "../../components/UIX/NavBarBottom";
import NavBarTop from "../../components/UIX/NavBarTop";
import SelectSearch from "../../components/UIX/SelectSearch";
import SubHeader from "../../components/UIX/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import ServiceComp from "../../components/servicesComps/ServiceComp";
import { label } from "../../types/label";
import { Service, ServiceStep } from "../../types/class";
import UserContext from "../../contexts/user.context"
import { serviceCategories, getValue, getLabel } from '../../functions/GetDataFunctions';
import { getServices, getServicesDo, getServicesGet, getServicesImIn, getServicesImInGet, getServicesImInDo, getServicesImInStatus } from '../../functions/API/servicesApi';

export default function ServicesPage() {
    const { user } = useContext(UserContext)
    const [categorySelected, setCategorySelected] = useState<string>(serviceCategories[0].value);
    const [notif, setNotif] = useState<string>('');
    const [services, setServices] = useState<Service[]>([]);
    const [mines, setMines] = useState<boolean>(false);
    const [arrayToFilter] = useState<Service[]>([]);
    const [doServices, setDoServices] = useState<Service[]>([]);
    const [getsServices, setGetServices] = useState<Service[]>([]);
    const [myservices, setMyservices] = useState<Service[]>([]);
    const [myServicesGet, setMyServicesGet] = useState<Service[]>([]);
    const [myServicesDo, setMyServicesDo] = useState<Service[]>([]);
    const [myServicesNew, setMyServicesNew] = useState<Service[]>([]);
    const [myServicesWait, setMyServicesWait] = useState<Service[]>([]);
    const [myServicesDoing, setMyServicesDoing] = useState<Service[]>([]);
    const [myServicesDone, setMyServicesDone] = useState<Service[]>([]);
    const [myServicesLitige, setMyServicesLitige] = useState<Service[]>([]);
    const [tabSelected, setTabSelected] = useState<string>('');
    const [serviceList, setServiceList] = useState<Service[]>([]);
    const [tabledList, setTabledList] = useState<Service[]>([]);
    const label = getLabel(categorySelected, serviceCategories);
    const [searchParams, setSearchParams] = useSearchParams();
    const [cat, setCat] = useState<string>('')
    const params = { tab: searchParams.get("search"), category: searchParams.get("category") };
    !serviceCategories.some(category => category.value === '') && serviceCategories.unshift({ label: 'tous', value: '' })

    const UpdateList = async () => {
        const services = await getServices();
        const myservices = await getServicesImIn();
        const myServicesGet = await getServicesImInGet();
        const myServicesDo = await getServicesImInDo();
        const myServicesNew = await getServicesImInStatus('STEP_0');
        const myServicesWait = await getServicesImInStatus('STEP_1');
        const myServicesDoing = await getServicesImInStatus('STEP_2');
        const myServicesDone = await getServicesImInStatus('STEP_3');
        const myServicesLitige = await getServicesImInStatus('STEP_4');

        const doServices = await getServicesDo();
        const getsServices = await getServicesGet();
        setServices(services);
        setMyservices(myservices);
        setDoServices(doServices);
        setGetServices(getsServices);
        setMyServicesGet(myServicesGet);
        setMyServicesDo(myServicesDo);
        setMyServicesNew(myServicesNew);
        setMyServicesWait(myServicesWait);
        setMyServicesDoing(myServicesDoing);
        setMyServicesDone(myServicesDone);
        setMyServicesLitige(myServicesLitige);
        switch (tabSelected) {
            case "myservices": setServiceList(myservices); break;
            case "get": setServiceList(getsServices); break;
            case "do": setServiceList(doServices); break;
            default: setServiceList(services); break;
        }
    };

    useEffect(() => {
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${params.tab}"]`);
        const fetch = async () => await UpdateList();
        fetch().then(() => Tab && Tab.click());
    }, []);


    const boxArray = ["offre", "demande", "nouveau", "en attente", "en cours", "terminé", "litige"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray);

    const selectBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBoxSelected = e.target.checked
            ? [...boxSelected, e.target.value]
            : boxSelected.filter(value => value !== e.target.value);
        setBoxSelected(newBoxSelected);
    };

    const filterCheck = (boxSelected: string[]) => {
        const filters = [
            boxSelected.includes(boxArray[0]) ? myServicesDo : [],
            boxSelected.includes(boxArray[1]) ? myServicesGet : [],
            boxSelected.includes(boxArray[2]) ? myServicesNew : [],
            boxSelected.includes(boxArray[3]) ? myServicesWait : [],
            boxSelected.includes(boxArray[4]) ? myServicesDoing : [],
            boxSelected.includes(boxArray[5]) ? myServicesDone : [],
            boxSelected.includes(boxArray[6]) ? myServicesLitige : [],
        ];
        console.log(filters)
        return [...new Set(filters.flat())];
    };

    useEffect(() => {
        if (mines) setServiceList(filterCheck(boxSelected));
    }, [boxSelected]);

    const filterTab = async (newArray: Service[], value: string) => {
        if (value !== tabSelected) { setCategorySelected(''); setCat("tous"); await UpdateList() }
        setServiceList(newArray);
        setTabledList(newArray);
        setTabSelected(value);
        value === "myservices" ? setMines(true) : setMines(false);
        setSearchParams({ search: value, category: categorySelected });
    }

    const serviceTabs: label[] = [
        { label: "tous", value: '', result: () => filterTab([...services], '') },
        { label: "demande", value: "get", result: () => filterTab([...getsServices], "get") },
        { label: "offre", value: "do", result: () => filterTab([...doServices], "do") },
        { label: "les miens", value: "myservices", result: () => filterTab([...myservices], "myservices") },
    ]

    const search = (cat: string) => {
        const value = getValue(cat, serviceCategories);
        setCategorySelected(cat);
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${tabSelected}"]`);
        Tab && Tab.click();
        const result = tabledList.filter(service =>
            service.category.toString() === value ||
            service.title.toLowerCase().includes(cat.toLowerCase()) ||
            service.description.toLowerCase().includes(cat.toLowerCase())
        );
        setServices(value !== '' ? result : tabledList);
    };

    useEffect(() => {
        setNotif(serviceList.length > 0 ? '' :
            `Aucun service ${tabSelected} ${categorySelected !== '' && categorySelected ? ' ' + cat : ''} n'a été trouvé`);
    }, [services]);

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader qty={serviceList.length} type={`service ${categorySelected !== '' ? label : ''}`} />
                <TabsMenu labels={serviceTabs} subMenu={false} />
                {mines ? (
                    <CheckCard categoriesArray={boxArray} change={selectBox} setBoxSelected={setBoxSelected} />
                ) : (
                    <SelectSearch cat={cat} setCat={setCat} category={serviceCategories} search={search} />
                )}
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>
            <main>
                <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 w-full gap-4">
                    {serviceList.map((service, index) => (
                        <div className="pt-6 h-[calc(40Vh+2rem)] w-respLarge" key={index}>
                            <ServiceComp key={service.id} service={service} change={search} mines={mines} update={UpdateList} />
                        </div>
                    ))}
                </div>
            </main>
            <NavBarBottom addBtn={true} />
        </div>
    );
}
