import { Avatar, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import NavBarTop from "../../../components/NavBarTop";
import { servicesFaker } from "../../../datas/fakers/servicesFaker";
import { service } from "../../../types/service";
import { usersFaker } from "../../../datas/fakers/usersFaker";
import { useState, useEffect } from "react";
import BtnBottom from "../../../components/BtnBottom";
import { Link } from "react-router-dom";
import { userProfile } from "../../../types/user";
import { issue } from "../../../types/issue";
import { calculatePoints } from "../../../functions/CalculatePoints";
import { useNavigate } from "react-router-dom";
import { CategoriesSelect } from "../../../components/CategoriesSelect";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Textarea } from "@material-tailwind/react";
import { useContext } from "react";
import UserContext from "../../../contexts/user.context";
import { issuesFaker } from "../../../datas/fakers/issuesFaker";

export default function IssueCreatePage() {
    const params = useParams();
    const id = Number(params.id);

    //FAKE DATA
    const { user } = useContext(UserContext);
    const userConnectedId = user.id;
    const serviceDetail: service = servicesFaker[id - 1];

    //VERIFY ISSUE REQUEST BELONGS TO USERCONNECTED
    //AND SERVICE ONGOING WITHOUT ISSUE
    const navigate = useNavigate();
    let issueDetect: boolean = issuesFaker.some((issue) => {
        return serviceDetail.id === issue.service_id;
    });
    useEffect(() => {
        if (
            (serviceDetail.user_id_get === userConnectedId || serviceDetail.user_id_do === userConnectedId) &&
            serviceDetail.user_id_get !== undefined &&
            serviceDetail.user_id_do !== undefined &&
            issueDetect === false
        ) {
        } else {
            navigate(`/service`);
        }
    }, []);

    //FIND USER RELATED TO SERVICE
    let foundUser: any;
    if (serviceDetail.type === "Offre") {
        foundUser = usersFaker.find((user) => user.id === serviceDetail.user_id_do);
    } else if (serviceDetail.type === "Demande") {
        foundUser = usersFaker.find((user) => user.id === serviceDetail.user_id_get);
    }
    const [serviceUser] = useState<userProfile>(foundUser ? foundUser : usersFaker[0]);

    //CREATE MODO LIST
    //=> ONE WITH ID TO BE ABLE TO FIND THE CORRECT MODO IF NAMESAKE
    interface modo {
        id?: number;
        name?: string;
    }
    //MODOS LIST WITH ID
    let modosListWithId: modo[] = [];
    usersFaker.forEach((user) => {
        modosListWithId.push({ id: user.id, name: `${user.firstName} ${user.lastName}` });
    });
    //MODOS LIST WITHOUT TO DISPLAY
    let modosList: any[] = [];
    modosListWithId.forEach((modo) => {
        modosList.push(modo.name);
    });

    //DATE
    const currentDate = new Date(Date.now());
    const serviceDate = new Date(serviceDetail.created_at);
    const displayedDate = `${serviceDate.getDate()}/${serviceDate.getMonth() + 1}/${serviceDate.getFullYear()}`;

    const pendingDuration: number = Math.round((currentDate.getTime() - serviceDate.getTime()) / 1000 / 60 / 60 / 24);

    //CALCULATE POINTS
    const servicePoints: any = calculatePoints(serviceDetail.skill_level, serviceDetail.hard_level, serviceDetail.type);

    //SERVICE STATUS (x5)
    const [serviceStatus, setServiceStatus] = useState<string>("");
    useEffect(() => {
        //AVAILABLE
        if (userConnectedId !== serviceDetail.user_id_get && userConnectedId !== serviceDetail.user_id_do) {
            if (serviceDetail.user_id_get === undefined || serviceDetail.user_id_do === undefined) {
                setServiceStatus("serviceAvailable");
            }
        }
        //MINE
        if (userConnectedId === serviceDetail.user_id_get || userConnectedId === serviceDetail.user_id_do) {
            //PENDING
            if (serviceDetail.user_id_get === undefined || serviceDetail.user_id_do === undefined) {
                if (pendingDuration < 15) {
                    //PENDING EDIT ONLY
                    setServiceStatus("serviceMinePending");
                } else if (pendingDuration >= 15) {
                    //PENDING EDIT AND BOOST
                    setServiceStatus("serviceMinePendingBoost");
                }
            }
            //ONGOING
            if (serviceDetail.user_id_get !== undefined && serviceDetail.user_id_do !== undefined) {
                setServiceStatus("serviceOngoing");
            }
            //ENDED
            if (serviceDetail.terminated === true) {
                setServiceStatus("serviceEnded");
            }
        }
    }, [serviceStatus]);

    //FUNCTIONS RELATED TO CTAs
    function serviceFlag() {
        //
        alert(`Signaler le service ${serviceDetail.id}`);
        navigate(`/service`);
    }
    function sendIssue() {
        //
    }
    console.log(sendIssue)

    //FORM
    const [modoSelected, setModoSelected] = useState<any>("");
    const [modoSelectedWithId, setModoSelectedWithId] = useState<any>();
    const change = (e: string) => {
        setModoSelected(e);
        setModoSelectedWithId(modosListWithId[modosList.indexOf(e)]);
    };

    const [newIssue, setNewIssue] = useState<issue>({
        id: 0,
        user_id: serviceUser.id,
        service_id: serviceDetail.id,
        user_id_mget: undefined,
        user_id_mdo: undefined,
        description: "",
        created_at: `${currentDate}`,
    });

    const formSchema = object({
        description: string().required("La description est obligatoire").min(20, "La description doit avoir au minimum 20 lettres"),
    });

    const formik = useFormik({
        initialValues: newIssue,
        validationSchema: formSchema,

        onSubmit: (values) => {
            if (modoSelected !== "") {
                values.user_id_mget = modoSelectedWithId.id;
                setNewIssue(values);
                alert(JSON.stringify(values, null, 2));
                navigate("/service");
            }
        },
    });

    return (
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
                                        {serviceDetail.user_id_do !== undefined && serviceDetail.user_id_get !== undefined && serviceDetail.terminated === false && (
                                            <>
                                                <div className="bg-white w-fit px-2 py-1 rounded-full text-[#15803D] ">En cours</div>
                                            </>
                                        )}
                                        {serviceDetail.terminated === true && (
                                            <>
                                                <div className="bg-gray-500 w-fit px-4 py-1 rounded-full text-white ">Terminé</div>
                                            </>
                                        )}
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
                    <p className="text-[1em] pl-3 font-bold">Modérateur</p>
                    <CategoriesSelect categoriesArray={modosList} change={change} categorySelected={modoSelected} />
                    {modoSelected === "" && <div className="text-[0.75em] text-red-600 mt-2 pl-3">Veuillez choisir un modérateur</div>}
                    <p className="text-[1em] pl-3 pt-8 font-bold">Description du litige</p>
                    <Textarea className=" bg-white rounded-xl p-4" variant="static" name="description" label="" onChange={formik.handleChange} />
                    <div className="text-[0.75em] text-red-600 pl-3">{formik.errors.description}</div>
                    <Card className="mt-8">
                        <CardBody>
                            <div className="flex justify-between items-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    <div>{serviceDetail.title}</div>
                                </Typography>
                                <div className="flex gap-2">
                                    {pendingDuration < 15 && <div>{displayedDate}</div>}
                                    {pendingDuration >= 15 && <div className="bg-[#FEE2E2] w-fit px-2 py-[0.25em] rounded-full text-[#DC2626] flex items-center">{displayedDate}</div>}

                                    <button type="button" onClick={() => serviceFlag()}>
                                        <span className="material-symbols-outlined scale-75 opacity-30">flag</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-2 pb-3">
                                <div className="flex gap-2 text-sm items-center">
                                    <div className="bg-gray-500 w-fit px-2 py-[0.25em] rounded-full text-gray-800 flex ites-center">
                                        <span className="material-symbols-outlined scale-75">architecture</span>
                                        <span className="mt-[0.15em]">{serviceDetail.skill_level}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-sm items-center">
                                    <div className="bg-gray-500 w-fit px-2 py-[0.25em] rounded-full text-gray-800 flex ites-center">
                                        <span className="material-symbols-outlined scale-75">bar_chart</span>
                                        <span className="mt-[0.15em]">{serviceDetail.hard_level}</span>
                                    </div>
                                </div>
                            </div>

                            <Typography className="text-sm ">
                                <span className="">{serviceDetail.description}</span>
                            </Typography>
                        </CardBody>
                        <CardFooter color="transparent" className="m-0 p-4 flex items-center justify-between gap-4">
                            <>
                                <div className="flex gap-4">
                                    <Avatar size="md" variant="circular" src={serviceUser.avatar} alt="tania andrew" />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h6">
                                                {serviceUser.firstName} {serviceUser.lastName}
                                            </Typography>
                                        </div>
                                        <Typography className="flex items-center text-sm">
                                            <span className="material-symbols-outlined ml-[-4px]">distance</span> à 500 mètres
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center text-gray-800">
                                    <div className="text-[5em] mb-[-30px] font-bold tracking-tighter">{servicePoints}</div>
                                    <div className="mt-[70px]">pts</div>
                                </div>
                            </>
                        </CardFooter>
                    </Card>
                </div>
            </main>

            <footer className="w-respLarge px-4 md:px-0">
                <BtnBottom type="submit" label="Soumettre le litige" dark={true} />
            </footer>
        </form>
    );
}
