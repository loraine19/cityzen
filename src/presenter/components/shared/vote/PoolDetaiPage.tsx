import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Icon } from '../../common/IconComp';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { PoolSurveyStatus } from '../../../../domain/entities/PoolSurvey';

export default function PoolDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0
    const poolIdViewModelFactory = DI.resolve('poolIdViewModel');
    const { pool, isLoading, refetch, error } = poolIdViewModelFactory(idS);
    const deletePool = async (id: number) => await DI.resolve('deletePoolUseCase').execute(id)
    const myActions: Action[] = pool && GenereMyActions(pool, "vote/cagnotte", deletePool)

    //// ACTIONS

    const { handleApiError } = useAlertStore()
    const navigate = useNavigate();
    useEffect(() => { if (error) handleApiError(error, () => navigate('/vote/sondage')) }, [isLoading]);
    const [openVote, setOpenVote] = useState(false);

    return (<>
        {openVote &&
            <VoteCard
                open={openVote}
                close={() => setOpenVote(false)}
                vote={pool}
                refetch={refetch} />}
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
                <footer className={`CTA`}>
                    <Button
                        disabled={pool?.status !== PoolSurveyStatus.PENDING}
                        size='lg'
                        color='orange'
                        className='lgBtn'
                        onClick={() => setOpenVote(true)}
                    >
                        <Icon
                            fill
                            icon='smart_card_reader'
                            color='white' />
                        {pool.IVoted ? pool.status !== PoolSurveyStatus.PENDING ? 'Modifier mon vote' : 'Voter' : 'Cette cagnotte est terminé'}
                    </Button>
                </footer>
            }
        </div>
    </>
    );
}

