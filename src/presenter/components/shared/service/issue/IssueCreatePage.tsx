import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import Skeleton from 'react-loading-skeleton';
import { Issue } from '../../../../../domain/entities/Issue';
import { Service, ServiceType } from '../../../../../domain/entities/Service';
import { User } from '../../../../../domain/entities/User';
import { ModalValues } from '../../../../../domain/entities/frontEntities';
import { IssueService } from '../../../../../domain/repositories-ports/IssueRepository';
import { ServiceService } from '../../../../../domain/repositories-ports/ServiceRepository';
import { ConfirmModal } from '../../../common/ConfirmModal';
import NavBarTop from '../../../common/NavBarTop';
import SubHeader from '../../../common/SubHeader';
import { IssueForm } from '../servicesComps/IssueCard';
import { UserApi } from '../../../../../infrastructure/providers/http/userApi';
import { useUserStore } from '../../../../../application/stores/userStore';



export default function IssueEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUserStore()
    const userId = user.id
    const [service, setService] = useState<Service>({} as Service);
    const [issue, setIssue] = useState<Issue>({} as Issue);
    const [loading, setLoading] = useState<boolean>(true);
    const [modos, setModos] = useState<User[]>([]);
    const [open, setOpen] = useState(false);


    const redirectModal: ModalValues = {
        confirm: async () => { navigate(`/conciliation/${id}`); setOpen(false) },
        title: "Confirmer la redirection",
        element: "ce litige existe deja, Vous allez être redirigé vers la page de conciliation"
    }
    const redirectServiceModal: ModalValues = {
        confirm: async () => { navigate(`/service/${id}`); setOpen(false) },
        title: "Confirmer la redirection",
        element: "Il n'y a aucun modérateur disponible pour le moment, Vous allez être redirigé vers la page de service"
    }
    const [ModalValues, setModalValues] = useState<ModalValues>(redirectModal);
    const { getUsersModos } = new UserApi()
    const { getServiceById } = new ServiceService()
    const { getIssueById, postIssue } = new IssueService()

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const modos = await getUsersModos()
        console.log('modos', modos)
        const service = await getServiceById(idS)
        const issue = await getIssueById(idS);
        if (issue) { setModalValues(redirectModal); setOpen(true) }
        if (!modos) { setModalValues(redirectServiceModal); setOpen(true) };
        (service.User.id === userId && !issue)
        setService(service);
        setModos(modos)
        service && modos && setLoading(false)
    }

    useEffect(() => { fetch() }, []);

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
        formik.values.description = formik.values.description
        formik.values.date = new Date(formik.values.date).toISOString()
        formik.values.serviceId = typeof service.id === 'string' ? parseInt(service.id) : service.id
        const { ...rest } = formik.values;
        const postData = { ...rest }
        return await postIssue(postData)
    }

    const confirmPost: { confirm: () => Promise<void>, title: string, element: string } = {
        confirm: async () => {
            const ok = await postFunction()
            console.log('ok', ok)
            if (ok) { navigate(`/conciliation/${ok.serviceId}`); setOpen(false) }
        }
        , title: "Confirmer la demande de conciliation",
        element: (JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")
    }



    return (
        <form onSubmit={formik.handleSubmit} className=" Body gray gap-3 pb-2">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={ModalValues.confirm}
                title={ModalValues.title}
                element={ModalValues.element} />

            <header className="px-4">
                <NavBarTop />
                <SubHeader type={"Conciliation"} place={` sur ${service?.type === ServiceType.GET ? "une demande" : "une offre"} de service  ${userId === service?.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`} closeBtn />
            </header>
            {loading ?
                <Skeleton className="w-respLarge !rounded-2xl !h-[calc(100vh-16rem)] shadow m-auto" /> :
                <IssueForm issue={issue} loading={loading} modos={modos} service={service} formik={formik} />}
        </form>


    )
}

