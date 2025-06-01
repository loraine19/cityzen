
import SubHeader from "../../common/SubHeader";
import { FlagCard } from "./flagCards/FlagCard";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from "../../../../di/ioc";
import { FlagView } from "../../../views/viewsEntities/flagViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { useEffect, useRef, useState } from "react";
import NotifDiv from "../../common/NotifDiv";



export default function FlagPage() {

    const { flags, isLoading, error, refetch, hasNextPage, fetchNextPage, count } = DI.resolve('flagsViewModel')

    const [notif, setNotif] = useState<string>('hhh');

    useEffect(() => {
        switch (true) {
            case error:
                setNotif('Une erreur est survenue lors du chargement')
                break;
            case (count === 0 && !isLoading):
                setNotif('Aucun signalement trouvé')
                break;
            default:
                setNotif('')
        }
    }, [isLoading, error, count]);
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) {
                    fetchNextPage();
                }
            } else {
                setIsBottom(false);
            }
        }
    }

    /////FILTER FUNCTIONS
    return (
        <main>
            <div className="sectionHeader">
                <SubHeader
                    qty={count || 'aucun'}
                    type={"Signalement "}
                    closeBtn={true} link="/" />
                {(notif && !isLoading) &&
                    <NotifDiv
                        notif={notif}
                        isLoading={isLoading}
                        refetch={refetch} />}
            </div>
            {isLoading ?
                <SkeletonGrid small count={6} /> :
                <section className="GridSmall ">
                    {flags.map((element: FlagView, index: number) =>
                        <div className="SubGrid " key={'div' + index}>
                            <FlagCard
                                key={index}
                                flag={element}
                                update={refetch} />
                        </div>)}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={handleScroll} />
                </section>}
        </main>
    )

}