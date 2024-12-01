//import from REACT & REACT ROUTER & REACT ROUTER DOM
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

//import from FORMIK & YUP
import { object, string } from "yup";
import { useFormik } from "formik";

//import from MATERIAL TAILWIND
import {
    Card,
    CardBody,
    CardFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";

//import COMPONENTS
import { CategoriesSelect } from "../../components/CategoriesSelect";
import BtnBottom from "../../components/BtnBottom";
import NavBarTop from "../../components/NavBarTop";

//import DATA
import { poolsFaker } from "../../datas/fakers/surveyFaker";

import { usersFaker } from "../../datas/fakers/usersFaker";

//import TYPES
import { pool } from "../../types/survey";
import { userProfile } from "../../types/user";

export default function SurveyEditPoolPage() {
    const navigate = useNavigate();

    function getPoolId() {
        const id = useLocation().pathname.split("/")[3];
        return id;
    }

    const poolId = getPoolId();
    const pool = poolsFaker[poolId as unknown as number];

    const userIdReceive = pool.user_id_receive;

    const [newPool, setNewPool] = useState<pool>(pool);

    const formSchemaPool = object({
        title: string()
            .required("Le titre est obligatoire")
            .min(5, "minimum 5 lettres"),
        description: string()
            .required("Description est obligatoire")
            .min(2, "minimum 2 lettres"),
        category: string().required("Bénéficiaire est obligatoire"),
    });

    const formikPool = useFormik({
        initialValues: newPool,
        validationSchema: formSchemaPool,
        onSubmit: (values2) => {
            setNewPool(values2);
            alert("enregistré" + JSON.stringify(values2, null, 2));
            navigate("/sondage");
        },
    });

    const users = usersFaker.map((user: userProfile) => user.firstName);
    useEffect(() => {
        console.log(formikPool.values);
    }, [formikPool.values]);

    return (
        <div className="body orange">
            <header>
                <NavBarTop />
                <div className="flex items-center justify-between m-4">
                    <h1 className="text-4xl px-4 pb-4">Modifier ma cagnotte</h1>
                    <Link to={`/sondage`}>
                        <button
                            type="button"
                            className="bg-gray-500 w-12 h-12 rounded-full flex items-center justify-center mr-2"
                        >
                            <span className="material-symbols-outlined text-white ">
                                close
                            </span>
                        </button>
                    </Link>
                </div>
            </header>
            <main>
                <form onSubmit={formikPool.handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <CategoriesSelect
                                label="Bénéficiaire"
                                disabled={false}
                                categoriesArray={users}
                                change={formikPool.handleChange}
                                categorySelected={
                                    usersFaker[userIdReceive].firstName
                                }
                            />
                        </div>
                        <Card className="mt-2">
                            <CardBody className="flex flex-col gap-4">
                                <Input
                                    label="Titre"
                                    name="title"
                                    variant="standard"
                                    onChange={formikPool.handleChange}
                                    value={pool.title}
                                />
                                <Textarea
                                    name="description"
                                    variant="standard"
                                    rows={8}
                                    label="Description"
                                    onChange={formikPool.handleChange}
                                    value={pool.description}
                                />
                            </CardBody>
                            <CardFooter className="flex justify-end mt-4">
                                <BtnBottom
                                    label="Publier"
                                    dark={true}
                                    type={undefined}
                                />
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </main>
        </div>
    );
}
