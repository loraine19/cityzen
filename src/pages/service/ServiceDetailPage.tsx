import { Avatar, Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import NavBarTop from "../../components/NavBarTop";
import NavBarBottom from "../../components/NavBarBottom";
import { servicesFaker } from "../../datas/fakers/servicesFaker";
import { service } from "../../types/service";
import { usersFaker } from "../../datas/fakers/usersFaker";
import { useState, useEffect } from "react";
import BtnBottom from "../../components/BtnBottom";
import { Link } from "react-router-dom";
import { userProfile } from "../../types/user";
import { calculatePoints } from "../../functions/CalculatePoints";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/user.context";
import { issuesFaker } from "../../datas/fakers/issuesFaker";

export default function ServiceDetailPage() {
    const params = useParams();
    const id = Number(params.id);

    //GET FAKE DATA
    const { user } = useContext(UserContext);
    const userConnectedId = user.id;
    const serviceDetail: service = servicesFaker[id - 1];

    //FIND USER RELATED TO SERVICE
    let foundUser: any;
    if (serviceDetail.type === "Offre") {
        foundUser = usersFaker.find((user) => user.id === serviceDetail.user_id_do);
    } else if (serviceDetail.type === "Demande") {
        foundUser = usersFaker.find((user) => user.id === serviceDetail.user_id_get);
    }
    const [serviceUser] = useState<userProfile>(foundUser ? foundUser : usersFaker[0]);

    //DATE
    const currentDate = new Date(Date.now());
    const serviceDate = new Date(serviceDetail.created_at);
    const displayedDate = `${serviceDate.getDate()}/${serviceDate.getMonth() + 1}/${serviceDate.getFullYear()}`;

    const pendingDuration: number = Math.round((currentDate.getTime() - serviceDate.getTime()) / 1000 / 60 / 60 / 24);

    //CALCULATE POINTS
    const servicePoints: any = calculatePoints(serviceDetail.skill_level, serviceDetail.hard_level, serviceDetail.type);

    //VERIFY IF SERVICE IS UNDER ISSUE
    //FIND ID OF ISSUE TO REDIRECT
    let issueDetect: boolean = issuesFaker.some((issue) => {
        return serviceDetail.id === issue.service_id;
    });
    let issueId: any = issuesFaker.find((issue) => serviceDetail.id === issue.service_id)?.id;

    //SERVICE STATUS (x5)
    const [serviceStatus, setServiceStatus] = useState<string>("");
    useEffect(() => {
        //AVAILABLE
        if (userConnectedId !== serviceDetail.user_id_get && userConnectedId !== serviceDetail.user_id_do) {
            if (serviceDetail.user_id_get === undefined || serviceDetail.user_id_do === undefined) {
                setServiceStatus("serviceAvailable");
            }
        }
        //ONGOING NOT MINE
        if (serviceDetail.user_id_get !== undefined && serviceDetail.user_id_do !== undefined) {
            setServiceStatus("serviceOngoing");
        }
        //ENDED
        if (serviceDetail.terminated === true) {
            setServiceStatus("serviceEnded");
        }
        //MINE
        if (userConnectedId === serviceDetail.user_id_get || userConnectedId === serviceDetail.user_id_do) {
            //MINE PENDING
            if (serviceDetail.user_id_get === undefined || serviceDetail.user_id_do === undefined) {
                if (pendingDuration < 15) {
                    //PENDING EDIT ONLY
                    setServiceStatus("serviceMinePending");
                } else if (pendingDuration >= 15) {
                    //PENDING EDIT AND BOOST
                    setServiceStatus("serviceMinePendingBoost");
                }
            }
            //MINE ONGOING
            if (serviceDetail.user_id_get === userConnectedId || serviceDetail.user_id_do === userConnectedId) {
                setServiceStatus("serviceOngoingMine");
            }
        }
    }, [serviceStatus]);

    const navigate = useNavigate();

    //FUNCTIONS RELATED TO CTAs
    function serviceFlag() {
        //
        alert(`Signaler le service ${serviceDetail.id}`);
        navigate(`/service`);
    }
    function chooseServ() {
        //
        alert(`Choisir le service ${serviceDetail.id}`);
        navigate(`/service`);
    }

    function boostServ() {
        //
        alert(`Relancer le service ${serviceDetail.id}`);
        navigate(`/service`);
    }

    function endServ() {
        //
        alert(`Le service ${serviceDetail.id} est terminé`);
        navigate(`/service`);
    }

    return (
        <div className="Body cyan">
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
                    <Card>
                        {serviceDetail.picture.length !== 0 && (
                            <>
                                <CardHeader color="blue-gray" className="relative h-full max-h-72 object-cover">
                                    <img src={serviceDetail.picture} alt="card-image" />
                                </CardHeader>
                            </>
                        )}

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
                {serviceStatus === "serviceAvailable" && <BtnBottom type="button" label="Choisir" dark={true} onClick={chooseServ} />}
                {serviceStatus === "serviceMinePending" && (
                    <Link to={`/service/edit/${serviceDetail.id}`}>
                        <BtnBottom type="button" label="Éditer" dark={true} />
                    </Link>
                )}
                {serviceStatus === "serviceMinePendingBoost" && (
                    <div className="flex gap-2">
                        <Link to={`/service/edit/${serviceDetail.id}`}>
                            <BtnBottom type="button" label="Éditer" dark={true} />
                        </Link>

                        <BtnBottom type="button" label="Relancer" dark={true} onClick={boostServ} />
                    </div>
                )}
                {serviceStatus === "serviceOngoingMine" && issueDetect === false && (
                    <div className="grid grid-cols-2 gap-2">
                        <Link to={`/litige/create/${serviceDetail.id}`}>
                            <BtnBottom type="button" label="Besoin d'aide" dark={false} />
                        </Link>
                        <BtnBottom type="button" label="Service terminé" dark={true} onClick={endServ} />
                    </div>
                )}
                {serviceStatus === "serviceOngoingMine" && issueDetect === true && (
                    <div className="grid grid-cols-2 gap-2">
                        <Link to={`/litige/${issueId}`}>
                            <BtnBottom type="button" label="Voir le litige" dark={false} />
                        </Link>
                        <BtnBottom type="button" label="Service terminé" dark={true} onClick={endServ} />
                    </div>
                )}
                {serviceStatus === "serviceOngoing" && <NavBarBottom addBtn={false} />}
                {serviceStatus === "serviceEnded" && <NavBarBottom addBtn={false} />}
            </footer>
        </div>
    );
}
