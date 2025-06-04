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
import { AlertValues } from '../../../../domain/entities/Error';
import { useEffect } from 'react';
import { ServiceStep } from '../../../../domain/entities/Service';


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
        const postData = { ...rest, userId: user.id, groupId: formik.values.groupId, }
        console.log("postData", postData)
        const data = await postService(postData);
        if (data) {
            setOpen(false);
            navigate(`/service/${data?.id}`)
        }
        else {
            setOpen(false);
            setTimeout(() => {
                throw new Error("Erreur lors de la création du service")
            }, 100);
            handleApiError({ message: "Erreur lors de la création du service" })
        }
    }





    const formik = useFormik({
        initialValues: {} as ServiceDTO,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values.status = 'STEP_0' as ServiceStep;
            const valuesAlert: AlertValues = {
                handleConfirm: async () => await postFunction(),
                confirmString: "Enregistrer ",
                title: "Confimrer la modification",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-2xl pt-12 p-5'>
                        <ServiceCard
                            service={new ServiceView({ ...values, image: values?.blob || values?.image } as ServiceView, {} as User)}
                            change={() => { }}
                            update={() => { }}
                        />
                    </div>
                )
            }
            console.log("valuesAlert", valuesAlert)

            setAlertValues({ ...valuesAlert });
            setOpen(true)
        }
    });

    useEffect(() => {
        console.log("formik.values", formik.values, "formik.errors", formik.errors)
    }, [formik.values])

    return (
        <ServiceForm formik={formik} />
    )
}