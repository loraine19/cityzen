import NavBarBottom from '../../common/NavBarBottom';
import NavBarTop from '../../common/NavBarTop';
import { Skeleton, } from '../../common/Skeleton';
import SubHeader from '../../common/SubHeader';

export const LoadingPage = () => {

    const path = window.location.pathname
    let bodyColor = 'defaultColor';
    switch (path.split('/')[1]) {
        case 'service': case 'evenement': case 'groupe': case 'profil': bodyColor = 'cyan'; break;
        case 'vote': case 'annonce': case 'sondage': case 'cagnotte': case 'litige': bodyColor = 'orange'; break;
        default: bodyColor = 'gray'; break;
    }

    return (
        <>
            <div className={"Body " + bodyColor}>
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={"Chargement"} />

                </header>
                <main className="flex gap-3 items-center justify-evenly h-full  ">

                    {[...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <div
                            className='flex lg:flex-row flex-col  h-full gap-3 w-full items-center justify-center flex-1'>
                            <Skeleton
                                key={index} /> <Skeleton
                                key={index + '2'} />
                        </div>
                    ))}
                </main>
                <NavBarBottom addBtn={true} />
            </div>
        </>

    )
}


