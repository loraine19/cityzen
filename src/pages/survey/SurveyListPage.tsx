//import from REACT & REACT ROUTER DOM
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import COMPONENTS
import NavBarBottom from "../../components/NavBarBottom";
import NavBarTop from "../../components/NavBarTop";
import SurveyCard from "../../components/SurveyCard";
import TabsMenu from "../../components/TabsMenu";
import SubTabsMenu from "../../components/SubTabsMenu";
import PoolCard from "../../components/PoolCard";

//import TYPES
import { label } from "../../types/label";
import { subLabel } from "../../types/subLabel";
import { survey, pool } from "../../types/survey";

//import FAKERS
import { surveysFaker, poolsFaker } from "../../datas/fakers/surveyFaker";

// -------------------------------------------------------- //

export default function SurveyListPage() {
    //temporary data
    const loggedUser = 1;

    const navigate = useNavigate();
    const handleClick = () => navigate("/sondage-creation");

    // function to concat 2 arrays with different types
    const conc = (array1: [], array2: []): any[] => {
        const newA: [] = [];
        array1.map((obj) => newA.push(obj));
        array2.map((obj) => newA.push(obj));
        return newA;
    };

    const surveysAndPools: pool[] | survey[] = conc(
        poolsFaker as [],
        surveysFaker as []
    );

    const [surveysPoolsList, setSurveysPoolsList] = useState<pool[] | survey[]>(
        surveysAndPools
    );

    const [votesTabled, setVotesTabled] = useState<pool[] | survey[]>([]);

    const [tabSelected, setTabSelected] = useState<string>("");

    const [subTabSelected, setSubTabSelected] = useState<string>("");

    const tabButton: any = document.querySelector(`li[data-value="All"]`);

    // pour premier label :
    const filterVotes = (newArray: any, value: string) => {
        tabButton && tabButton.click();
        setVotesTabled(newArray);
        setSurveysPoolsList(newArray);
        setTabSelected(value);
        10 < 9 ? console.log(setSubTabSelected) : 10;
        10 < 9 ? console.log(tabSelected) : 10;
    };

    const dayInMilli = 24 * 60 * 60 * 1000;

    const newVotes = (array: survey[] | pool[]) => {
        return array.filter(
            (element: survey | pool) =>
                new Date(element.createdAt).getTime() >=
                new Date().getTime() - 3 * dayInMilli
        );
    };

    console.log(surveysAndPools);

    const onGoingVotes = (array: survey[] | pool[]) => {
        return array.filter(
            (element: survey | pool) =>
                new Date(element.createdAt).getTime() >=
                new Date().getTime() - 15 * dayInMilli
        );
    };

    const endedVotes = (array: survey[] | pool[]) => {
        return array.filter(
            (element: survey | pool) =>
                new Date(element.createdAt).getTime() <=
                new Date().getTime() - 15 * dayInMilli
        );
    };

    const labels: label[] = [
        {
            label: "Tous",
            value: "Tous",
            result: () => {
                filterVotes([...surveysAndPools], "Tous");
            },
        },
        {
            label: "Sondages",
            value: "Sondages",
            result: () => {
                filterVotes(
                    [
                        ...surveysAndPools.filter(
                            (element: any) => element.category && element
                        ),
                    ],
                    "Sondage"
                );
            },
        },
        {
            label: "Cagnottes",
            value: "Cagnottes",
            result: () => {
                filterVotes(
                    [
                        ...surveysAndPools.filter(
                            (element: any) => element.user_id_receive && element
                        ),
                    ],
                    "Cagnottes"
                );
            },
        },
        {
            label: "Mes sondages",
            value: "Mes sondages",
            result: () => {
                filterVotes(
                    [
                        ...surveysAndPools.filter(
                            (element: any) =>
                                element.user_id === loggedUser ||
                                element.user_id_create === loggedUser
                        ),
                    ],
                    "Mes sondages"
                );
            },
        },
    ];

    const subLabels: subLabel[] = [
        {
            label: "Tous",
            value: "All",
            result: () => {
                setSurveysPoolsList(votesTabled);
            },
        },
        {
            label: "Nouveaux",
            value: "Nouveaux",
            result: () => {
                setSurveysPoolsList(newVotes(votesTabled) as pool[] | survey[]),
                    "Nouveaux";
            },
        },
        {
            label: "En cours",
            value: "En cours",
            result: () => {
                setSurveysPoolsList(
                    onGoingVotes(votesTabled) as pool[] | survey[]
                ),
                    "En cours";
            },
        },
        {
            label: "Terminés",
            value: "Terminés",
            result: () => {
                setSurveysPoolsList(
                    endedVotes(votesTabled) as pool[] | survey[]
                ),
                    "Terminés";
            },
        },
    ];

    useEffect(() => {}, []);

    return (
        <div className="Body orange">
            <header>
                <NavBarTop />
                <h1 className="text-4xl px-4 pb-4">
                    <strong>
                        {surveysPoolsList.length} Nouvelles decisions
                    </strong>{" "}
                    de quartier
                </h1>
                <TabsMenu labels={labels} subMenu={false} />
                <SubTabsMenu
                    subLabels={subLabels}
                    color={"orange"}
                    subTabSelected={subTabSelected}
                />
            </header>
            <main>
                <div className="grid gap-4 md:grid-cols-2 w-full">
                    {surveysPoolsList.map((element: any) =>
                        element.category ? (
                            <SurveyCard survey={element} id={element.id} />
                        ) : (
                            <PoolCard pool={element} id={element.id} />
                        )
                    )}
                </div>
            </main>
            <NavBarBottom handleClick={handleClick} addBtn={true} />
        </div>
    );
}
