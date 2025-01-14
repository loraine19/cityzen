import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import UserContext from '../../../../contexts/user.context';
import { Issue, IssueStep } from '../../../../domain/entities/Issue';
import { Service, ServiceType } from '../../../../domain/entities/Service';
import { User } from '../../../../domain/entities/User';
import { IssueService } from '../../../../domain/repositories/IssueRepository';
import { ServiceService } from '../../../../domain/repositories/ServiceRepository';
import { UserService } from '../../../../domain/repositories/UserRepository';
import CTAMines from '../../../common/CTAMines';
import NavBarTop from '../../../common/NavBarTop';
import SubHeader from '../../../common/SubHeader';
import { IssueForm } from '../servicesComps/IssueCard';
import { Action } from '../../../../domain/entities/frontEntities';


export default function IssueDetailPage() {
    const { id } = useParams()
    const { userProfile } = useContext(UserContext)
    const [service, setService] = useState<Service>({} as Service)
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [issue, setIssue] = useState<Issue>({} as Issue);
    const [modos, setModos] = useState<User[]>([])
    const [statusValue, setStatusValue] = useState<number>(0);
    const { getIssueById, deleteIssue } = new IssueService()
    const { getUserModos } = new UserService()
    const { getServiceById } = new ServiceService()

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const issue = await getIssueById(idS);
        const modos = await getUserModos()
        const service = await getServiceById(idS)
        setIssue(issue);
        setService(issue.Service)
        issue && setLoading(false)
        setModos(modos)
        service && modos && setLoading(false)
        setStatusValue(parseInt(IssueStep[issue.status as number]));
    }

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
        function: async () => { let ok = await deleteIssue(issue.serviceId); ok && navigate('/service?search=myservices') }
    }]
    const RespActions = [
        {
            icon: statusValue < 2 && 'Valider mon modérateur' || statusValue === 2 && 'En cours de validation' || 'Finis',
            title: 'Valider mon modérateur',
            body: '--',
            function: () => { }
        }]

    useEffect(() => { fetch() }, []);


    return (
        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={"Conciliation"} place={` sur ${issue.Service?.type === ServiceType.GET ? "une demande" : "une offre"} de service  ${userProfile.userId === service.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`} closeBtn />
            </header>
            {loading ?
                <Skeleton className="w-respLarge !rounded-2xl !h-[calc(100vh-16rem)] shadow m-auto" /> :
                <IssueForm issue={issue} loading={loading} modos={modos} />
            }
            {userProfile.userId === issue.userId ?
                <CTAMines actions={MyActions} disabled1={statusValue < 1} /> :
                <CTAMines actions={RespActions} disabled1={statusValue > 1} />
            }
        </div >
    )
}

