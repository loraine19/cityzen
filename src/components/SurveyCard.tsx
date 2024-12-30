//import from MATERIAL TAILWIND
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Progress,
    Button,
} from "@material-tailwind/react";

//import TYPES
import { survey } from "../types/survey";
import ModifBtnStack from "./UIX/ModifBtnStack";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/user.context";
import { votesFaker } from "../datas/fakers/surveyFaker";
import { usersFaker } from "../datas/fakers/usersFaker";
import RemainingDays from "../functions/RemainingDays";

interface SurveyCardProps {
    survey: survey;
    id: number;
}

export default function SurveyCard(props: SurveyCardProps) {
    // Data
    const { survey } = props;
    const { user } = useContext(UserContext);
    const numberOfUsers = usersFaker;

    // number of votes for this survey
    const votes = votesFaker.filter(
        (vote) => vote.target === "Sondage" && vote.target_id === survey.id
    );

    // completion percentage for this survey
    const completion = Math.round(
        (votes.length * 100) / (numberOfUsers.length / 2)
    );

    return (
        <>
            <Card className="mt-6 w-resp ">
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-[#06B6D4] text-white px-4 py-1 rounded-full">
                                {survey.category}
                            </div>
                            {RemainingDays(survey.createdAt)}
                        </div>
                        <div className=" px-0 py-1">{survey.createdAt}</div>
                    </div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {survey.title}
                    </Typography>
                    <Typography className="text-sm">
                        {survey.description}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex items-center justify-between ">
                    {survey.user_id === user.id ? (
                        <div className="flex items-center gap-1 mt-4">
                            <ModifBtnStack
                                icon3={false}
                                id={survey.id}
                                disabledEdit={completion === 0 ? false : true}
                            />
                            <Link
                                to={`/sondage/${survey.id}`}
                                state={{ id: survey.id }}
                            >
                                <Button className="flex items-center justify-center rounded-full h-9 w-9 p-1 ">
                                    <span className="material-symbols-outlined !text-[1.3rem]">
                                        arrow_right_alt
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    ) : null}
                    <div className="w-[60%]">
                        <div className="mb-2 flex items-center justify-between gap-4">
                            <Typography color="blue-gray" variant="h6">
                                Complété
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                                {completion}%
                            </Typography>
                        </div>
                        <Progress value={completion} />
                    </div>
                    {survey.user_id !== user.id ? (
                        <Link to={`/sondage/${survey.id}`}>
                            <Button className="flex items-center justify-center rounded-full h-9 w-9 p-1 ">
                                <span className="material-symbols-outlined !text-[1.3rem]">
                                    arrow_right_alt
                                </span>
                            </Button>
                        </Link>
                    ) : null}
                </CardFooter>
            </Card>
        </>
    );
}
