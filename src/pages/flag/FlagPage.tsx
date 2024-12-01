// + calendar view
import { useContext, useState } from "react";
import UserContext from "../../contexts/user.context";
import { deleteElementJoin, getFlagsUser } from "../../functions/GetDataFunctions";
import postsFaker from "../../datas/fakers/postsFaker";
import { poolsFaker, surveysFaker } from "../../datas/fakers/surveyFaker";
import { servicesFaker } from "../../datas/fakers/servicesFaker";
import { flag, } from "../../types/type";
import NavBarBottom from "../../components/NavBarBottom";
import NavBarTop from "../../components/NavBarTop";
import SubHeader from "../../components/SubHeader";
import { FlagCard } from "../../components/flagComps/FlagCard";
import eventsFaker from "../../datas/fakers/eventsFaker";
import { flagsFaker } from "../../datas/fakers/flagsFaker";


export default function FlagPage() {
    const { user } = useContext(UserContext)
    const idS = user.id ? user.id : 0
    const flagList1 = getFlagsUser(postsFaker, eventsFaker, surveysFaker, poolsFaker, servicesFaker, flagsFaker, idS);
    const [flagList, setflagList] = useState<any[]>(flagList1 ? flagList1 : []);
    const [notifFind] = useState<string>('');

    const handleDelete = (flag: flag) => deleteElementJoin(flag, flagList, setflagList)


    /////FILTER FUNCTIONS
    return (
        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <div className="flex ">
                    <SubHeader qty={flagList.length} type={"Signalement "} /></div>


                <div className={notifFind && "w-full flex justify-center p-8"}>{notifFind}</div>
            </header>

            <main className="Grid !content-start !gap-3           ">
                {flagList.map((element: flag, index: number) =>
                    <FlagCard key={index} flag={element} handleClick={(element) => handleDelete(element)} />)}
            </main>
            <NavBarBottom />

        </div >
    )

}