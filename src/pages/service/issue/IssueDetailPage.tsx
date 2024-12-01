import { Avatar, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import NavBarTop from "../../../components/NavBarTop";
import { servicesFaker } from "../../../datas/fakers/servicesFaker";
import { usersFaker } from "../../../datas/fakers/usersFaker";
import BtnBottom from "../../../components/BtnBottom";
import { Link } from "react-router-dom";
import { calculatePoints } from "../../../functions/CalculatePoints";
import { issuesFaker } from "../../../datas/fakers/issuesFaker";
import { issue } from "../../../types/issue";
import { useContext } from "react";
import UserContext from "../../../contexts/user.context";
import NavBarBottom from "../../../components/NavBarBottom";

export default function IssueDetailPage() {
    const { user } = useContext(UserContext);
    const userConnectedId = user.id;
    const params = useParams();
    const id = Number(params.id);

    //GET DATA FROM ID PARAM
    const issue: issue = issuesFaker[id];
    let serviceWithIssue: any;
    serviceWithIssue = servicesFaker.find((service) => service.id === issue.service_id);
    let modoDo: any;
    modoDo = usersFaker.find((user) => user.id === issue.user_id_mdo);
    let modoGet: any;
    modoGet = usersFaker.find((user) => user.id === issue.user_id_mget);

    //DATE
    const currentDate = new Date(Date.now());
    const serviceDate = new Date(serviceWithIssue.created_at);
    const issueDate = new Date(issue.created_at);
    const displayedServDate = `${serviceDate.getDate()}/${serviceDate.getMonth() + 1}/${serviceDate.getFullYear()}`;
    const displayedIssueDate = `${issueDate.getDate()}/${issueDate.getMonth() + 1}/${issueDate.getFullYear()}`;
    const pendingServDuration: number = Math.round((currentDate.getTime() - serviceDate.getTime()) / 1000 / 60 / 60 / 24);
    const pendingIssueDuration: number = Math.round((currentDate.getTime() - issueDate.getTime()) / 1000 / 60 / 60 / 24);

    //CALCULATE POINTS
    const servicePoints: any = calculatePoints(serviceWithIssue.skill_level, serviceWithIssue.hard_level, serviceWithIssue.type);

    return (
        <div className="Body cyan">
            <main>
                <header className="h-auto">
                    <NavBarTop />
                    <h1 className="text-4xl font-thin px-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-bold">{serviceWithIssue.category} </div>
                                <div className="flex gap-4 items-center">
                                    <div>{serviceWithIssue.type}</div>

                                    <div className="text-xl drop-shadow-md">
                                        <div className="bg-white w-fit px-2 py-1 rounded-full text-[#15803D] ">En cours</div>
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
                        <CardBody className="border-b-[1px] border-gray-400 pb-2">
                            <div className="flex justify-between items-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    <div>{serviceWithIssue.title}</div>
                                </Typography>
                                <div className="flex gap-2">
                                    {pendingServDuration < 15 && <div>{displayedServDate}</div>}
                                    {pendingServDuration >= 15 && <div className="bg-[#FEE2E2] w-fit px-2 py-[0.25em] rounded-full text-[#DC2626] flex items-center">{displayedServDate}</div>}
                                </div>
                            </div>
                            <div className="flex gap-2 pb-3">
                                <div className="flex gap-2 text-sm items-center">
                                    <div className="bg-gray-500 w-fit px-2 py-[0.25em] rounded-full text-gray-800 flex ites-center">
                                        <span className="material-symbols-outlined scale-75">architecture</span>
                                        <span className="mt-[0.15em]">{serviceWithIssue.skill_level}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-sm items-center">
                                    <div className="bg-gray-500 w-fit px-2 py-[0.25em] rounded-full text-gray-800 flex ites-center">
                                        <span className="material-symbols-outlined scale-75">bar_chart</span>
                                        <span className="mt-[0.15em]">{serviceWithIssue.hard_level}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between gap-8 items-center">
                                <Typography className="text-sm ">
                                    <span>{serviceWithIssue.description}</span>
                                </Typography>
                                <div className="flex gap-2 items-center text-gray-800">
                                    <div className="text-[3.5em] font-bold tracking-tighter">{servicePoints}</div>
                                    <div className="">pts</div>
                                </div>
                            </div>
                        </CardBody>
                        <CardBody className=" pb-2">
                            <div className="flex justify-between items-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    <p>Litige</p>
                                </Typography>
                                <div className="flex gap-2">
                                    {pendingIssueDuration < 15 && <div>{displayedIssueDate}</div>}
                                    {pendingIssueDuration >= 15 && <div className="bg-[#FEE2E2] w-fit px-2 py-[0.25em] rounded-full text-[#DC2626] flex items-center">{displayedIssueDate}</div>}
                                </div>
                            </div>

                            <Typography className="text-sm ">
                                <span>{issue.description}</span>
                            </Typography>
                        </CardBody>
                        <CardFooter color="transparent" className="m-0 p-4 flex items-center justify-between gap-4">
                            <div className="flex flex-col w-full">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    <p>Modérateurs</p>
                                </Typography>
                                <div className="flex justify-between w-full">
                                    <div className="flex gap-4 border-r-[1px] border-gray-400 w-[50%]">
                                        <Avatar size="md" variant="circular" src={modoGet.avatar} alt="tania andrew" />
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <Typography variant="h6">
                                                    {modoGet.firstName} {modoGet.lastName}
                                                </Typography>
                                            </div>
                                            <Typography className="flex items-center text-sm">Demande</Typography>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Avatar size="md" variant="circular" src={modoDo.avatar} alt="tania andrew" />
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <Typography variant="h6">
                                                    {modoDo.firstName} {modoDo.lastName}
                                                </Typography>
                                            </div>
                                            <Typography className="flex items-center text-sm">Offre</Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </main>

            <footer className="w-respLarge px-4 md:px-0">
                {issue.user_id !== userConnectedId && <NavBarBottom addBtn={false} />}
                {issue.user_id === userConnectedId && (
                    <Link to={`/litige/edit/${id}`}>
                        <BtnBottom type="button" label="Modifier le litige" dark={true} />
                    </Link>
                )}
            </footer>
        </div>
    );
}
