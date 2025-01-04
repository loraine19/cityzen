import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../components/UIX/NavBarTop';
import SubHeader from '../../components/UIX/SubHeader';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../components/UIX/CTAMines';
import UserContext from '../../contexts/user.context';
import { getLabel, serviceTypes, serviceCategories, toggleResp, GenereMyActions, serviceStatus, toggleValidResp, generateContact, GetPoints } from '../../functions/GetDataFunctions';
import DataContext from '../../contexts/data.context';
import { action, Service } from '../../types/class';
import ServiceDetailComp from '../../components/servicesComps/ServiceDetailComp';
import { deleteService, getServiceById, putServiceFinish } from '../../functions/API/servicesApi';

export default function ServiceDetailPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user.userId
    const [service, setService] = useState<Service>({} as Service);
    const [mine, setMine] = useState<boolean>(false);
    const [IResp, setIResp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [isNew, setIsNew] = useState<boolean>(status === 'nouveau' ? true : false);
    const [isResp, setIsResp] = useState<boolean>(status === 'en attente' ? true : false);
    const [isValidated, setIsValidated] = useState<boolean>(status === 'en cours' ? true : false);
    const [isFinish, setIsFinish] = useState<boolean>(status === 'terminé' ? true : false);
    const [points, setPoints] = useState<number[]>([0]);
    const updateStatus = (status: string) => {
        setIsNew(status === 'nouveau');
        setIsResp(status === 'en attente');
        setIsValidated(status === 'en cours');
        setIsFinish(status === 'terminé');
    };

    const fetch = async () => {
        setLoading(true);
        const idS = id ? parseInt(id) : 0;
        const service = await getServiceById(idS);
        console.log(service)
        setService(service);
        setCategory(getLabel(service.category.toString(), serviceCategories));
        setType(getLabel(service.type.toString(), serviceTypes));
        setMine(service.User.id === userId);
        setIResp(service.userIdResp === userId);
        updateStatus(getLabel(service.status, serviceStatus))
        setPoints(GetPoints(service));
        setLoading(false)
    };

    useEffect(() => { fetch() }, []);
    useEffect(() => { updateStatus(getLabel(service.status, serviceStatus)) }, [service]);
    const MyActionsStart: action[] = GenereMyActions(service, "service", deleteService, () => { });
    const MyActions: action[] = isNew && MyActionsStart || [...MyActionsStart,
    {
        icon: `Valider `,
        title: `Accepter la reponse de ${service.UserResp?.Profile.firstName}`,
        body: `${service.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
        function: () => { toggleValidResp(service.id, service.UserResp.id, setService); updateStatus(getLabel(service.status, serviceStatus)) }
    },
    {
        icon: `Refuser`,
        title: `"Refuser la reponse de ${service.UserResp?.Profile.firstName}`,
        body: `${service.title} - ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
        function: () => { toggleValidResp(service.id, 0, setService); updateStatus(getLabel(service.status, serviceStatus)) }
    }]

    const MyActionsValidate: action[] = [
        {
            icon: `terminer `,
            title: `Terminer le service`,
            body: `${service.title}<br> et crediter ${service.UserResp?.Profile.firstName} <br> de ${points} points`,
            function: async () => { await putServiceFinish(service.id); fetch() }
        },
        {
            icon: `litige`,
            title: `Signaler un litige`,
            body: `Avant d'ouvrir un litige pouvez contacter ${generateContact(service.UserResp)}`,
            function: () => { console.log('litige') }
        }
    ]


    const isNewAction: action[] = [
        {
            icon: isResp ? 'Annuler votre réponse' : isValidated ? "Besoin d'aide ?" : '',
            title: isResp ? 'Annuler votre réponse' : isValidated ? "Déclarer un litige ?" : '',
            body: isResp ? service.title : isValidated ? `Avant d'ouvrir un litige pouvez contacter ${generateContact(service.User)}` : '',

            function: () => {
                if (isResp) {
                    toggleResp(service.id, userId, setService);
                    updateStatus(getLabel(service.status, serviceStatus));
                }
                if (isValidated) {
                    console.log('litige');
                }
            }
        },
        {
            icon: isNew ? 'Répondre au service' : isValidated ? 'Service en cours' : '',
            title: 'Répondre au service',
            body: service.title,
            function: () => {
                toggleResp(service.id, userId, setService);
                updateStatus(getLabel(service.status, serviceStatus));
            }
        }
    ]


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
                {mine && !isFinish ?
                    <CTAMines
                        actions={isValidated ? MyActionsValidate : MyActions}
                        disabled1={isFinish}
                        disabled2={isFinish}
                    />
                    :
                    <CTAMines
                        disabled2={isValidated}
                        actions={isNewAction}
                    />
                }
                {
                    isFinish && <CTAMines
                        actions={[{ icon: `ce service est terminé`, title: ``, body: ``, function: () => { } }]}
                        disabled1={true}
                    />
                }
            </footer>
        </div>
    );
}

