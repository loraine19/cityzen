import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../components/UIX/NavBarTop';
import SubHeader from '../../components/UIX/SubHeader';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../components/UIX/CTAMines';
import UserContext from '../../contexts/user.context';
import { getLabel, serviceTypes, serviceCategories, toggleResp, GenereMyActions, serviceStatus, toggleValidResp, generateContact, GetPoints } from '../../functions/GetDataFunctions';
import { action, Service, ServiceStep } from '../../types/class';
import ServiceDetailComp from '../../components/servicesComps/ServiceDetailComp';
import { deleteService, getServiceById, putServiceFinish } from '../../functions/API/servicesApi';

export default function ServiceDetailPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user.userId;
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
    const [statusValue, setStatusValue] = useState<number>(0);
    const [points, setPoints] = useState<number[]>([0]);

    const updateStatus = (status: string) => {
        setIsNew(status === 'nouveau');
        setIsResp(status === 'en attente');
        setIsValidated(status === 'en cours');
        setIsFinish(status === 'terminé');
        setInIssue(status === 'litige');
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
        const statusLabel = getLabel(service.status, serviceStatus);
        updateStatus(statusLabel);
        setPoints(GetPoints(service));
        setStatusValue(parseInt(ServiceStep[service.status]));
        setLoading(false);
    }

    useEffect(() => { fetch() }, [id]);

    useEffect(() => {
        const statusLabel = getLabel(service.status, serviceStatus);
        updateStatus(statusLabel);
    }, [service]);

    const MyActions: action[] = GenereMyActions(service, "service", deleteService, () => { });

    const MyActionsResp: action[] = [
        ...MyActions,
        {
            icon: 'Valider',
            title: `Accepter la reponse de ${service.UserResp?.Profile.firstName}`,
            body: `${service.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
            function: () => {
                toggleValidResp(service.id, service.UserResp.id, setService);
                updateStatus(getLabel(service.status, serviceStatus));
            }
        },
        {
            icon: 'Refuser',
            title: `Refuser la reponse de ${service.UserResp?.Profile.firstName}`,
            body: `${service.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
            function: () => {
                toggleValidResp(service.id, 0, setService);
                updateStatus(getLabel(service.status, serviceStatus));
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
            icon: isResp ? 'Annuler votre réponse' : isValidated ? "Besoin d'aide ?" : '',
            title: isResp ? 'Annuler votre réponse' : isValidated ? "Ouvrir une demande de conciliation?" : '',
            body: isResp ? service.title : isValidated ? `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(service.User)}` : '',
            function: () => {
                if (isResp) {
                    toggleResp(service.id, userId, setService);
                    updateStatus(getLabel(service.status, serviceStatus));
                }
                if (isValidated) {
                    navigate(`/conciliation/create/${service.id}`);
                }
            }
        },
        {
            icon: isNew ? 'Répondre au service' : '',
            title: 'Répondre au service',
            body: service.title,
            function: () => {
                toggleResp(service.id, userId, setService);
                updateStatus(getLabel(service.status, serviceStatus));
            }
        }
    ];

    const MyActionsLitige: action[] = [
        {
            icon: 'Voir le litige',
            title: 'Voir le litige',
            body: 'Voir le litige',
            function: () => { navigate(`/conciliation/${service.id}`); }
        }
    ]

    const FinishAction = [{ icon: 'ce service est terminé', title: '', body: '', function: () => { } }]

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
                {mine && isNew && <CTAMines actions={MyActions} />}
                {mine && (isResp || isValidated) && <CTAMines actions={isValidated ? MyActionsValidate : MyActionsResp} />}
                {!mine && statusValue < 3 && <CTAMines actions={respAction} />}
                {isFinish && <CTAMines actions={FinishAction} disabled1={true} />}
                {(mine || IResp) && inIssue && <CTAMines actions={MyActionsLitige} />}
            </footer>
        </div>
    );
}
