import { useNavigate, useParams } from 'react-router-dom';
import { ServiceStep, ServiceUpdate } from '../../../../domain/entities/Service';
import { getEnumVal, isLate, GenereMyActions, toggleValidResp, generateContact, toggleResp } from '../../../../infrastructure/services/utilsService';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import ServiceDetailComp from './servicesComps/ServiceDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { useUserStore } from '../../../../application/stores/user.store';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';


export default function ServiceDetailPage() {
    const { id } = useParams();
    const { user } = useUserStore()
    const userId = user.id
    const navigate = useNavigate();

    const idS = id ? parseInt(id) : 0;
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading, error, refetch } = serviceIdViewModelFactory(idS);

    const deleteService = async (id: number) => await DI.resolve('serviceUseCase').deleteService(id);
    const putServiceFinish = async (id: number) => await DI.resolve('serviceUseCase').updateServiceStep(id, ServiceUpdate.FINISH);

    const isNew = service.statusS === ServiceStep.STEP_0 ? true : false;
    const isResp = service.statusS === ServiceStep.STEP_1 ? true : false;
    const isValidated = service.statusS === ServiceStep.STEP_2 ? true : false;
    const isFinish = service.statusS === ServiceStep.STEP_3 ? true : false;
    const inIssue = service.statusS === ServiceStep.STEP_4 ? true : false;
    const statusInt = getEnumVal(service.statusS, ServiceStep)



    let MyActions: Action[] = GenereMyActions(service, "service", deleteService, () => { })
    isLate(service.createdAt, 15) && MyActions.push({
        icon: 'Relancer',
        title: 'Relancer le service',
        body: 'Relancer le service',
        function: () => { console.log('Relancer le service') }
    })



    const MyActionsResp: Action[] = [
        ...MyActions,
        {
            icon: 'Valider',
            title: `Accepter la reponse de ${service.UserResp?.Profile.firstName}`,
            body: `${service?.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
            function: () => {
                toggleValidResp(service.id, service.UserResp.id, refetch);
            }
        },
        {
            icon: 'Refuser',
            title: `Refuser la reponse de ${service.UserResp?.Profile.firstName}`,
            body: `${service?.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
            function: () => {
                toggleValidResp(service.id, 0, refetch);
            }
        }
    ];

    const MyActionsValidate: Action[] = [
        {
            icon: 'Besoin d\'aide ?',
            title: 'Ouvrir une demande de conciliation',
            body: `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(service.UserResp)}`,
            function: () => { navigate(`/conciliation/create/${service.id}`);; }
        }, {
            icon: 'terminer',
            title: 'Terminer le service',
            body: `${service?.title}<br> et crediter ${service.UserResp?.Profile.firstName} <br> de ${service?.points} points`,
            function: async () => {
                await putServiceFinish(service.id);

            }
        }

    ];

    const respAction: Action[] = [
        {
            icon: isResp && 'Annuler votre réponse' || isValidated && "Besoin d'aide ?" || '',
            title: isResp && 'Annuler votre réponse' || isValidated && "Ouvrir une demande de conciliation?" || '',
            body: isResp && service?.title || isValidated && `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(service.User)}` || '',
            function: () => {
                if (isResp) {
                    toggleResp(service.id, userId, refetch);
                }
                if (isValidated) {
                    navigate(`/conciliation/create/${service.id}`);
                }
            }
        },

    ];

    const MyActionsLitige: Action[] = [
        {
            icon: 'Voir le litige',
            title: 'Voir le litige',
            body: 'Voir le litige',
            function: () => { navigate(`/conciliation/${service.id}`); }
        }
    ]



    const PublicAction = [{
        icon: isNew && 'Répondre au service' || isFinish && 'ce service est terminé' || 'Service en cours',
        title: isNew && 'Répondre au service' || '',
        body: service?.title,
        function: () => {
            if (isNew) {
                toggleResp(service.id, userId, refetch);
            }
        }
    }]

    const { typeS, categoryS, mine, IResp } = service

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`${typeS} de service ${categoryS}`} closeBtn />
            </header>
            <main>
                <div className="flex pt-6 pb-1 h-full">
                    {isLoading || error || !service ?
                        <Skeleton />
                        :
                        <ServiceDetailComp
                            service={service}
                            mines={mine}
                        />}
                </div>
            </main>
            <footer>
                {/* PUBLIC ACTION */}
                {((!IResp && !mine) || isFinish) &&
                    <CTAMines actions={PublicAction} disabled1={!isNew} />}

                {/* RESP ACTION */}
                {(mine && isNew) && <CTAMines actions={MyActions} />}
                {mine && isResp && <CTAMines actions={MyActionsResp} />}
                {mine && isValidated && <CTAMines actions={MyActionsValidate} />}

                {/* MINE ACTION */}
                {(IResp && statusInt < 2) &&
                    < CTAMines actions={respAction} disabled1={isResp && !IResp} />}

                {/* ISSUE ACTION */}
                {(inIssue) &&
                    <CTAMines actions={MyActionsLitige} />}

            </footer>
        </div>
    );
}
