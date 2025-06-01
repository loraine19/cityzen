import NavBarBottom from "../../common/NavBarBottom";
import SubHeader from "../../common/SubHeader";
import { FlagCard } from "./flagCards/FlagCard";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from "../../../../di/ioc";
import { FlagView } from "../../../views/viewsEntities/flagViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { useRef, useState } from "react";



export default function FlagPage() {

    const { flags, isLoading, error, refetch, hasNextPage, fetchNextPage } = DI.resolve('flagsViewModel')

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
        <>
            <main>
                <div className="sectionHeader">
                    <SubHeader qty={flags?.length || 'aucun'} type={"Signalement "} closeBtn={true} link="/" />
                </div>

                <section className="GridSmall ">
                    {isLoading || error ? [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4}
                            small={true} />
                    ))
                        :
                        flags.map((element: FlagView, index: number) =>
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
                </section>
            </main>
            <NavBarBottom />
        </ >
    )

}