import { useNavigate, useParams } from 'react-router-dom';
import { ServiceType } from '../../../../../domain/entities/Service'
import CTAMines from '../../../common/CTAMines';
import NavBarTop from '../../../common/NavBarTop';
import SubHeader from '../../../common/SubHeader';
import { IssueForm } from './IssueDetailCard';
import { Action } from '../../../../../domain/entities/frontEntities';
import { useUserStore } from '../../../../../application/stores/user.store';
import { Skeleton } from '../../../common/Skeleton';
import DI from '../../../../../di/ioc';
import { generateContact } from '../../../../views/viewsEntities/utilsService';
import { useEffect, useState } from 'react';
import { Input, Select, Typography, Option } from '@material-tailwind/react';
import { IssueStep } from '../../../../../domain/entities/Issue';
import { User } from '../../../../../domain/entities/User';
import { ProfileDiv } from '../../../common/ProfilDiv';

export default function IssueDetailPage() {
    const { id } = useParams()
    const { user } = useUserStore()
    const userId = user.id
    const navigate = useNavigate();
    const idS = id ? parseInt(id) : 0;
    const issueIdViewModelFactory = DI.resolve('issueIdViewModel');
    const { issue, isLoading, error } = issueIdViewModelFactory(idS);
    const deleteIssue = async (id: number) => await DI.resolve('deleteIssueUseCase').execute(id);
    const respIssue = async (id: number, step: IssueStep) => await DI.resolve('respIssueUseCase').execute(id, step);
    const finishIssue = async (id: number, pourcent: number) => await DI.resolve('finishIssueUseCase').execute(id, pourcent);
    const getModos = async () => await DI.resolve('getUsersModosUseCase').execute()
    const [modos, setModos] = useState<User[]>([])
    const [modoOnId, setModoOnId] = useState<number>(0)

    console.log('issue', issue)
    useEffect(() => {
        if (modos.length === 0) {
            const fetchModos = async () => {
                const modos = await getModos()
                setModos([...modos])
            }; fetchModos()
        }
    }, [issue]);


    const MyActions: Action[] = [{
        icon: issue.stepValue < 2 ? 'Modifier ' : '',
        title: 'Modifier la conciliation',
        body: 'Aller à la page de modification de la conciliation',
        function: () => { navigate('/conciliation/edit/' + issue.serviceId) }
    },
    {
        icon: issue.stepValue <= 3 ? 'Supprimer ' : issue.statusS,
        title: 'Supprimer la conciliation',
        body: 'service.title as string',
        function: async () => { const ok = await deleteIssue(issue.serviceId); ok && navigate('/service?search=myservices') }
    }]

    const ChoiceModoSelect: JSX.Element = issue &&
        <div className=' pb-20 z-50 overflow-hidden pt-2'>
            <Select
                labelProps={{ className: 'z-50  pl-8' }}
                label={modoOnId === 0 ? '' : 'Modérateur choisi'}
                variant='static'
                className={`!relative top-0 z-50  !rounded-full !border-none !flex !justify-start !items-start !flex-col gap-4 ${modoOnId === 0 ? 'bg-red-100' : '!bg-blue-gray-50'} `}>
                {modos.map((modo: User) =>
                    <Option
                        onClick={() => setModoOnId(modo.id)}
                        key={modo.id}
                        className={` rounded-full   `}
                        value={modo.id && modo?.id?.toString() || '0'} >
                        <div className='px-4 mb-1'>
                            <ProfileDiv
                                size="xs"
                                profile={modo.Profile} />
                        </div>
                    </Option >)
                }
            </Select >
        </div >

    const RespActions = [
        {
            icon: issue.status === IssueStep.STEP_1 ? 'Choisir mon modérateur' : issue.statusS,
            title: 'Choisir mon modérateur',
            body: ChoiceModoSelect,
            function: () => { navigate('/conciliation/edit/' + issue.serviceId) }
        }]

    const [pourcent, setPourcent] = useState({ IModo: 100, other: 0 })
    const userImodo = issue.ImModo ? issue?.Service?.User : issue?.Service?.UserResp
    const otherModo = issue.ImModo ? issue?.Service?.UserResp : issue?.Service?.User

    const pourcentInput =
        <div className="flex flex-col gap-4 p-4">
            <Typography>
                {`${userImodo?.Profile?.firstName} recevera ce pourcentage sur la moitié des points du service et ${otherModo?.Profile?.firstName} recevera l'autre moitié`}
            </Typography>
            <div className='flex gap-8'>
                <Input
                    onChange={(e) => setPourcent({ ...pourcent, IModo: parseInt(e.target.value), other: 100 - parseInt(e.target.value) })}
                    value={pourcent.IModo}
                    type="number"
                    label={`Pourcentage de ${userImodo?.Profile?.firstName}`}
                    name="pourcent"
                    variant="standard"
                    containerProps={{ className: "!flex items-end justify-end h-8 rounded-full max-w-max after:content-['%']" }}>
                </Input>
                <Input
                    disabled
                    value={pourcent.other}
                    type="number"
                    label={`Pourcentage de ${otherModo?.Profile?.firstName}`}
                    name="pourcent"
                    variant="outlined"
                    containerProps={{ className: "bg-gray-200 !px-3 !rounded-full !flex items-end justify-end h-8 max-w-max after:content-['%']" }}>
                </Input>
            </div>
        </div>

    const ModoActions = [
        {
            icon: issue.ImModo && issue.status === IssueStep.STEP_1 || issue.ImModoOn && issue.status === IssueStep.STEP_2 ? `Accepter la conciliation ${issue.ImModo ? issue.Service.User.Profile.firstName : issue.Service.UserResp.Profile.firstName}` : '',
            title: 'Vous avez été choisi comme modérateur ',
            body: `Vous pouvez contacter l'utilisateur qui vous à choisi : ${generateContact(issue.ImModo ? issue.User : issue.UserOn)}`,
            function: async () => {
                const update = issue.ImModo ? IssueStep.STEP_1 : IssueStep.STEP_2
                await respIssue(issue.serviceId, update)
            }
        },
        {
            icon: (issue.ImModo && issue.statusS === IssueStep.STEP_3) || (issue.ImModoOn && issue.statusS === IssueStep.STEP_4) ? 'Cloturer le litige' : issue.statusS,
            title: `Attribution de la moitié des points la conciliation`,
            body: pourcentInput,
            function: async () => {
                const ok = await finishIssue(issue.serviceId, pourcent.IModo);
                ok && console.log(ok);

            }
        }]


    return (
        <>
            <div className="Body gray">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader
                        type={"Conciliation"}
                        place={` sur une ${ServiceType[issue?.Service?.type as unknown as keyof typeof ServiceType]} de service  ${userId === issue?.Service?.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`}
                        closeBtn />
                </header>
                {isLoading || !issue || error ?
                    <Skeleton className="w-respLarge !rounded-2xl !h-[calc(100vh-16rem)] shadow m-auto" /> :
                    <IssueForm
                        modos={modos}
                        issue={issue} />
                }
                {issue?.mine &&
                    <CTAMines
                        key={'mine'}
                        disabled1={issue?.stepValue >= 2}
                        disabled2={issue?.stepValue >= 3}
                        actions={MyActions} />}
                {issue?.onMe &&
                    <CTAMines
                        key={'onMe'}
                        disabled1={issue?.stepValue >= 2}
                        disabled2={issue?.stepValue >= 3}
                        actions={RespActions} />}
                {(issue?.ImModo || issue?.ImModoOn) &&
                    <CTAMines
                        key={'ImModo'}
                        disabled1={(issue?.ImModo && issue?.statusS !== IssueStep.STEP_0) || (issue?.ImModoOn && issue?.statusS !== IssueStep.STEP_1)}
                        disabled2={(issue?.ImModo && issue?.statusS !== IssueStep.STEP_3) || (issue?.ImModoOn && issue?.statusS !== IssueStep.STEP_4)}
                        actions={ModoActions} />
                }
            </div >
        </>
    )
}

