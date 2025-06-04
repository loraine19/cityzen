import { useNavigate, useParams } from 'react-router-dom';
import { ServiceStep } from '../../../../domain/entities/Service';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import ServiceDetailComp from './serviceCards/ServiceDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { generateContact, GenereMyActions, getEnumVal, isLate } from '../../../views/viewsEntities/utilsService';
import { ContactDiv } from '../../common/ContactDiv';
import { User } from '../../../../domain/entities/User';

export default function ServiceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const idS = id ? parseInt(id) : 0;
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading, error, refetch } = serviceIdViewModelFactory(idS);

    const deleteService = async (id: number) => await DI.resolve('deleteServiceUseCase').execute(id);
    const respService = async (id: number) => await DI.resolve('respServiceUseCase').execute(id);
    const cancelRespService = async (id: number) => await DI.resolve('cancelRespServiceUseCase').execute(id);
    const validRespService = async (id: number) => await DI.resolve('validRespServiceUseCase').execute(id);
    const finishService = async (id: number) => await DI.resolve('finishServiceUseCase').execute(id);

    const isNew = service.statusS === ServiceStep.STEP_0 ? true : false;
    const isResp = service.statusS === ServiceStep.STEP_1 ? true : false;
    const isValidated = service.statusS === ServiceStep.STEP_2 ? true : false;
    const isFinish = service.statusS === ServiceStep.STEP_3 ? true : false;
    const inIssue = service.statusS === ServiceStep.STEP_4 ? true : false;
    const statusInt = getEnumVal(service.statusS, ServiceStep)
    const isLateValue = (isLate(service.createdAt, 15) && statusInt < 1)

    const { typeS, categoryS, mine, IResp } = service
    const generateActions = (): Action[] => {
        const myAction = GenereMyActions(service, "service", deleteService, isLateValue);
        let actions: Action[] = [];
        switch (true) {
            case (!IResp && !mine || isFinish):
                actions = [
                    {
                        iconImage: isNew ? 'person' : isFinish ? 'check' : 'block',
                        icon: isNew ? 'Répondre au service' : isFinish ? 'ce service est terminé' : service.statusS,
                        title: isNew ? 'Nous envoyerons un message à ' + service.User?.email + ' pour le premier contact' : '',
                        body: service?.title,
                        function: isNew ? async () => {
                            await respService(service.id)
                            await refetch()
                        } : () => { },
                    },
                ];
                break;
            case (mine && isNew):
                actions = [...myAction];
                if (isLateValue && !isResp) {
                    actions.push({
                        color: 'cyan',
                        icon: 'Relancer',
                        title: 'Relancer le service - ',
                        body: 'Relancer le service',
                        //// TODO: add function to relancer
                        function: () => { console.log('Relancer le service'); },
                    });
                }
                break;
            case (mine && isResp):
                actions = [
                    ...myAction,
                    {
                        color: 'green',
                        iconImage: 'check',
                        icon: 'Valider ',
                        title: `Accepter la reponse de ${service.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${service.UserResp?.email} - ${service.UserResp?.Profile.phone} , ${service?.points} points seront débités de votre compte, et crédités à ${service.UserResp?.Profile.firstName} après validation de la fin du service`,
                        function: async () => {
                            const data = await validRespService(service.id);
                            data && await refetch()
                        },
                    },
                    {
                        color: 'orange',
                        iconImage: 'close',
                        icon: 'Refuser ',
                        title: `Refuser la reponse de ${service.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
                        function: async () => {
                            await cancelRespService(service.id)
                            await refetch()
                        },
                    },
                ];
                break;
            case (mine && isValidated):
                actions = [
                    {
                        color: 'cyan',
                        iconImage: 'diversity_3',
                        icon: 'Besoin d\'aide ?',
                        title: 'Ouvrir une demande de conciliation',
                        body: <div>
                            Avant d'ouvrir une demande d'aide pouvez contacter
                            <ContactDiv
                                user={service.UserResp as User} />
                        </div>,
                        function: () => navigate(`/conciliation/create/${service.id}`),
                    },
                    {
                        color: 'green',
                        iconImage: 'check',
                        icon: 'terminer',
                        title: 'Terminer le service',
                        body: `${service?.title}<br> et crediter ${service.UserResp?.Profile.firstName} <br> de ${service?.points} points, Nous enverrons un message à ${service.UserResp?.email} `,
                        function: async () => { await finishService(service.id) }
                    },
                ];
                break;
            case (IResp && !isFinish && !inIssue):
                actions = [
                    {
                        color: isResp ? 'orange' : 'red',
                        iconImage: 'close',
                        icon: isResp ? 'Annuler votre réponse' : isValidated ? "Besoin d'aide ?" : '',
                        title: isResp ? 'Annuler votre réponse' : isValidated ? "Ouvrir une demande de conciliation?" : '',
                        body: isResp ? service?.title : isValidated ? `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(service.User)}` : '',
                        function: async () => {
                            if (isResp) { await cancelRespService(service.id); await refetch() };
                            if (isValidated) navigate(`/conciliation/create/${service.id}`);
                        },
                    },
                ];
                break;
            case (inIssue && IResp || inIssue && mine):
                actions = [
                    {
                        color: 'red',
                        iconImage: 'expand_content',
                        icon: 'Voir le litige',
                        title: 'Voir le litige',
                        body: 'Voir le litige',
                        function: () => navigate(`/conciliation/${service.id}`),
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
        <>
            <main>
                <div className="px-4 sectionHeader">
                    <SubHeader type={`${typeS ?? ''} de service ${categoryS ?? ''}`} closeBtn />
                </div>
                <section>
                    {isLoading || error || !service ?
                        <Skeleton />
                        :
                        <ServiceDetailComp
                            service={service}
                            mines={mine}
                        />}
                </section>
            </main>
            <footer>
                {!isLoading && !error && service &&
                    <CTAMines actions={ok} disabled1={disabled1} />}
            </footer>
        </>
    );
}
