import NavBarBottom from "../../common/NavBarBottom";
import NavBarTop from "../../common/NavBarTop";
import SubHeader from "../../common/SubHeader";
import { FlagCard } from "./flagComps/FlagCard";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from "../../../../di/ioc";
import { FlagView } from "../../../views/viewsEntities/flagViewEntities";



export default function FlagPage() {

    const { flags, isLoading, error, refetch } = DI.resolve('flagsViewModel')
    console.log(flags)

    /////FILTER FUNCTIONS
    return (
        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <div className="flex ">
                    <SubHeader qty={flags?.length || 'aucun'} type={"Signalement "} closeBtn={true} link="/" /></div>
            </header>

            <main className="GridSmall ">
                {isLoading || error ? [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                    <SkeletonGrid
                        key={index}
                        count={4}
                        small={true} />
                ))
                    :
                    flags.map((element: FlagView, index: number) =>
                        <div className="SubGrid " key={'div' + index}>    <FlagCard key={index} flag={element} update={refetch} />
                        </div>)}
            </main>
            <NavBarBottom />

        </div >
    )

}