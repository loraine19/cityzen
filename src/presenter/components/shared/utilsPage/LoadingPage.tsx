import NavBarBottom from '../../common/NavBarBottom';
import NavBarTop from '../../common/NavBarTop';
import { SkeletonGrid, } from '../../common/Skeleton';
import SubHeader from '../../common/SubHeader';

export const LoadingPage = () => {



    return (
        <>
            <header>
                <NavBarTop />

            </header>
            <main>
                <div className="sectionHeader w-full">
                    <SubHeader type={"Chargement "} />
                </div>
                <SkeletonGrid />
            </main>
            <NavBarBottom addBtn={true} />
        </>

    )
}


