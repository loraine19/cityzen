import { Card, CardBody, Typography, Avatar, CardFooter } from "@material-tailwind/react";
import { service } from "../types/service";
import { usersFaker } from "../datas/fakers/usersFaker";
import { Link } from "react-router-dom";
import { calculatePoints } from "../functions/CalculatePoints";
import { userProfile } from "../types/user";
import { useState } from "react";
import Modal from "../components/Modal";
import { issuesFaker } from "../datas/fakers/issuesFaker";
import { useContext } from "react";
import UserContext from "../contexts/user.context";

interface ServiceCardProps {
    service: service;
    serviceMine: boolean;
}

export default function ServiceCard(props: ServiceCardProps) {
    const { service, serviceMine } = props;

    const { user } = useContext(UserContext);
    const userConnectedId = user.id;

    //DATE
    const currentDate = new Date(Date.now());
    const serviceDate = new Date(service.created_at);
    const displayedDate = `${serviceDate.getDate()}/${serviceDate.getMonth() + 1}/${serviceDate.getFullYear()}`;
    const pendingDuration: number = Math.round((currentDate.getTime() - serviceDate.getTime()) / 1000 / 60 / 60 / 24);

    //CALCULATE POINTS
    const servicePoints: any = calculatePoints(service.skill_level, service.hard_level, service.type);

    //GET SERVICE ID TO FLAG
    function serviceFlag() {
        //
    }

    //FIND USER RELATED TO SERVICE
    let foundUser: any;
    if (service.type === "Offre") {
        foundUser = usersFaker.find((user) => user.id === service.user_id_do);
    } else if (service.type === "Demande") {
        foundUser = usersFaker.find((user) => user.id === service.user_id_get);
    }
    const [serviceUser] = useState<userProfile>(foundUser ? foundUser : usersFaker[0]);

    //VERIFY IF SERVICE IS UNDER ISSUE
    //FIND ID OF ISSUE TO REDIRECT
    let issueDetect: boolean = issuesFaker.some((issue) => {
        return service.id === issue.service_id;
    });
    let issueId: any;
    let issueUserId: any;
    issueId = issuesFaker.find((issue) => service.id === issue.service_id)?.id;
    issueUserId = issuesFaker.find((issue) => service.id === issue.service_id)?.user_id;
    let issueOpponentId: any;
    if (issueDetect === true) {
        service.user_id_do === issueUserId ? (issueOpponentId = service.user_id_get) : (issueOpponentId = service.user_id_do);
    }

    //DELETE SERVICE => CALL A MODAL
    const [idToDelete, setIdToDelete] = useState<number>();
    const deleteService = () => {
        setModalTitle("Supprimer mon service");
        setModalDescription("");
        setOpenModal(!openModal);
        setIdToDelete(service.id);
    };

    //MODAL
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalDescription, setModalDescription] = useState<string>("");
    const getModalResult = (result: boolean) => {
        setOpenModal(!openModal);
        if (modalTitle === "Supprimer mon service" && result === true) {
            //DELETE ACTION POSSIBLE
            console.log(`Service ${idToDelete} supprimé`);
        } else if (modalTitle === "Supprimer mon service" && result === false) {
            console.log(`Service ${idToDelete} conservé`);
        }
        //ADD OTHER CONDIDTIONS IF MODAL IS CALLED FOR DIFFERENT PURPOSES
    };

    return (
        <>
            {openModal === true && <Modal title={modalTitle} description={modalDescription} openModal={openModal} getModalResult={getModalResult} />}

            <Card color="white" shadow={false} className="w-full h-fit p-4 !text-gray-800">
                <CardBody className="mb-6 p-0">
                    <div className="flex justify-between text-sm items-center">
                        <div className="flex gap-2">
                            <div className="bg-[#06b6d4] w-fit px-2 py-[0.25em] rounded-full text-white">{service.category}</div>
                            <div className="bg-[#ffedd5] w-fit px-4 py-1 rounded-full text-[#ea580c] ">{service.type}</div>
                            {service.user_id_do !== undefined && service.user_id_get !== undefined && service.terminated === false && (
                                <div className="bg-[#DCFCE7] w-fit px-4 py-1 rounded-full text-[#15803D] ">En cours</div>
                            )}
                            {service.terminated === true && <div className="bg-gray-500 w-fit px-2 py-[0.25em] rounded-full text-white ">Terminé</div>}
                        </div>
                        <div className="flex gap-2">
                            {pendingDuration < 15 && <div>{displayedDate}</div>}
                            {pendingDuration >= 15 && <div className="bg-[#FEE2E2] w-fit px-4 py-1 rounded-full text-[#DC2626] flex items-center">{displayedDate}</div>}

                            {serviceMine === false && (
                                <button type="button" onClick={() => serviceFlag()}>
                                    <span className="material-symbols-outlined scale-75 opacity-30">flag</span>
                                </button>
                            )}
                        </div>
                    </div>
                    <Typography variant="h5" className="font-bold mt-2">
                        {service.title}
                    </Typography>

                    <Typography className="text-sm ">
                        <span className="line-clamp-2">{service.description}</span>
                    </Typography>
                </CardBody>
                <CardFooter color="transparent" className="m-0 p-0 flex items-center justify-between gap-4">
                    {serviceMine === false && (
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
                            <div className="flex gap-2 text-sm items-center">
                                <div className="bg-gray-500 w-fit px-2 py-[0.25em] rounded-full text-white ">{servicePoints} pts</div>

                                {issueDetect === true && (issueUserId === userConnectedId || issueOpponentId === userConnectedId) && (
                                    <Link to={`/litige/${issueId}`}>
                                        <div className="bg-gray-800 w-fit pl-2 py-[0.2em]  rounded-full text-white flex items-center">
                                            <span>En modo</span>
                                            <span className="material-symbols-outlined  scale-75">arrow_forward</span>
                                        </div>
                                    </Link>
                                )}

                                <Link to={`/service/${service.id}`}>
                                    <button type="button" className="bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white scale-75">arrow_forward</span>
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}

                    {serviceMine === true && (
                        <>
                            <div className="flex gap-2">
                                {(service.user_id_do === undefined || service.user_id_get === undefined) && (
                                    <>
                                        <Link to={`/service/edit/${service.id}`}>
                                            <button type="button" className="bg-white border-[1px] border-black w-8 h-8 rounded-full flex items-center justify-center">
                                                <span className="material-symbols-outlined text-black scale-75">edit</span>
                                            </button>
                                        </Link>
                                        <button type="button" className=" border-[1px] border-[#DC2626] w-8 h-8 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[#DC2626] scale-75" onClick={deleteService}>
                                                close
                                            </span>
                                        </button>
                                        <button type="button" className="bg-[#3AB1CB] w-8 h-8 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white scale-75">groups</span>
                                        </button>
                                    </>
                                )}

                                {service.user_id_do !== undefined && service.user_id_get !== undefined && (
                                    <>
                                        <button type="button" className="bg-white border-[1px] border-black w-8 h-8 rounded-full flex items-center justify-center opacity-10 cursor-not-allowed">
                                            <span className="material-symbols-outlined text-black scale-75">edit</span>
                                        </button>

                                        <button type="button" className="border-[1px] border-[#DC2626] w-8 h-8 rounded-full flex items-center justify-center opacity-10 cursor-not-allowed">
                                            <span className="material-symbols-outlined text-[#DC2626] scale-75">close</span>
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="flex gap-2 text-sm items-center">
                                <div className="bg-gray-500 w-fit px-2 py-[0.25em] rounded-full text-white ">{servicePoints} pts</div>
                                {issueDetect === true && issueUserId === userConnectedId && (
                                    <Link to={`/litige/${issueId}`}>
                                        <div className="bg-gray-800 w-fit pl-2 py-[0.2em]  rounded-full text-white flex items-center">
                                            <span>En modo</span>
                                            <span className="material-symbols-outlined  scale-75">arrow_forward</span>
                                        </div>
                                    </Link>
                                )}
                                <Link to={`/service/${service.id}`}>
                                    <button type="button" className="bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white scale-75">arrow_forward</span>
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}
