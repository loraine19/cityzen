import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Action } from '../../../../domain/entities/frontEntities';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import PoolDetailCard from './voteCards/PoolDetailCard';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { VoteCard } from './voteCards/VoteCard';
import { Button } from '@material-tailwind/react';

export default function PoolDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0
    const poolIdViewModelFactory = DI.resolve('poolIdViewModel');
    const { pool, isLoading, refetch } = poolIdViewModelFactory(idS);
    const handleOpen = () => setOpen(!open);
    const deletePool = async (id: number) => await DI.resolve('deletePoolUseCase').execute(id)
    const myActions: Action[] = pool && GenereMyActions(pool, "vote/cagnotte", deletePool, handleOpen)

    //// ACTIONS

    const [open, setOpen] = useState(false);
    const [openVote, setOpenVote] = useState(false);

    return (<>
        {openVote &&
            <VoteCard
                open={openVote}
                setOpen={setOpenVote}
                vote={pool}
                refetch={refetch}
            />}
        <div className="Body orange">

            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    type={`Cagnotte `}
                    link={`/vote`}
                    closeBtn />
            </header>
            <main>
                {isLoading || !pool ?
                    <Skeleton /> :
                    <PoolDetailCard
                        pool={pool}
                        setOpen={setOpenVote} />
                }
            </main>

            {pool?.mine ?
                <CTAMines actions={myActions} /> :
                <footer className={`flex gap-2 gap-x-4 w-respLarge justify-around py-2 min-h-max overflow-y-auto `}>
                    <Button
                        className='lgBtn w-respLarge min-h-max'
                        onClick={() => setOpenVote(true)}
                    >
                        {pool.IVoted ? 'Modifier mon vote' : 'Voter'}
                    </Button>
                </footer>
            }
        </div>
    </>
    );
}

