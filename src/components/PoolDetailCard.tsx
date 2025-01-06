//import from REACT
import { useContext } from "react";

//import from MATERIAL TAILWIND
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Chip,
    Progress,
    Typography,
} from "@material-tailwind/react";

//Import DATA
import UserContext from "../contexts/user.context";
import { poolsFaker, votesFaker } from "../datas/fakers/surveyFaker";

//import COMPONENTS
import NavBarTop from "./UIX/NavBarTop";
import { CategoriesSelect } from "./UIX/CategoriesSelect";
import BtnBottom from "./UIX/BtnBottom";
import { useLocation } from "react-router";

import { Link } from "react-router-dom";

export default function PoolDetailCard() {
    function getPoolId() {
        const id = useLocation().pathname.split("/")[2];
        return id;
    }

    const poolId = getPoolId();
    const pool = poolsFaker[poolId as unknown as number];

    const { user } = useContext(UserContext);

    const votes = votesFaker.filter(
        (vote) =>
            vote.target === "Cagnotte" && vote.target_id === parseInt(poolId)
    );

    const Completion = (votes.length * 100) / 50;

    function remainingDaysColorAlert() {
        const eventStartTime = new Date(pool.createdAt);
        const eventEndTime = new Date().getTime();
        const duration = Math.floor(
            (eventEndTime.valueOf() - eventStartTime.valueOf()) /
            (1000 * 60 * 60 * 24)
        );
        const daysLeft = 15 - duration;

        if (daysLeft >= 5 && daysLeft < 15) {
            return (
                <div className="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full flex items-center justify-center text-center">
                    {daysLeft} jours restants
                </div>
            );
        } else if (daysLeft >= 0 && daysLeft < 5) {
            return (
                <div className="bg-[#FFEDD5] text-[#F97316] px-4 py-1 rounded-full flex items-center justify-center text-center">
                    {daysLeft} jours restants
                </div>
            );
        } else {
            return (
                <div className="bg-[#FEE2E2] text-[#DC2626] px-4 py-1 rounded-full flex items-center justify-center text-center">
                    Terminé
                </div>
            );
        }
    }

    return (
        <>
            <header className="px-4">
                <NavBarTop />
                <div className="flex items-center justify-between m-4">
                    <h1 className="text-4xl px-4 pb-4">Cagnotte</h1>
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
                <Card>
                    <CardBody>
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold">{pool.title}</h2>
                            {remainingDaysColorAlert()}
                        </div>
                        <div className="flex justify-between my-8 items-center">
                            <h3 className="text-lg text-gray-900">
                                Mon solde de points :
                            </h3>
                            <h3 className="text-lg text-gray-800">
                                <strong className="font-bold text-5xl">
                                    {user.points}
                                </strong>
                                pts
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm text-justify">
                            {pool.description}
                        </p>
                        <div className="flex flex-col items-center">
                            <div className="w-full mt-4">
                                <div className="flex items-center justify-between">
                                    <Typography
                                        color="blue-gray"
                                        variant="small"
                                    >
                                        Complété
                                    </Typography>
                                    <Typography
                                        color="blue-gray"
                                        variant="small"
                                    >
                                        {Completion}%
                                    </Typography>
                                </div>
                                <Progress value={Completion} />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="flex justify-between">
                        <div className="flex items-center  justify-between w-full">
                            <div className="flex gap-4 w-full">
                                <Avatar
                                    src={user.image as string}
                                    alt="avatar"
                                    size="md"
                                />

                                <div className="flex flex-col">
                                    <Typography variant="h6">
                                        {user.firstName + " " + user.lastName}
                                    </Typography>
                                    <Typography variant="small">
                                        Quartier BLOB
                                    </Typography>
                                </div>
                            </div>
                            <Chip
                                variant="ghost"
                                value={votes.length} // Change this to the number of participants value
                                size="lg"
                                className="rounded-full text-md"
                                icon={
                                    <span className="material-symbols-outlined fill">
                                        person
                                    </span>
                                }
                            />
                        </div>
                    </CardFooter>
                </Card>
                <div className="flex flex-col items-center mt-4">
                    <CategoriesSelect
                        categoriesArray={[
                            "Je donne 10 points",
                            "Je ne souhaite pas donner de points",
                        ]}
                        label="Mon opinion"
                        disabled={false}
                        change={(e: any) => console.log(e)}
                    />
                </div>
                <BtnBottom label="Voter" dark={true} type={undefined} />
            </main>
        </>
    );
}
