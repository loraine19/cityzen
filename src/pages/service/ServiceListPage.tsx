import NavBarTop from "../../components/NavBarTop";
import NavBarBottom from "../../components/NavBarBottom";
import TabsMenu from "../../components/TabsMenu";
import ServiceCard from "../../components/ServiceCard";
import { label } from "../../types/label";
import { useState } from "react";
import { servicesFaker } from "../../datas/fakers/servicesFaker";
import { service } from "../../types/service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/user.context";

export default function ServiceListPage() {
    const { user } = useContext(UserContext);
    const userConnectedId = user.id;

    //FUNCTION BOTTOM NAV
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/service/liste");
    };

    //REQUEST SERVICES
    const [servicesList, setServicesList] = useState<service[]>(servicesFaker);

    let [serviceMine, setServiceMine] = useState(false);

    //TAB NAV 1
    const labels: label[] = [
        {
            label: "Tous",
            value: "all",
            result: () => (setServicesList(servicesFaker), setServiceMine(false)),
        },
        {
            label: "Offres",
            value: "offers",
            result: () => (setServicesList(servicesFaker.filter((service) => service.type === "Offre")), setServiceMine(false)),
        },
        {
            label: "Demandes",
            value: "demands",
            result: () => (setServicesList(servicesFaker.filter((service) => service.type === "Demande")), setServiceMine(false)),
        },
        {
            label: "Mes services",
            value: "ownServices",
            result: () => (setServicesList(servicesFaker.filter((service) => service.user_id_get === userConnectedId || service.user_id_do === userConnectedId)), setServiceMine(true)),
        },
    ];

    //TAB NAV 2
    const labelsSubNav: label[] = [
        {
            label: "Tous",
            value: "all",
            result: () => (setServicesList(servicesFaker.filter((service) => service.user_id_get === userConnectedId || service.user_id_do === userConnectedId)), setServiceMine(true)),
        },
        {
            label: "En attente",
            value: "pending",
            result: () =>
                setServicesList(
                    servicesFaker
                        .filter((service) => service.user_id_get === userConnectedId || service.user_id_do === userConnectedId)
                        .filter((service) => service.user_id_get === undefined || service.user_id_do === undefined)
                ),
        },
        {
            label: "En cours",
            value: "ongoing",
            result: () =>
                setServicesList(
                    servicesFaker
                        .filter((service) => service.user_id_get === userConnectedId || service.user_id_do === userConnectedId)
                        .filter((service) => service.user_id_get !== undefined && service.user_id_do !== undefined && service.terminated !== true)
                ),
        },
        {
            label: "Terminés",
            value: "ended",
            result: () =>
                setServicesList(servicesFaker.filter((service) => service.user_id_get === userConnectedId || service.user_id_do === userConnectedId).filter((service) => service.terminated === true)),
        },
    ];

    //SEARCH ENGINE
    const [searchValue, setSearchValue] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setServicesList(
            servicesList.filter(
                (service) =>
                    service.category.includes(searchValue) || service.title.toLowerCase().includes(searchValue.toLowerCase()) || service.description.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
        const formElement = e.target as HTMLFormElement;
        formElement.reset();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    return (
        <div className="Body cyan">
            <main>
                <header className="h-auto">
                    <NavBarTop />
                    <h1 className="text-4xl font-thin px-2">
                        <span className="font-bold">{servicesList.length} services </span>dans votre quartier
                    </h1>

                    <TabsMenu labels={labels} subMenu={false} />
                    {serviceMine === true && <TabsMenu labels={labelsSubNav} subMenu={true} />}

                    {serviceMine === false && (
                        <>
                            <form className="bg-white w-full rounded-full flex items-center justify-between px-2 py-1" onSubmit={(e) => handleSubmit(e)}>
                                <input placeholder="Rechercher un service" className="w-full focus:outline-none" onChange={(e) => handleChange(e)}></input>
                                <button type="submit" className="flex items-center">
                                    <span className="material-symbols-outlined scale-[75%]">search</span>
                                </button>
                            </form>
                        </>
                    )}
                </header>
                <div className="h-full overflow-auto grid grid-cols-1 lg:grid-cols-2 content-start gap-4 my-4">
                    {servicesList.length === 0 && (
                        <>
                            <div>Aucun service trouvé</div>
                        </>
                    )}

                    {servicesList.map((service: any, index: number) => (
                        <ServiceCard key={index} service={service} serviceMine={serviceMine} />
                    ))}
                </div>
            </main>
            <NavBarBottom handleClick={handleClick} addBtn={true} />
        </div>
    );
}
