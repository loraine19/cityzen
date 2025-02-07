import { useNavigate, useParams } from 'react-router-dom';
import { ServiceStep, ServiceView, } from '../../../../domain/entities/Service';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import ServiceDetailComp from './servicesComps/ServiceDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { generateContact, GenereMyActions, getEnumVal, isLate } from '../../../views/viewsEntities/utilsService';

export default function ServiceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const idS = id ? parseInt(id) : 0;
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading, error, refetch } = serviceIdViewModelFactory(idS);
    const serviceView = new ServiceView(service);

    const deleteService = async (id: number) => await DI.resolve('deleteServiceUseCase').execute(id);
    const respService = async (id: number) => await DI.resolve('respServiceUseCase').execute(id);
    const cancelRespService = async (id: number) => await DI.resolve('cancelRespServiceUseCase').execute(id);
    const validRespService = async (id: number) => await DI.resolve('validRespServiceUseCase').execute(id);
    const finishService = async (id: number) => await DI.resolve('finishServiceUseCase').execute(id);

    const isNew = serviceView.statusS === ServiceStep.STEP_0 ? true : false;
    const isResp = serviceView.statusS === ServiceStep.STEP_1 ? true : false;
    const isValidated = serviceView.statusS === ServiceStep.STEP_2 ? true : false;
    const isFinish = serviceView.statusS === ServiceStep.STEP_3 ? true : false;
    const inIssue = serviceView.statusS === ServiceStep.STEP_4 ? true : false;
    const statusInt = getEnumVal(serviceView.statusS, ServiceStep)
    const isLateValue = (isLate(serviceView.createdAt, 15) && statusInt < 1)

    const { typeS, categoryS, mine, IResp } = service
    const generateActions = (): Action[] => {
        const myAction = GenereMyActions(service, "service", deleteService, () => { }, isLateValue);
        let actions: Action[] = [];
        switch (true) {
            case (!IResp && !mine || isFinish):
                actions = [
                    {
                        icon: isNew ? 'Répondre au service' : isFinish ? 'ce service est terminé' : 'Service en cours',
                        title: isNew ? 'Nous envoyerons un message à ' + serviceView.User?.email + ' pour le premier contact' : '',
                        body: service?.title,
                        function: isNew ? async () => { await respService(serviceView.id); await refetch() } : () => { },
                    },
                ];
                break;
            case (mine && isNew):
                actions = [...myAction];
                if (isLateValue && !isResp) {
                    actions.push({
                        icon: 'Relancer',
                        title: 'Relancer le service - ',
                        body: 'Relancer le service',
                        function: () => { console.log('Relancer le service'); },
                    });
                }
                break;
            case (mine && isResp):
                actions = [
                    ...myAction,
                    {
                        icon: 'Valider ',
                        title: `Accepter la reponse de ${serviceView.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${serviceView.UserResp?.email} - ${serviceView.UserResp?.Profile.phone} , ${service?.points} points seront débités de votre compte, et crédités à ${serviceView.UserResp?.Profile.firstName} après validation de la fin du service`,
                        function: async () => { await validRespService(serviceView.id); await refetch() },
                    },
                    {
                        icon: 'Refuser ',
                        title: `Refuser la reponse de ${serviceView.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${serviceView.UserResp?.email} - ${serviceView.UserResp?.Profile.phone}`,
                        function: async () => { await cancelRespService(serviceView.id); await refetch() },
                    },
                ];
                break;
            case (mine && isValidated):
                actions = [
                    {
                        icon: 'Besoin d\'aide ?',
                        title: 'Ouvrir une demande de conciliation',
                        body: `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(serviceView.UserResp)}`,
                        function: () => navigate(`/conciliation/create/${serviceView.id}`),
                    },
                    {
                        icon: 'terminer',
                        title: 'Terminer le service',
                        body: `${service?.title}<br> et crediter ${serviceView.UserResp?.Profile.firstName} <br> de ${service?.points} points, Nous enverrons un message à ${serviceView.UserResp?.email} `,
                        function: async () => { await finishService(serviceView.id) }
                    },
                ];
                break;
            case (IResp && !isFinish && !inIssue):
                actions = [
                    {
                        icon: isResp ? 'Annuler votre réponse' : isValidated ? "Besoin d'aide ?" : '',
                        title: isResp ? 'Annuler votre réponse' : isValidated ? "Ouvrir une demande de conciliation?" : '',
                        body: isResp ? service?.title : isValidated ? `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(serviceView.User)}` : '',
                        function: async () => {
                            if (isResp) { await cancelRespService(serviceView.id); await refetch() };
                            if (isValidated) navigate(`/conciliation/create/${serviceView.id}`);
                        },
                    },
                ];
                break;
            case (inIssue && IResp || inIssue && mine):
                actions = [
                    {
                        icon: 'Voir le litige',
                        title: 'Voir le litige',
                        body: 'Voir le litige',
                        function: () => navigate(`/conciliation/${serviceView.id}`),
                    },
                ];
                break;
            default:
                break;
        }

        return isLoading ? [] as Action[] : actions;
    }
    const ok = generateActions();



    const disabled1 = (!mine && !IResp && statusInt >= 1) || isFinish



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
                            service={serviceView}
                            mines={mine}
                        />}
                </div>
            </main>
            <footer>
                {!isLoading && !error && service && <CTAMines actions={ok} disabled1={disabled1} />}
            </footer>
        </div>
    );
}
