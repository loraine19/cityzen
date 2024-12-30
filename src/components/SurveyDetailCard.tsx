import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Progress,
    Typography,
} from "@material-tailwind/react";
import NavBarTop from "./UIX/NavBarTop";
import { CategoriesSelect } from "./UIX/CategoriesSelect";
import BtnBottom from "./UIX/BtnBottom";
//import { survey } from "../types/survey";
import { Link, useLocation } from "react-router-dom";

import { surveysFaker, votesFaker } from "../datas/fakers/surveyFaker";
import { useContext } from "react";
import UserContext from "../contexts/user.context";
import { usersFaker } from "../datas/fakers/usersFaker";

export default function SurveyDetailCard() {
    function getSurveyId() {
        const id = useLocation().pathname.split("/")[2];
        return id;
    }

    const surveyId = getSurveyId();
    const survey = surveysFaker[surveyId as unknown as number];

    const votes = votesFaker.filter(
        (vote) =>
            vote.target === "Sondage" && vote.target_id === parseInt(surveyId)
    );

    const numberOfUsers = usersFaker;
    const Completion = Math.round(
        (votes.length * 100) / (numberOfUsers.length / 2)
    );

    console.log(votes);

    console.log(survey);
    console.log(surveyId);

    function remainingDaysColorAlert() {
        const eventStartTime = new Date(survey.createdAt).getTime();
        const eventEndTime = new Date().getTime();
        const duration = Math.floor(
            (eventEndTime - eventStartTime) / (1000 * 60 * 60 * 24)
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

    const { user } = useContext(UserContext);

    function editMySurveyCard() {
        if (survey.user_id === user.id) {
            return (
                <div className="flex flex-col items-center mt-4">
                    <Link to={`/sondage`}>
                        <BtnBottom
                            label="Retour"
                            dark={true}
                            type={undefined}
                        />
                    </Link>
                    <Link to={`/sondage/edit/${survey.id}`}>
                        <BtnBottom
                            label="Modifier"
                            dark={true}
                            type={undefined}
                        />
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-center mt-4">
                    <CategoriesSelect
                        categoriesArray={survey.opinion}
                        label="Mon opinion"
                        disabled={false}
                        change={(e: any) => console.log(e)}
                    />
                    <BtnBottom label="Voter" dark={true} type={undefined} />
                </div>
            );
        }
    }

    return (
        <>
            <header className="px-4 ">
                <NavBarTop />
                <div className="flex items-center justify-between m-4">
                    <h1 className="text-4xl px-4 pb-4">Sondage</h1>
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
                    <CardHeader className="relative  h-full max-h-72 object-cover">
                        <img
                            className="rounded-lg w-full h-full object-cover"
                            src={survey.image}
                            alt="image"
                        />
                    </CardHeader>
                    <CardBody>
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold">
                                {survey.title}
                            </h2>
                            {remainingDaysColorAlert()}
                        </div>
                        <p className="text-gray-600 text-md mt-4 text-justify">
                            {survey.description}
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
                                    src={user.avatar}
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
                                value={votes.length} // Change this to the number of participants
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
                {editMySurveyCard()}
            </main>
        </>
    );
}
