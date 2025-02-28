import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'
import { ServiceType } from '../../../../../domain/entities/Service'
import CTAMines from '../../../common/CTAMines';
import NavBarTop from '../../../common/NavBarTop';
import SubHeader from '../../../common/SubHeader';
import { IssueForm } from './IssueDetailCard';
import { Action } from '../../../../../domain/entities/frontEntities';
import { useUserStore } from '../../../../../application/stores/user.store';
import { Skeleton } from '../../../common/Skeleton';
import DI from '../../../../../di/ioc';



export default function IssueDetailPage() {
    const { id } = useParams()
    const { user } = useUserStore()
    const userId = user.id
    const navigate = useNavigate();
    const [statusValue,] = useState<number>(0);

    const idS = id ? parseInt(id) : 0;
    const issueIdViewModelFactory = DI.resolve('issueIdViewModel');
    const { issue, isLoading } = issueIdViewModelFactory(idS);

    const deleteIssue = async (id: number) => await DI.resolve('deleteIssueUseCase').execute(id);
    // const respService = async (id: number) => await DI.resolve('respServiceUseCase').execute(id);
    // const cancelRespService = async (id: number) => await DI.resolve('cancelRespServiceUseCase').execute(id);
    // const validRespService = async (id: number) => await DI.resolve('validRespServiceUseCase').execute(id);
    // const finishService = async (id: number) => await DI.resolve('finishServiceUseCase').execute(id);




    const MyActions: Action[] = [{
        icon: statusValue < 1 ? 'En attente' : 'Conciliation en cours',
        title: 'Valider la conciliation',
        body: 'service.title as string,',
        function: () => { }
    },
    {
        icon: statusValue < 2 ? 'Supprimer la conciliation' : '',
        title: 'Supprimer la conciliation',
        body: 'service.title as string',
        function: async () => { const ok = await deleteIssue(issue.serviceId); ok && navigate('/service?search=myservices') }
    }]

    const RespActions = [
        {
            icon: 'Choisir mon modérateur',
            title: 'Choisir mon modérateur',
            body: '--',
            function: () => { navigate('/conciliation/edit/' + issue.serviceId) }
        }]





    return (
        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    type={"Conciliation"}
                    place={` sur une ${ServiceType[issue?.Service?.type as unknown as keyof typeof ServiceType]} de service  ${userId === issue?.Service?.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`}
                    closeBtn />
            </header>
            {isLoading || !issue ?
                <Skeleton className="w-respLarge !rounded-2xl !h-[calc(100vh-16rem)] shadow m-auto" /> :
                <IssueForm
                    issue={issue} />
            }
            {issue?.mine &&
                <CTAMines
                    actions={MyActions}
                    disabled1={statusValue < 1} />}
            {issue.ImIn &&
                <CTAMines
                    actions={RespActions}
                    disabled1={statusValue > 1} />
            }
        </div >
    )
}

