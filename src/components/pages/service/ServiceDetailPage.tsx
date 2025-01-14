import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../UIX/NavBarTop';
import SubHeader from '../../UIX/SubHeader';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../UIX/CTAMines';
import UserContext from '../../../contexts/user.context';
import { getLabel, serviceTypes, serviceCategories, toggleResp, GenereMyActions, toggleValidResp, generateContact, GetPoints, isLate, getEnumVal } from '../../../utils/GetDataFunctions';
import { Service, ServiceStep } from '../../../domain/entities/Service';
import ServiceDetailComp from '../../servicesComps/ServiceDetailCard';
import { ServiceService } from '../../../data/repositories/ServiceRepository';
import { action } from '../../../domain/entities/frontEntities';

export default function ServiceDetailPage() {
    const { id } = useParams();
    const { userProfile } = useContext(UserContext);
    const userId = userProfile.userId;
    const [service, setService] = useState<Service>({} as Service);
    const [mine, setMine] = useState<boolean>(false);
    const [IResp, setIResp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('')
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isResp, setIsResp] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [inIssue, setInIssue] = useState<boolean>(false);
    const [points, setPoints] = useState<number[]>([0]);
    const [IsLate, setIsLate] = useState<boolean>(false);
    const { deleteService, getServiceById, putServiceFinish } = new ServiceService();
    console.log(IsLate)

    const updateStatus = (service: Service) => {
        setIsNew(getEnumVal(service.status, ServiceStep) === ServiceStep.STEP_0 && !service.userIdResp);
        setIsResp(getEnumVal(service.status, ServiceStep) === ServiceStep.STEP_1);
        setIsValidated(getEnumVal(service.status, ServiceStep) === ServiceStep.STEP_2);
        setIsFinish(getEnumVal(service.status, ServiceStep) === ServiceStep.STEP_3);
        setInIssue(getEnumVal(service.status, ServiceStep) === ServiceStep.STEP_4);
        console.log(inIssue,)
        setIResp(service.userIdResp === userId);
    };

    const fetch = async () => {
        setLoading(true);
        const idS = id ? parseInt(id) : 0;
        const service = await getServiceById(idS);
        setService(service);
        setCategory(getLabel(service.category.toString(), serviceCategories));
        setType(getLabel(service.type.toString(), serviceTypes));
        setMine(service.User.id === userId);
        setIResp(service.userIdResp === userId);
        setIsLate(isLate(service.createdAt, 15));
        updateStatus(service);
        setPoints(GetPoints(service));
        setLoading(false);
    }

    useEffect(() => { fetch() }, [id]);

    let MyActions: action[] = GenereMyActions(service, "service", deleteService, () => { })
    isLate(service.createdAt, 15) && MyActions.push({
        icon: 'Relancer',
        title: 'Relancer le service',
        body: 'Relancer le service',
        function: () => { console.log('Relancer le service') }
    })



    const MyActionsResp: action[] = [
        ...MyActions,
        {
            icon: 'Valider',
            title: `Accepter la reponse de ${service.UserResp?.Profile.firstName}`,
            body: `${service.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
            function: () => {
                toggleValidResp(service.id, service.UserResp.id, setService);
                updateStatus(service);
            }
        },
        {
            icon: 'Refuser',
            title: `Refuser la reponse de ${service.UserResp?.Profile.firstName}`,
            body: `${service.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
            function: () => {
                toggleValidResp(service.id, 0, setService);
                updateStatus(service);
            }
        }
    ];

    const MyActionsValidate: action[] = [
        {
            icon: 'Besoin d\'aide ?',
            title: 'Ouvrir une demande de conciliation',
            body: `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(service.UserResp)}`,
            function: () => { navigate(`/conciliation/create/${service.id}`);; }
        }, {
            icon: 'terminer',
            title: 'Terminer le service',
            body: `${service.title}<br> et crediter ${service.UserResp?.Profile.firstName} <br> de ${points} points`,
            function: async () => {
                await putServiceFinish(service.id);
                fetch();
            }
        }

    ];

    const respAction: action[] = [
        {
            icon: isResp && 'Annuler votre réponse' || isValidated && "Besoin d'aide ?" || '',
            title: isResp && 'Annuler votre réponse' || isValidated && "Ouvrir une demande de conciliation?" || '',
            body: isResp && service.title || isValidated && `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(service.User)}` || '',
            function: () => {
                if (isResp) {
                    toggleResp(service.id, userId, setService);
                    updateStatus(service);
                }
                if (isValidated) {
                    navigate(`/conciliation/create/${service.id}`);
                }
            }
        },

    ];

    const MyActionsLitige: action[] = [
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
        body: service.title,
        function: () => {
            if (isNew) {
                toggleResp(service.id, userId, setService);
                updateStatus(service);
            }
        }
    }]

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`${type} de service ${category}`} closeBtn />
            </header>
            <main>
                <div className="flex pt-6 pb-1 h-full">
                    <ServiceDetailComp
                        service={service}
                        mines={mine}
                        change={() => { }}
                    />
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
                {(IResp && (!inIssue || !isFinish)) &&
                    < CTAMines actions={respAction} disabled1={isResp && !IResp} />}

                {/* ISSUE ACTION */}
                {(inIssue) &&
                    <CTAMines actions={MyActionsLitige} />}

            </footer>
        </div>
    );
}
