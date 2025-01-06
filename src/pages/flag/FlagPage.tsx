// + calendar view
import { useEffect, useState } from "react";
import NavBarBottom from "../../components/UIX/NavBarBottom";
import NavBarTop from "../../components/UIX/NavBarTop";
import SubHeader from "../../components/UIX/SubHeader";
import { FlagCard } from "../../components/flagComps/FlagCard";
import { getFlagsByUserId } from "../../functions/API/flagsApi";
import { Flag } from "../../types/class";
import Skeleton from "react-loading-skeleton";


export default function FlagPage() {
    const [notifFind] = useState<string>('');
    const [flags, setFlags] = useState<Flag[]>([])
    // const [flagList, setFlagList] = useState<Flag[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = async () => {
        const flags = await getFlagsByUserId()
        if (flags.length > 0) {
            setFlags(flags);
            setLoading(false)
        }
    }
    useEffect(() => { fetch() }, []);


    /////FILTER FUNCTIONS
    return (
        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <div className="flex ">
                    <SubHeader qty={flags.length} type={"Signalement "} /></div>
                <div className={notifFind && "w-full flex justify-center p-8"}>{notifFind}</div>
            </header>

            <main className="Grid !content-start !gap-3">
                {loading ?
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton key={index} height={130} className="!rounded-2xl" />))
                    :
                    flags.map((element: Flag, index: number) => <FlagCard key={index} flag={element} update={fetch} />)}
            </main>
            <NavBarBottom />

        </div >
    )

}