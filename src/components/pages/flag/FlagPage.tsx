// + calendar view
import { useEffect, useState } from "react";
import NavBarBottom from "../../UIX/NavBarBottom";
import NavBarTop from "../../UIX/NavBarTop";
import SubHeader from "../../UIX/SubHeader";
import { FlagCard } from "../../flagComps/FlagCard";
import Skeleton from "react-loading-skeleton";
import { FlagService } from "../../../data/repositories/FlagRepository";
import { Flag } from "../../../domain/entities/Flag";


export default function FlagPage() {
    const [notifFind] = useState<string>('');
    const [flags, setFlags] = useState<Flag[]>([])
    // const [flagList, setFlagList] = useState<Flag[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const { getFlagsByUserId } = new FlagService();

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

            <main className="Grid ">
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