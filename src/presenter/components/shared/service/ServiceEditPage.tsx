import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ServiceForm } from './serviceCards/ServiceForm';
import DI from '../../../../di/ioc';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';
import { Skeleton } from '../../common/Skeleton';
import { ServiceView } from '../../../views/viewsEntities/serviceViewEntity';
import { useUserStore } from '../../../../application/stores/user.store';
import { useAlertStore } from '../../../../application/stores/alert.store';
import ServiceCard from './serviceCards/ServiceCard';
import { User } from '../../../../domain/entities/User';

export default function ServiceEditPage() {
    const { id } = useParams()
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const idS = id ? parseInt(id) : 0;
    const user = useUserStore((state) => state.user);
    const { service, isLoading, error, refetch } = serviceIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<ServiceView>({} as ServiceView);
    const updateService = async (id: number, data: ServiceDTO) => await DI.resolve('updateServiceUseCase').execute(id, data)
    const { setAlertValues, setOpen } = useAlertStore(state => state)
    const navigate = useNavigate();
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })

    useEffect(() => {
        if (!isLoading && service && service.userId !== user.id) throw new Error("Vous n'avez pas le droit de modifier ce service");
        setInitialValues(service)
    }, [isLoading]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as any,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            setAlertValues({
                handleConfirm: async () => await updateFunction(),
                confirmString: "Enregistrer ",
                title: "Confimrer la modification",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-2xl pt-12 p-5'>
                        <ServiceCard
                            service={new ServiceView({ ...formik.values, image: formik.values?.blob || formik.values?.image }, {} as User)}
                            change={() => { }}
                            update={() => { }}
                        />
                    </div>
                )
            })
        }
    })

    const updateFunction = async () => {
        const updateData = new ServiceDTO(formik.values as ServiceDTO)
        const data = await updateService(service.id, updateData)
        if (data) { await refetch(); setOpen(false); navigate(`/service/${data?.id}`) }
    }


    return (
        <>
            {isLoading || error ?
                <Skeleton className={'w-24'} key={'S'} /> :
                <ServiceForm formik={formik} />}
        </ >
    )
}