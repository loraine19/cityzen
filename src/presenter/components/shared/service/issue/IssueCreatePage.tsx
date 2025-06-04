import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Issue } from '../../../../../domain/entities/Issue';
import { ServiceType } from '../../../../../domain/entities/Service';
import { ModalValues } from '../../../../../domain/entities/frontEntities';
import { ConfirmModal } from '../../../common/ConfirmModal';
import SubHeader from '../../../common/SubHeader';
import { IssueForm } from './IssueDetailCard';
import { useUserStore } from '../../../../../application/stores/user.store';
import { Skeleton } from '../../../common/Skeleton';
import { Button } from '@material-tailwind/react';
import { IssueView } from '../../../../views/viewsEntities/issueViewEntity';
import DI from '../../../../../di/ioc';
import { IssueDTO } from '../../../../../infrastructure/DTOs/IssueDTO';
import { User } from '../../../../../domain/entities/User';
import { Icon } from '../../../common/IconComp';



export default function IssueEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUserStore()
    const userId = user.id
    const [issue, setIssue] = useState<Issue>({} as Issue);
    const [open, setOpen] = useState(false);
    const idS = id ? parseInt(id) : 0;
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading } = serviceIdViewModelFactory(idS);
    const postIssue = async (data: IssueDTO) => await DI.resolve('postIssueUseCase').execute(data)
    const getModos = async () => await DI.resolve('getUsersModosUseCase').execute()
    const [modos, setModos] = useState<User[]>([])

    useEffect(() => {
        if (modos.length === 0) {
            const fetchModos = async () => {
                const modos = await getModos()
                setModos([...modos])
                /// TODO mettre à jour modi par groupId de service 
            }; fetchModos()
        }
    }, [issue]);

    const redirectModal: ModalValues = {
        confirm: async () => { navigate(`/conciliation/${id}`); setOpen(false) },
        title: "Confirmer la redirection",
        element: "ce litige existe deja, Vous allez être redirigé vers la page de conciliation"
    }
    // const redirectServiceModal: ModalValues = {
    //     confirm: async () => { navigate(`/service/${id}`); setOpen(false) },
    //     title: "Confirmer la redirection",
    //     element: "Il n'y a aucun modérateur disponible pour le moment, Vous allez être redirigé vers la page de service"
    // }
    const [ModalValues, setModalValues] = useState<ModalValues>(redirectModal);




    const formSchema = object({
        description: string().required("Description est obligatoire"),
        date: string().required("Date est obligatoire"),
        userIdModo: string()
    })

    const formik = useFormik({
        initialValues: issue as Issue,
        validationSchema: formSchema,
        onSubmit: values => {
            setModalValues(confirmPost)
            setOpen(true)
            setIssue(values)
            formik.values = values
        }
    })

    const postFunction = async () => {
        formik.values.date = new Date(formik.values.date).toISOString()
        formik.values.serviceId = typeof service.id === 'string' ? parseInt(service.id) : service.id
        const data = new IssueDTO({ ...formik.values })
        return await postIssue(data)
    }

    const confirmPost: { confirm: () => Promise<void>, title: string, element: string } = {
        confirm: async () => {
            const ok = await postFunction()
            if (ok) {
                navigate(`/conciliation/${ok.serviceId}`);
                setOpen(false)
            }
        }
        , title: "Confirmer la demande de conciliation",
        element: (JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")
    }



    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col'>
            <ConfirmModal
                open={open}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={ModalValues.confirm}
                title={ModalValues.title}
                element={ModalValues.element} />

            <main>
                <div className="sectionHeader">
                    <SubHeader type={"Conciliation"} place={` sur ${service?.type === ServiceType.GET ? "une demande" : "une offre"} de service  ${userId === service?.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`} closeBtn />
                </div>

                {isLoading ?
                    <Skeleton className="w-respLarge !rounded-2xl !h-[calc(100vh-16rem)] shadow m-auto" /> :
                    <IssueForm
                        modos={modos}
                        issue={issue as IssueView}
                        service={service}
                        formik={formik} />}
            </main>
            <footer className="CTA">
                <Button
                    type="submit"
                    className="!lngBtn w-respLarge rounded-full" >
                    <Icon
                        size='xl'
                        color="white"
                        icon="add" />
                    Enregistrer la demande d'aide
                </Button>
            </footer>
        </form>


    )
}

