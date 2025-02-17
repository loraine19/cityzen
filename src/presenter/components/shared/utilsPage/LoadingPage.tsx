import NavBarBottom from '../../common/NavBarBottom';
import NavBarTop from '../../common/NavBarTop';
import { SkeletonGrid } from '../../common/Skeleton';
import SubHeader from '../../common/SubHeader';

export const LoadingPage = () => {


    const path = window.location.pathname
    let bodyColor = 'defaultColor';
    if (path.includes('service') || path.includes('evenemen')) {
        bodyColor = 'cyan';
    }
    else if (path.includes('annonce') || path.includes('sondage') || path.includes('cagnotte') || path.includes('litige')) {
        bodyColor = 'orange'
    }
    else bodyColor = 'gray'


    return (
        <>


            <div className={"Body " + bodyColor}>
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={"Chargement"} />

                </header>
                <main className="flex items-center justify-evenly h-full py-10">

                    {[...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4} />
                    ))}
                </main>
                <NavBarBottom addBtn={true} />
            </div>
        </>

    )
}


