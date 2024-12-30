// + calendar view
import { useContext, useState } from "react";
import UserContext from "../../contexts/user.context";
import { deleteElementJoin, getFlagsUser } from "../../functions/GetDataFunctions";
import { flag, } from "../../types/type";
import NavBarBottom from "../../components/UIX/NavBarBottom";
import NavBarTop from "../../components/UIX/NavBarTop";
import SubHeader from "../../components/UIX/SubHeader";
import { FlagCard } from "../../components/flagComps/FlagCard";
import DataContext from "../../contexts/data.context";



export default function FlagPage() {
    const { user } = useContext(UserContext)
    const { data } = useContext(DataContext)
    const { posts, events, surveys, pools, services, flags } = data
    const idS = user.id ? user.id : 0
    const flagList1 = getFlagsUser(posts, events, surveys, pools, services, flags, idS);
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