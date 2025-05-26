import { useNavigate, useParams } from 'react-router-dom';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import { Action } from '../../../../domain/entities/frontEntities';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { useEffect } from 'react';
import GroupDetailCard from './GroupDetailCard';

export default function GroupDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;
    const groupIdViewModelFactory = DI.resolve('groupIdViewModel');
    const { group, isLoading, error, refetch } = groupIdViewModelFactory(idS);
    const deleteGroup = async (id: number) => await DI.resolve('deleteGroupUseCase').execute(id);
    const { setOpen, open, handleApiError } = useAlertStore(state => state);
    const handleOpen = () => setOpen(!open)
    const myActions = group && GenereMyActions(group, "groupe", deleteGroup)
    const navigate = useNavigate();
    useEffect(() => { if (error) handleApiError(error, () => navigate('/groupe')) }, [isLoading])



    //// CONTACT ACTIONS
    const MemberShipActions: Action[] = !group ? [] : [
        {
            iconImage: 'diversity_3',
            icon: group.ImModo ? 'Je suis conciliateur' : 'Devenir conciliateur',
            title: "Confirmer mon rôle " + group?.name,
            body: `En tant que membre du groupe, vous pouvez devenir conciliateur pour aider à résoudre les litiges et les différends  liés aux services au sein du groupe.`,
            function: async () => {
                await group.toogleModo();
                await refetch();
                handleOpen()
            },
            color: group.ImModo ? 'red' : 'orange',
        },
        {
            iconImage: 'groups',
            icon: group.ImIn ? 'Je suis membre' : 'Rejoindre le groupe',
            title: "Rejoindre le groupe " + group?.name,
            body: `En tant que membre du groupe, vous pouvez participer aux discussions, aux décisions et aux activités du groupe.`,
            function: async () => {
                await group.toogleMember();
                await refetch();
                handleOpen()
            },
            color: group.ImIn ? 'red' : 'cyan'
        }
    ]

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    type={`Groupes ${group?.categoryS ?? ""}`} closeBtn />
            </header>
            <main>
                {!isLoading && !error && group ?
                    <div className="flex pt-6 pb-1 h-full">
                        <GroupDetailCard
                            actions={myActions}
                            refetch={refetch}
                            group={group} />
                    </div> :
                    <Skeleton />}
            </main>
            {(!isLoading && !error && group) ?
                <>
                    {group?.ImModo ?
                        <CTAMines
                            actions={myActions} /> :
                        <CTAMines
                            actions={MemberShipActions}
                        />
                    }
                </> :
                <footer className={`CTA`}>
                </footer>}

        </div>
    )
}

