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
import { pool } from "../types/survey";
import ModifBtnStack from "./UIX/ModifBtnStack";
import { Link } from "react-router-dom";
import UserContext from "../contexts/user.context";
import { useContext } from "react";
import { votesFaker } from "../datas/fakers/surveyFaker";

interface PoolCardProps {
    id: number;
    pool: pool;
}

export default function PoolCard(props: PoolCardProps) {
    // Data
    const { pool } = props;
    const { user } = useContext(UserContext);

    // number of votes for this survey
    const votes = votesFaker.filter(
        (vote) => vote.target === "Cagnotte" && vote.target_id === pool.id
    );

    // completion percentage for this survey
    const completion = (votes.length * 10 * 100) / 50;

    //function to return the REMAINING DAYS color ALERT
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
                <div className="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full">
                    {daysLeft} jours restants
                </div>
            );
        } else if (daysLeft >= 0 && daysLeft < 5) {
            return (
                <div className="bg-[#FFEDD5] text-[#F97316] px-4 py-1 rounded-full">
                    {daysLeft} jours restants
                </div>
            );
        } else {
            return (
                <div className="bg-[#FEE2E2] text-[#DC2626] px-4 py-1 rounded-full">
                    Terminé
                </div>
            );
        }
    }

    return (
        <Card className="mt-6 w-resp ">
            <CardBody>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mb-4">
                        {remainingDaysColorAlert()}
                    </div>
                    <div className=" px-0 py-1">{pool.createdAt}</div>
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {pool.title}
                </Typography>
                <Typography className="text-sm">{pool.description}</Typography>
            </CardBody>

            <CardFooter className="pt-0 flex items-center justify-between ">
                {pool.user_id_create === user.id ? (
                    <div className="flex items-center gap-1 mt-4">
                        <ModifBtnStack
                            icon3={false}
                            id={pool.id}
                            isPool={true}
                            disabledEdit={completion === 0 ? false : true}
                        />
                        <Link to={`/cagnotte/${pool.id}`}>
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
                {pool.user_id_create !== user.id ? (
                    <Link to={`/cagnotte/${pool.id}`}>
                        <Button className="flex items-center justify-center rounded-full h-9 w-9 p-1">
                            <span className="material-symbols-outlined !text-[1.3rem]">
                                arrow_right_alt
                            </span>
                        </Button>
                    </Link>
                ) : null}
            </CardFooter>
        </Card>
    );
}
