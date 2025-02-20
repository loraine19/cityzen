import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ConfirmModal } from '../../common/ConfirmModal';
import { ServiceForm } from './serviceCards/ServiceForm';
import DI from '../../../../di/ioc';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';
import { Skeleton } from '../../common/Skeleton';

export default function ServiceEditPage() {
    const { id } = useParams()
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const idS = id ? parseInt(id) : 0;
    const { service, isLoading, error } = serviceIdViewModelFactory(idS);
    const updateService = async (id: number, data: ServiceDTO) => await DI.resolve('updateServiceUseCase').execute(id, data)

    const navigate = useNavigate();
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })
    useEffect(() => {
        formik.values = service
    }, [service])

    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: service as ServiceDTO,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    });

    const updateFunction = async () => {
        const { ...rest } = formik.values
        const updateData = { ...rest }
        return await updateService(service.id, updateData)
    }


    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction();
                    if (ok) {
                        navigate(`/service/${ok.id}`);
                        setOpen(false)
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            {isLoading || error ?
                <Skeleton className={'w-24'} key={'S'} /> :
                <ServiceForm formik={formik} />}
        </div >
    )
}