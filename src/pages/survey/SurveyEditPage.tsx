//import from REACT & REACT ROUTER & REACT ROUTER DOM
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

//import from FORMIK & YUP
import { array, object, string } from "yup";
import { useFormik } from "formik";

//import from MATERIAL TAILWIND
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Popover,
    PopoverContent,
    PopoverHandler,
    Textarea,
    Typography,
} from "@material-tailwind/react";

//import COMPONENTS
import { CategoriesSelect } from "../../components/UIX/CategoriesSelect";
import BtnBottom from "../../components/UIX/BtnBottom";
import NavBarTop from "../../components/UIX/NavBarTop";

//import DATA
import {
    surveyCategoryFaker,
    surveysFaker,
} from "../../datas/fakers/surveyFaker";

//import TYPES
import { survey } from "../../types/survey";

import { getImageBlob } from "../../functions/GetDataFunctions";

export default function SurveyEditPage() {
    const navigate = useNavigate();

    const [imgBlob, setImgBlob] = useState<string>("");

    function getSurveyId() {
        const id = useLocation().pathname.split("/")[3];
        return id;
    }

    const surveyId = getSurveyId();
    const survey = surveysFaker[surveyId as unknown as number];

    //const [imgBlob, setImgBlob] = useState<string>();

    const [newSurvey, setNewSurvey] = useState<survey>(survey);

    const formSchemaSurvey = object({
        title: string()
            .required("Le titre est obligatoire")
            .min(5, "minimum 5 lettres"),
        description: string()
            .required("Description est obligatoire")
            .min(2, "minimum 2 lettres"),
        category: string().required("Catégorie est obligatoire"),
        opinion: array().of(string()).min(2, "minimum 2 options"),
    });

    const formikSurvey = useFormik({
        initialValues: newSurvey,
        validationSchema: formSchemaSurvey,
        onSubmit: (values) => {
            setNewSurvey(values);
            alert("enregistré" + JSON.stringify(values, null, 2));
            navigate("/sondage");
            console.log(setNewSurvey);
        },
    });

    const [opinions, setOpinions] = useState<string[]>([]);

    const opinionArray = (e: any) => {
        e.target.name === "opinion1" && (opinions[0] = e.target.value);
        e.target.name === "opinion2" && (opinions[1] = e.target.value);
        e.target.name === "opinion3" && (opinions[2] = e.target.value);
        e.target.name === "opinion4" && (opinions[3] = e.target.value);
        setOpinions([...opinions]);
        formikSurvey.values.opinion = opinions.length > 0 ? opinions : ["1"];
        console.log(formikSurvey.values);
    };

    useEffect(() => {
        console.log(formikSurvey.values);
    }, [formikSurvey.values]);

    return (
        <>
            <div className="Body orange">
                <header>
                    <NavBarTop />
                    <div className="flex items-center justify-between m-4">
                        <h1 className="text-4xl px-4 pb-4">
                            Modifier mon sondage
                        </h1>
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
                    <form onSubmit={formikSurvey.handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <CategoriesSelect
                                    label="Catégorie"
                                    disabled={false}
                                    categoriesArray={surveyCategoryFaker}
                                    change={formikSurvey.handleChange}
                                    categorySelected={survey.category}
                                />
                            </div>
                            <Card className="mt-2">
                                <CardBody className="flex flex-col gap-4">
                                    <Input
                                        label="Titre"
                                        name="title"
                                        variant="standard"
                                        onChange={formikSurvey.handleChange}
                                        value={survey.title}
                                    />
                                    <Textarea
                                        name="description"
                                        variant="standard"
                                        rows={8}
                                        label="Description"
                                        onChange={formikSurvey.handleChange}
                                        value={survey.description}
                                    />

                                    <Typography
                                        color="gray"
                                        className="font-normal text-black"
                                    >
                                        Choix de réponse
                                        <Input
                                            label="option 1"
                                            name="opinion1"
                                            variant="standard"
                                            onChange={(e) => {
                                                opinionArray(e);
                                            }}
                                            value={survey.opinion[0]}
                                        />
                                        <Input
                                            label="option 2"
                                            name="opinion2"
                                            variant="standard"
                                            onChange={(e) => {
                                                opinionArray(e);
                                            }}
                                            value={survey.opinion[1]}
                                        />
                                        <Input
                                            label="option 3"
                                            name="opinion3"
                                            disabled={
                                                survey.opinion.length < 2
                                                    ? true
                                                    : false
                                            }
                                            variant="standard"
                                            onChange={(e) => {
                                                opinionArray(e);
                                            }}
                                            value={survey.opinion[2]}
                                        />
                                        <Input
                                            label="option 4"
                                            name="opinion4"
                                            disabled={
                                                survey.opinion.length < 3
                                                    ? true
                                                    : false
                                            }
                                            variant="standard"
                                            onChange={(e) => {
                                                opinionArray(e);
                                            }}
                                            value={survey.opinion[3]}
                                        />
                                    </Typography>

                                    <div className="flex flex-1 flex-col  justify-center w-full">
                                        {formikSurvey.values.image.length >
                                            12 && (
                                                <Popover>
                                                    <PopoverHandler>
                                                        <div className=" flex flex-col  flex-1 items-center rounded-full ">
                                                            <div className=" flex place-content-end w-[125%]   h-[125%] scale-75 ">
                                                                <img
                                                                    src={`${imgBlob}`}
                                                                    alt={`image de ${formikSurvey.values.title}`}
                                                                    className="h-[7rem]  w-full object-cover rounded-2xl"
                                                                />
                                                            </div>
                                                        </div>
                                                    </PopoverHandler>
                                                    <PopoverContent className="bg-transparent p-0">
                                                        <div className="shadow  rounded-xl flex flex-1 bg-cover bg-center bg-no-repeat w-[30vw] h-[30vh]">
                                                            <img
                                                                src={`${imgBlob}`}
                                                                alt={`image de ${formikSurvey.values.title}`}
                                                                className="h-full   w-full object-cover rounded-2xl"
                                                            />
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        <Typography className="text-xs text-center max-w-50  max-h-4 overflow-auto">
                                            {
                                                formikSurvey.values
                                                    .image as string
                                            }{" "}
                                        </Typography>
                                        <div className="flex">
                                            <Button
                                                variant="outlined"
                                                color="orange"
                                                className="w-full rounded-full"
                                            >
                                                <label
                                                    htmlFor="image"
                                                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                                                >
                                                    Choisir une image
                                                    <div className="flex flex-col w-full items-center justify-center">
                                                        <input
                                                            id="image"
                                                            type="file"
                                                            name="image"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                getImageBlob(
                                                                    e,
                                                                    setImgBlob,
                                                                    formikSurvey
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </label>
                                            </Button>
                                            <Button
                                                variant="text"
                                                color="cyan"
                                                className={
                                                    imgBlob ? `p-1` : `hidden`
                                                }
                                                onClick={() => {
                                                    setImgBlob(""),
                                                        (formikSurvey.values.image =
                                                            "");
                                                }}
                                            >
                                                <span className="material-symbols-rounded">
                                                    cancel
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0">
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
        </>
    );
}
