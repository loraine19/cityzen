import { CategoriesSelect } from "./UIX/CategoriesSelect";
import { usersFaker } from "../datas/fakers/usersFaker";
import { userProfile } from "../types/user";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { pool } from "../types/survey";
import { object, string } from "yup";
import { useNavigate } from "react-router";
import {
    Card,
    CardBody,
    CardFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";
import BtnBottom from "./UIX/BtnBottom";

export default function PoolForm() {
    const navigate = useNavigate();

    const [newPool, setNewPool] = useState<pool>({
        id: 0,
        user_id_create: 0,
        user_id_receive: 0,
        title: "",
        description: "",
        createdAt: "",
        updatedAt: "",
    } as pool);

    const formSchemaPool = object({
        title: string()
            .required("Le titre est obligatoire")
            .min(5, "minimum 5 lettres"),
        description: string()
            .required("Description est obligatoire")
            .min(2, "minimum 2 lettres"),
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
        <main>
            <form onSubmit={formikPool.handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <CategoriesSelect
                            label="Bénéficiaire"
                            disabled={false}
                            categoriesArray={users}
                            change={formikPool.handleChange}
                            categorySelected={""}
                        />
                    </div>
                    <Card className="mt-2 ">
                        <CardBody className="flex flex-col gap-4">
                            <Input
                                label="Titre"
                                name="title"
                                variant="standard"
                                onChange={formikPool.handleChange}
                            />
                            <Textarea
                                name="description"
                                variant="standard"
                                rows={8}
                                label="Description"
                                onChange={formikPool.handleChange}
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
    );
}
