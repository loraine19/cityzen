import { useContext, useEffect, useState } from "react";
import NavBarBottom from "../../components/NavBarBottom"
import NavBarTop from "../../components/NavBarTop";
import SubHeader from "../../components/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import { serviceCategories } from "../../datas/enumsCategories";
import { label } from "../../types/label";
import { deleteElement, imIn, takeElement, GetCategory } from '../../functions/GetDataFunctions';
import UserContext from "../../contexts/user.context";
import DataContext from "../../contexts/data.context";
import { Service } from "../../types/class";
import ServiceComp from "../../components/servicesComps/ServiceComp";
import { useSearchParams } from "react-router-dom";
import { CheckCard } from "../../components/CheckCard";
import { SelectSearch } from "../../components/SelectSearch";

export default function ServicesPage() {
    const { user } = useContext(UserContext);
    const { data, setDataInLocal } = useContext(DataContext);
    const { flags } = data;
    const [categorySelected, setCategorySelected] = useState<string>(serviceCategories[0]);
    const [notif, setNotif] = useState<string>('');
    const [copy, setCopy] = useState<Service[]>([...data.services])
    const [services, setServices] = useState<Service[]>([...data.services])
    const [mines, setMines] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<string>("mines");
    const [servicesTabled, setServicesTabled] = useState<Service[]>([...data.services]);
    const isFlaged = (element: any) => { return imIn(element, flags, user.id) ? true : false };
    const activeTab: any = document.querySelector(`li[data-value="${tabSelected}"]`);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = (searchParams.get("search"))

    useEffect(() => {
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${params}"]`);
        params && Tab && Tab.click();
    }, [params])

    useEffect(() => {
        setCopy([...data.services])
    }, [data.services])


    const handleClickDelete = (id: number) => {
        deleteElement(id, services, setServices);
        setDataInLocal({ ...data, services: data.services.filter((service: Service) => service.id !== id) })
    }

    const handleTake = async (id: number) => {
        takeElement(id, copy, setCopy, user)
        setDataInLocal({ ...data, services: copy })
        await activeTab.click();
    }

    const boxArray = ["offre", "demande", "nouveau", "en attente", "en cours", "terminé"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray);

    function selectBox(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.checked ? boxSelected.push(e.target.value) : boxSelected.splice(boxSelected.indexOf(e.target.value), 1)
        setBoxSelected([...boxSelected])
        return boxSelected
    }

    const filterCheck = (boxSelected: string[]) => {
        let box0 = boxSelected.includes(boxArray[0]) ? copy.filter((service: Service) => (service.user_id === user.user_id || service.user_id_resp === user.user_id) && service.type === boxSelected[0]) : []
        let box1 = boxSelected.includes(boxArray[1]) ? copy.filter((service: Service) => (service.user_id === user.user_id || service.user_id_resp === user.user_id) && service.type === boxSelected[1]) : []
        let box2 = boxSelected.includes(boxArray[2]) ? copy.filter((service: Service) => (service.user_id === user.user_id || service.user_id_resp === user.user_id) && service.status === 0) : []
        let box3 = boxSelected.includes(boxArray[3]) ? copy.filter((service: Service) => (service.user_id === user.user_id || service.user_id_resp === user.user_id) && service.status === 1) : []
        let box4 = boxSelected.includes(boxArray[4]) ? copy.filter((service: Service) => (service.user_id === user.user_id || service.user_id_resp === user.user_id) && service.status === 2) : []
        let box5 = boxSelected.includes(boxArray[5]) ? copy.filter((service: Service) => (service.user_id === user.user_id || service.user_id_resp === user.user_id) && service.status === 3) : []
        let concat = [...box0, ...box1, ...box2, ...box3, ...box4, ...box5]
        return concat
    }

    useEffect(() => {
        setServices(filterCheck(boxSelected))
    }, [boxSelected])



    const filterServices = (newArray: Service[], value: string) => {
        value !== tabSelected && setCategorySelected(serviceCategories[0]);
        setServicesTabled(newArray);
        setServices(newArray);
        setTabSelected(value);
        setSearchParams({ search: value });
        value === "mines" ? setMines(true) : setMines(false);
    }

    const serviceTabs: label[] = [{
        label: "tous",
        value: "",
        result: () => { filterServices((copy).filter((service: Service) => service.status < 1 || user.user_id === service.user_id || user.user_id === service.user_id_resp), serviceTabs[0].value) }
    },
    {
        label: "demande",
        value: "get",
        result: () => { filterServices((copy).filter((service: Service) => service.type === "get"), serviceTabs[1].value) }
    },
    {
        label: "offre",
        value: "do",
        result: () => { filterServices((copy).filter((service: Service) => service.type === "do"), serviceTabs[2].value) }
    },
    {
        label: "les miens",
        value: "mines",
        result: () => { filterServices((copy).filter((service: Service) => service.user_id === user.id || service.user_id_resp === user.id), serviceTabs[3].value) }
    },
    ]


    const [cat, setCat] = useState<string>("")
    const search = (cat: string) => {
        const Tab: HTMLElement | null = document.querySelector(`li[data-value="${tabSelected}"]`);

        setCategorySelected(cat);
        Tab && Tab.click();
        let copy2 = servicesTabled.filter((service: Service) => GetCategory(service, serviceCategories) === cat || service.title.toLowerCase().includes(cat.toLowerCase()) || service.description.toLowerCase().includes(cat.toLowerCase()))
        setServices([...copy2])
    }

    //// USE EFFECT 
    useEffect(() => {
        services.length > 0 ? setNotif('') : setNotif(`Aucune annonce ${tabSelected} ${categorySelected != serviceCategories[0] && categorySelected ? "de la catégorie " + categorySelected : ""} n'a été trouvé`);
    }, [services])



    return (
        <div className="Body cyan">
            <header className=" px-4">
                <NavBarTop />
                <SubHeader qty={services.length} type={"service " + `${categorySelected != serviceCategories[0] ? categorySelected : ""} `} />
                <TabsMenu labels={serviceTabs} subMenu={false} />
                {mines ?
                    <CheckCard
                        categoriesArray={boxArray}
                        change={(e) => { selectBox(e) }}
                        setBoxSelected={setBoxSelected} />
                    :
                    <SelectSearch cat={cat} setCat={setCat} category={serviceCategories} search={(cat: string) => search(cat)} />
                }
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>

            <main>
                <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 w-full gap-4">
                    {services.map((service: Service, index: number) => (
                        <div className="pt-6 h-[calc(40Vh+2rem)]  w-respLarge" key={index}>
                            <ServiceComp
                                service={service}
                                change={(cat: string) => search(cat)}
                                mines={mines}
                                key={service.id}
                                isFlaged={isFlaged(service)}
                                handleClickDelete={handleClickDelete}
                                handleClickTake={handleTake}
                            />
                        </div>
                    ))}
                </div>

            </main>
            <NavBarBottom addBtn={true} />
        </div>
    )
}