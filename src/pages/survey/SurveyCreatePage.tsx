//import from REACT & REACT ROUTER DOM
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import from FORMIK & YUP
import { useFormik } from "formik";

//import from MATERIAL TAILWIND
import { Radio, Typography } from "@material-tailwind/react";

//import COMPONENTS
import SurveyForm from "../../components/SurveyForm";
import PoolForm from "../../components/PoolForm";
import NavBarTop from "../../components/NavBarTop";

// ------------------------------------- //
function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-full w-full scale-105"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default function SurveyCreatePage() {
    useEffect(() => { }, []);

    const [target] = useState<any>({
        type: "sondage",
    });

    const formik = useFormik({
        initialValues: target,
        onSubmit: (values) => console.log(values),
    });

    return (
        <div className="Body orange">
            <header>
                <NavBarTop />
                <div className="flex items-center justify-between m-4">
                    <h1 className="text-4xl px-4 pb-4">Proposition de...</h1>
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
                <form
                    className="flex gap-4 justify-center"
                    onSubmit={formik.handleSubmit}
                >
                    <Radio
                        name="type"
                        id="survey"
                        defaultChecked
                        ripple={false}
                        icon={<Icon />}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        value="sondage"
                        onChange={formik.handleChange}
                        label={
                            <Typography
                                color="blue-gray"
                                className="font-normal text-blue-gray-400"
                            >
                                Sondage
                            </Typography>
                        }
                    />
                    <Radio
                        name="type"
                        id="pool"
                        ripple={false}
                        icon={<Icon />}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        value="cagnotte"
                        onChange={formik.handleChange}
                        label={
                            <Typography
                                color="blue-gray"
                                className="font-normal text-blue-gray-400"
                            >
                                Cagnotte
                            </Typography>
                        }
                    />
                </form>
            </header>
            {formik.values.type === "sondage" ? <SurveyForm /> : <PoolForm />}
        </div>
    );
}
