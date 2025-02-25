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

export default function PoolDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0
    const poolIdViewModelFactory = DI.resolve('poolIdViewModel');
    const { pool, isLoading } = poolIdViewModelFactory(idS);
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(!open);
    const deletePool = async (id: number) => await DI.resolve('deletePoolUseCase').execute(id)
    const myActions = pool && GenereMyActions(pool, "vote/cagnotte", deletePool, handleOpen)

    //// ACTIONS
    const Actions: Action[] = [
        {
            icon: 'Sans avis',
            title: "Confirmer votre vote neutre ",
            body: `Pour la cagnotte ${pool?.title} `,
            function: () => { window.open(`tel:${pool?.User?.Profile.phone}`); handleOpen(); },
        },
        {
            icon: 'Voter contre',
            title: 'Confirmer votre vote contre',
            body: `Pour la cagnotte ${pool?.title} `,
            function: () => { window.open(`mailto:${pool?.User?.email}?subject=${pool?.title}`); handleOpen(); },
        },
        {
            icon: 'Voter Pour',
            title: 'Confirmer votre vote pour',
            body: `Pour la cagnotte ${pool?.title} `,
            function: () => { window.open(`mailto:${pool?.User?.email}?subject=${pool?.title}`); handleOpen(); },
        },
    ]

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    type={`Cagnotte `}
                    link={`vote`}
                    closeBtn />
            </header>
            <main>
                {isLoading || !pool ?
                    <Skeleton /> :
                    <PoolDetailCard pool={pool} />
                }
            </main>

            {pool?.mine ?
                <CTAMines actions={myActions} /> :
                <CTAMines actions={Actions} />}
        </div>
    );
}

