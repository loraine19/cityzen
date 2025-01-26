import { useEffect, useState } from "react";
import { Flag } from "../../../../domain/entities/Flag";
import { FlagService } from "../../../../domain/repositoriesBase/FlagRepository";
import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import { FlagCard } from "./flagComps/FlagCard";
import { SkeletonGrid } from "../../common/Skeleton";



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
                    <SubHeader qty={flags.length} type={"Signalement "} closeBtn={true} link="/" /></div>
                <div className={notifFind && "w-full flex justify-center p-8"}>{notifFind}</div>
            </header>

            <main className="Grid ">
                {loading ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4}
                            small={true} />
                    ))
                    :
                    flags.map((element: Flag, index: number) => <FlagCard key={index} flag={element} update={fetch} />)}
            </main>
            <NavBarBottom />

        </div >
    )

}