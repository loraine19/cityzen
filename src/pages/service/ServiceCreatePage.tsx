import { useFormik } from "formik";
import { object, string } from "yup";
import NavBarTop from "../../components/NavBarTop";
import { useState, useEffect } from "react";
import { servicesFaker } from "../../datas/fakers/servicesFaker";
import { service } from "../../types/service";
import ServiceCardLight from "../../components/ServiceCardLight";
import BtnBottom from "../../components/BtnBottom";
import { Link } from "react-router-dom";
import { CategoriesSelect } from "../../components/CategoriesSelect";
import { Radio, Input, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/user.context";
import { calculatePoints } from "../../functions/CalculatePoints";

export default function ServiceCreatePage() {
    //FAKE DATA
    const { user } = useContext(UserContext);
    const userConnectedId = user.id;
    const serviceCategories: string[] = ["Catégories", "Bricolage", "Extérieur", "Peinture", "Courses", "Garderie", "Soutien"];
    //const serviceCategories: string[] = ["Catégories", "Categorie 1", "Categorie 2", "Categorie 3", "Categorie 4", "Categorie 5", "Categorie 6"];

    const servicesList: service[] = servicesFaker;

    //FILTER SERVICE LIST
    const [categorySelected, setCategorySelected] = useState<any>("Catégories");
    const [typeSelected, setTypeSelected] = useState<string>("demande");
    const [user_id_get, setUser_id_get] = useState<any>(userConnectedId);
    const [user_id_do, setUser_id_do] = useState<any>(undefined);
    const [servListFiltered, setServListFiltered] = useState<service[]>([]);

    useEffect(() => {
        if (categorySelected === "Catégories") {
            setServListFiltered(servicesList.filter((service) => service.type.toLowerCase() === typeSelected.toLowerCase()));
        } else {
            setServListFiltered(servicesList.filter((service) => service.type.toLowerCase() === typeSelected.toLowerCase() && service.category.toLowerCase() === categorySelected.toLowerCase()));
        }
    }, [typeSelected, categorySelected]);

    function radioChange(value: string) {
        setTypeSelected(value);
        value === "demande" ? setUser_id_get(userConnectedId) : setUser_id_get(undefined);
        value === "offre" ? setUser_id_do(userConnectedId) : setUser_id_do(undefined);
    }

    const change = (e: string) => {
        setCategorySelected(e);
    };

    const [displayForm, setDisplayForm] = useState<boolean>(false);
    const createNewServ = () => {
        setDisplayForm(true);
    };

    //CALCULATE POINTS
    const [servicePoints, setServicePoints] = useState<any>();
    const [skill_level, setSkill_level] = useState<number>(0);
    const [hard_level, setHard_level] = useState<number>(0);
    useEffect(() => {
        setServicePoints(calculatePoints(skill_level, hard_level, typeSelected));
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

    //GET CURRENT DATE
    const date = new Date();
    const currentDate = date.getTime();

    //FORM CREATE NEW SERVICE
    const skillLevels: number[] = [1, 2, 3, 4, 5, 6];
    const difficultyLevels: number[] = [1, 2, 3, 4, 5, 6];

    const [newServ, setNewServ] = useState<service>({
        id: 0,
        user_id_get: undefined,
        user_id_do: undefined,
        type: typeSelected,
        title: "",
        description: "",
        category: categorySelected,
        skill_level: 0,
        hard_level: 0,
        created_at: `${currentDate}`,
        updated_at: "",
        terminated: false,
        picture: "",
    });

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "Le titre doit avoir au minimum 5 lettres"),
        description: string().required("La description est obligatoire").min(20, "La description doit avoir au minimum 20 lettres"),
    });

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: newServ,
        validationSchema: formSchema,
        onSubmit: (values) => {
            if (categorySelected !== "Catégories" && skill_level !== 0 && hard_level !== 0) {
                setNewServ(values);
                values.skill_level = skill_level;
                values.hard_level = hard_level;
                values.user_id_get = user_id_get;
                values.user_id_do = user_id_do;
                alert(JSON.stringify(values, null, 2));
                navigate("/service");
            }
        },
    });

    return (
        <div className="Body cyan">
            <main>
                <header className="h-auto">
                    <NavBarTop />
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-thin px-2 w-[80%]">
                            <span className="font-bold">
                                {servListFiltered.length} {typeSelected}
                                {servListFiltered.length > 1 && <span>s</span>}
                            </span>
                            <span className="text-[0.9em]"> dans la catégorie {categorySelected}</span>
                        </h1>
                        <Link to={`/service`}>
                            <button type="button" className="bg-gray-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                <span className="material-symbols-outlined text-white ">close</span>
                            </button>
                        </Link>
                    </div>
                    <div className="flex gap-24 text-xl mb-4">
                        {displayForm === false && (
                            <>
                                <Radio name="type" label="Demande" color="cyan" defaultChecked onChange={() => radioChange("demande")} />
                                <Radio name="type" label="Offre" color="cyan" onChange={() => radioChange("offre")} />
                            </>
                        )}
                        {displayForm === true && (
                            <>
                                {typeSelected === "demande" && (
                                    <>
                                        <Radio name="type" label="Demande" color="cyan" defaultChecked onChange={() => radioChange("demande")} disabled />
                                        <Radio name="type" label="Offre" color="cyan" onChange={() => radioChange("offre")} disabled />
                                    </>
                                )}
                                {typeSelected === "offre" && (
                                    <>
                                        <Radio name="type" label="Demande" color="cyan" onChange={() => radioChange("demande")} disabled />
                                        <Radio name="type" label="Offre" color="cyan" defaultChecked onChange={() => radioChange("offre")} disabled />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <CategoriesSelect categoriesArray={serviceCategories} change={change} categorySelected={categorySelected} />
                    {categorySelected === "Catégories" && displayForm === true && <div className="text-[0.75em] text-red-600 mt-2 pl-3">Veuillez choisir une catégorie</div>}
                </header>

                {displayForm === false && (
                    <>
                        <div className="h-full overflow-auto grid grid-cols-1 lg:grid-cols-2 content-start lg:gap-4 my-4 bg-white lg:bg-transparent rounded-xl">
                            {servListFiltered.length === 0 && <div className="p-4">Aucun sercice trouvé</div>}
                            {servListFiltered.map((service: any, index: number) => (
                                <ServiceCardLight key={index} service={service} />
                            ))}
                        </div>
                        <BtnBottom type="button" label="Je n'ai pas trouvé" dark={true} onClick={createNewServ} />
                    </>
                )}

                {displayForm === true && (
                    <form className="w-respLarge flex flex-col justify-between content-start h-full overflow-hidden" onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col justify-between gap-4 h-full overflow-auto content-start my-4 p-4 pt-12 bg-white rounded-xl w-full">
                            <div>
                                <Input variant="static" name="title" label="Titre du service" onChange={formik.handleChange} />
                                <div className="text-[0.75em] text-red-600">{formik.errors.title}</div>
                            </div>
                            <div>
                                <Textarea variant="static" name="description" label="Description" onChange={formik.handleChange} />
                                <div className="text-[0.75em] text-red-600 ">{formik.errors.description}</div>
                            </div>
                            <div>
                                <div className="flex gap-12">
                                    <div className="flex flex-col w-fit gap-3">
                                        <p className="text-sm text-gray-600">Compétence</p>
                                        <select className="px-4" name="skill_level" onChange={(e) => handleChange(e)}>
                                            <option selected>0</option>
                                            {skillLevels.map((skill: number, index: number) => (
                                                <option key={index}>{skill}</option>
                                            ))}
                                        </select>
                                        {skill_level === 0 && displayForm === true && <div className="text-[0.75em] text-red-600 mt-2 ">Niv de compétence</div>}
                                    </div>
                                    <div className="flex flex-col w-fit gap-3">
                                        <p className="text-sm text-gray-600">Compétence</p>
                                        <select className="px-4" name="hard_level" onChange={(e) => handleChange(e)}>
                                            <option selected>0</option>
                                            {difficultyLevels.map((difficulty: number, index: number) => (
                                                <option key={index}>{difficulty}</option>
                                            ))}
                                        </select>
                                        {hard_level === 0 && displayForm === true && <div className="text-[0.75em] text-red-600 mt-2 ">Niv de difficulté</div>}
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

                            <BtnBottom type="button" blue={true} label="Ajouter une photo" onClick={createNewServ} />
                        </div>
                        {typeSelected === "offre" && <BtnBottom type="submit" label={`Publier mon ${typeSelected}`} dark={true} />}
                        {typeSelected === "demande" && <BtnBottom type="submit" label={`Publier ma ${typeSelected}`} dark={true} />}
                    </form>
                )}
            </main>
        </div>
    );
}
