import { useContext, useEffect, useState } from "react";
import { CategoriesSelect } from "../../components/CategoriesSelect";
import NavBarBottom from "../../components/NavBarBottom"
import NavBarTop from "../../components/NavBarTop";
import SubHeader from "../../components/SubHeader";
import TabsMenu from "../../components/TabsMenu";
import { announceCategories } from "../../datas/enumsCategories";
import { label } from "../../types/label";
import { deleteElement, imIn, takeElement } from '../../functions/GetDataFunctions';
import UserContext from "../../contexts/user.context";
import DataContext from "../../contexts/data.context";
import { Service } from "../../types/class";
import ServiceComp from "../../components/servicesComps/ServiceComp";
import { useSearchParams } from "react-router-dom";

export default function ServicesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = (searchParams.get("search"))

    useEffect(() => {
        const Tab: any = document.querySelector(`li[data-value="${params}"]`);
        Tab && Tab.click();
    }, [params])

    const { user } = useContext(UserContext);
    const { data, setDataInLocal } = useContext(DataContext);
    const { flags, profiles } = data;
    const [categorySelected, setCategorySelected] = useState<string>(announceCategories[0]);
    const [notif, setNotif] = useState<string>('');
    const [copy, setCopy] = useState<Service[]>([...data.services])
    const [services, setServices] = useState<Service[]>(copy)

    const [mines, setMines] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<string>('');
    const [servicesTabled, setServicesTabled] = useState<Service[]>([]);;

    const isFlaged = (element: any) => { return imIn(element, flags, user.id) ? true : false };
    const activeTab: any = document.querySelector(`li[data-value="${tabSelected}"]`);

    const handleClickDelete = (id: number) => {
        deleteElement(id, services, setServices);
        setDataInLocal({ ...data, services: data.services.filter((service: Service) => service.id !== id) })
    }

    const handleTake = async (id: number) => {
        takeElement(id, copy, setCopy, user)
        setDataInLocal({ ...data, services: copy })
        await activeTab.click();
    }


    /////FILTER FUNCTIONS
    const filterServices = (newArray: Service[], value: string) => {
        value !== tabSelected && setCategorySelected(announceCategories[0]);
        setServicesTabled(newArray);
        setServices(newArray);
        setTabSelected(value);
        setSearchParams({ search: value });
        value === "les miens" ? setMines(true) : setMines(false);
    }

    const serviceTabs: label[] = [{
        label: "tous",
        value: "",
        result: () => { filterServices((copy).filter((service: Service) => service.user_id_resp === 0 || service.user_id_resp === user.id), serviceTabs[0].value) }
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



    //// USE EFFECT 
    useEffect(() => {
        services.length > 0 ? setNotif('') : setNotif(`Aucune annonce ${tabSelected} ${categorySelected != announceCategories[0] && categorySelected ? "de la catégorie " + categorySelected : ""} n'a été trouvé`);
    }, [services])

    useEffect(() => {
        setCopy([...data.services])
    }, [data.services])
    return (
        <div className="Body cyan">
            <header className=" px-4">
                <NavBarTop />

                <SubHeader qty={services.length} type={"service " + `${categorySelected != announceCategories[0] ? categorySelected : ""} `} />

                <TabsMenu labels={serviceTabs} subMenu={false} />
                <div className={`flex items-center justify-center gap-4 lg:px-8`} >
                    <CategoriesSelect categoriesArray={announceCategories} change={() => { }} categorySelected={categorySelected} />
                    <button onClick={() => { }} >
                        <span className="material-symbols-outlined text-gray-700 !text-4xl flex items-center" >
                            search</span>
                    </button>
                </div>
                <div className={notif && "w-full flex justify-center p-8"}>{notif}</div>
            </header>

            <main>


                <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 w-full gap-4">
                    {services.map((service: Service, index: number) => (
                        <div className="pt-6 h-[calc(40Vh+2rem)]  w-respLarge" key={index}>
                            <ServiceComp
                                service={service}
                                change={() => { }}
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