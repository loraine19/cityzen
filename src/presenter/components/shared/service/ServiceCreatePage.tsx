import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, } from 'react-router-dom';
import { ServiceForm } from './serviceCards/ServiceForm';
import { useUserStore } from '../../../../application/stores/user.store';
import DI from '../../../../di/ioc';
import { ServiceView } from '../../../views/viewsEntities/serviceViewEntity';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { User } from '../../../../domain/entities/User';
import ServiceCard from './serviceCards/ServiceCard';


export default function ServiceCreatePage() {
    const { user } = useUserStore()
    const postService = async (data: ServiceDTO) => await DI.resolve('postServiceUseCase').execute(data)
    const navigate = useNavigate();
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        groupId: string().required("Groupe est obligatoire"),
    })

    const { setOpen, setAlertValues, handleApiError } = useAlertStore(state => state)

    const postFunction = async () => {
        const { ...rest } = new ServiceDTO(formik.values as ServiceDTO);
        const postData = { ...rest, userId: user.id }
        const data = await postService(postData);
        if (data.error) handleApiError(data?.error)
        else {
            setOpen(false);
            navigate(`/service/${data?.id}`)
        }
    }

    const formik = useFormik({
        initialValues: {} as any,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            setAlertValues({
                handleConfirm: async () => await postFunction(),
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
    });



    return (
        <div className="Body cyan">

            <ServiceForm formik={formik} />
        </div >
    )
}