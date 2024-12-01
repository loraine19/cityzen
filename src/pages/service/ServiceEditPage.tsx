import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Input, Textarea } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import NavBarTop from "../../components/NavBarTop";
import { servicesFaker } from "../../datas/fakers/servicesFaker";
import { service } from "../../types/service";
import { useState, useEffect } from "react";
import BtnBottom from "../../components/BtnBottom";
import { Link } from "react-router-dom";
//import { CategoriesSelect } from "../../components/CategoriesSelect";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { useNavigate } from "react-router-dom";
import { calculatePoints } from "../../functions/CalculatePoints";
import Modal from "../../components/Modal";

export default function ServiceEditPage() {
    const params = useParams();
    const id = Number(params.id);

    //GET FAKE DATA
    const [serviceDetail, setServiceDetail] = useState<service>(servicesFaker[id - 1]);

    const serviceCategories: string[] = ["Bricolage", "Extérieur", "Peinture", "Courses", "Garderie", "Soutien"];
    //const serviceCategories: string[] = ["Categorie 1", "Categorie 2", "Categorie 3", "Categorie 4", "Categorie 5", "Categorie 6"];
    const skillLevels: number[] = [1, 2, 3, 4, 5, 6];
    const difficultyLevels: number[] = [1, 2, 3, 4, 5, 6];

    //FORM
    const [serviceDetailModif, setServiceDetailModif] = useState<service>(serviceDetail);
    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "Le titre doit avoir au minimum 5 lettres"),
        description: string().required("La description est obligatoire").min(20, "La description doit avoir au minimum 20 lettres"),
        skill_level: number().required().min(1, "La compétence est obligatoire"),
        hard_level: number().required().min(1, "La difficulté est obligatoire"),
    });

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: serviceDetail,
        validationSchema: formSchema,
        onSubmit: (values) => {
            setModalTitle("Modifier mon service");
            setModalDescription("");
            setOpenModal(!openModal);
            values.skill_level = skill_level;
            values.hard_level = hard_level;
            setServiceDetailModif(values);
        },
    });

    //CALCULATE POINTS
    const [servicePoints, setServicePoints] = useState<any>();
    const [skill_level, setSkill_level] = useState<number>(serviceDetail.skill_level);
    const [hard_level, setHard_level] = useState<number>(serviceDetail.hard_level);
    useEffect(() => {
        setServicePoints(calculatePoints(skill_level, hard_level, serviceDetail.type));
    }, [skill_level, hard_level]);

    //GET LEVELS CHANGES
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        if (name === "skill_level") {
            setSkill_level(parseInt(value));
        } else {
            setHard_level(parseInt(value));
        }
    }

    //ONCLICK CTAs FUNCTIONS => CALL MODALS
    const deleteService = () => {
        setModalTitle("Supprimer mon service");
        setModalDescription("");
        setOpenModal(!openModal);
    };
    const boostService = () => {
        setModalTitle("Envoyer une notification à mes voisins");
        setModalDescription("");
        setOpenModal(!openModal);
    };

    //MODAL
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalDescription, setModalDescription] = useState<any>("");
    const getModalResult = (result: boolean) => {
        setOpenModal(!openModal);
        if (modalTitle === "Modifier mon service" && result === true) {
            //MODIFY ACTION POSSIBLE
            setServiceDetail(serviceDetailModif);
            alert(JSON.stringify(serviceDetailModif, null, 2));
            navigate(`/service/${id}`);
        } else if (modalTitle === "Modifier mon service" && result === false) {
            //MODIFY ACTION CANCELED
            console.log(`Service ${serviceDetail.id} conservé`);
        } else if (modalTitle === "Supprimer mon service" && result === true) {
            //DELETE ACTION POSSIBLE
            console.log(`Service ${serviceDetail.id} supprimé`);
            navigate(`/service`);
        } else if (modalTitle === "Supprimer mon service" && result === false) {
            console.log(`Service ${serviceDetail.id} conservé`);
            navigate(`/service`);
        } else if (modalTitle === "Envoyer une notification à mes voisins" && result === true) {
            //BOOST ACTION POSSIBLE
            console.log(`Service ${serviceDetail.id} relancé`);
            navigate(`/service`);
        } else if (modalTitle === "Envoyer une notification à mes voisins" && result === false) {
            navigate(`/service`);
        }
        //ADD OTHER CONDIDTIONS IF MODAL IS CALLED FOR DIFFERENT PURPOSES
    };

    return (
        <>
            {openModal === true && <Modal title={modalTitle} description={modalDescription} openModal={openModal} getModalResult={getModalResult} />}

            <form className="Body cyan" onSubmit={formik.handleSubmit}>
                <main>
                    <header className="h-auto">
                        <NavBarTop />
                        <h1 className="text-4xl font-thin px-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold">{serviceDetail.category} </div>
                                    <div className="flex gap-4 items-center">
                                        <div>{serviceDetail.type}</div>

                                        <div className="text-xl drop-shadow-md">
                                            <div className="bg-white w-fit px-2 py-1 rounded-full text-[#15803D] ">En attente</div>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/service`}>
                                    <button type="button" className="bg-gray-500 w-12 h-12 rounded-full flex items-center justify-center mr-2">
                                        <span className="material-symbols-outlined text-white ">close</span>
                                    </button>
                                </Link>
                            </div>
                        </h1>
                    </header>

                    <div className="w-respLarge overflow-auto  content-start h-full pt-8 pb-1">
                        <Card>
                            <CardHeader color="blue-gray" className="relative h-full max-h-72 object-cover">
                                <img src={serviceDetail.picture} alt="card-image" />
                            </CardHeader>

                            <CardBody>
                                <div className="w-respLarge flex flex-col justify-between content-start h-full overflow-hidden">
                                    <div className="flex flex-col justify-between gap-4 h-full overflow-auto content-start bg-white rounded-xl w-full">
                                        <select
                                            className="rounded-full shadow bg-gray-800 text-white border-none capitalize p-2 "
                                            name="category"
                                            onChange={formik.handleChange}
                                            defaultValue={serviceDetail.category}>
                                            {serviceCategories.map((category: string, index: number) => (
                                                <option className="rounded-full my-1 capitalize bg-white text-gray-800" key={index}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>

                                        <div>
                                            <Input
                                                variant="static"
                                                name="title"
                                                label="Titre du service"
                                                onChange={formik.handleChange}
                                                defaultValue={serviceDetail.title}
                                                className="!text-2xl !font-bold"
                                            />

                                            <div className="text-[0.75em] text-red-600">{formik.errors.title}</div>
                                        </div>
                                        <div>
                                            <Textarea variant="static" name="description" label="Description" onChange={formik.handleChange} defaultValue={serviceDetail.description} />
                                            <div className="text-[0.75em] text-red-600 ">{formik.errors.description}</div>
                                        </div>
                                        <div>
                                            <div className="flex gap-12">
                                                <div className="flex flex-col w-fit gap-3">
                                                    <p className="text-sm text-gray-600">Compétence</p>
                                                    <select className="px-4" name="skill_level" onChange={(e) => handleChange(e)} defaultValue={serviceDetail.skill_level}>
                                                        {skillLevels.map((skill: number, index: number) => (
                                                            <option key={index}>{skill}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-col w-fit gap-3">
                                                    <p className="text-sm text-gray-600">Difficulté</p>
                                                    <select className="px-4" name="hard_level" onChange={(e) => handleChange(e)} defaultValue={serviceDetail.hard_level}>
                                                        {difficultyLevels.map((difficulty: number, index: number) => (
                                                            <option key={index}>{difficulty}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-col w-fit gap-2">
                                                    <p className="text-sm text-gray-600">Coût du service</p>
                                                    <div className="bg-gray-400  w-full px-2 py-[0.25em] rounded-full text-center">{servicePoints} pts</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-[0.75em] text-red-600 ">{formik.errors.skill_level}</div>
                                            <div className="text-[0.75em] text-red-600 ">{formik.errors.hard_level}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </main>

                <footer className="w-respLarge px-4 md:px-0">
                    <div className="flex gap-2">
                        <BtnBottom type="submit" label="Modifier" dark={true} />
                        <BtnBottom type="button" label="Supprimer" dark={true} onClick={deleteService} />
                        <BtnBottom type="button" label="Relancer" dark={true} onClick={boostService} />
                    </div>
                </footer>
            </form>
        </>
    );
}
