import NavBarBottom from '../../common/NavBarBottom';
import NavBarTop from '../../common/NavBarTop';
import { Skeleton, } from '../../common/Skeleton';
import SubHeader from '../../common/SubHeader';

export const LoadingPage = () => {



    return (
        <>
            <header className="px-4">
                <NavBarTop />

            </header>
            <main className="flex gap-3  items-center justify-evenly h-full  ">
                <SubHeader type={"Chargement "} />
                <section>
                    {[...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <div
                            key={index + 'div'}
                            className='flex lg:flex-row flex-col  h-full gap-3 w-full items-center justify-center flex-1'>
                            <Skeleton
                                key={index} />
                            <Skeleton
                                key={index + '2'} />
                        </div>
                    ))}
                </section>
            </main>
            <NavBarBottom addBtn={true} />
        </>

    )
}


