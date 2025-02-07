import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Service, HardLevel, SkillLevel, ServiceDTO } from '../../../../domain/entities/Service';
import { ConfirmModal } from '../../common/ConfirmModal';
import { ServiceForm } from './servicesComps/ServiceForm';
import DI from '../../../../di/ioc';


export default function ServiceEditPage() {
    const { id } = useParams()
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const idS = id ? parseInt(id) : 0;
    const { service, loadingService, refetch } = serviceIdViewModelFactory(idS);
    console.log(loadingService, refetch)
    const updateService = async (id: number, data: ServiceDTO) => await DI.resolve('updateServiceUseCase').execute(id, data)

    const fetch = async () => {

        formik.values.category = service.category;
        formik.values.title = service.title;
        formik.values.description = service.description;
        formik.values.image = service.image;
        formik.values.category = service.category;
        formik.values.createdAt = service.createdAt;
        formik.values.hard = ((HardLevel[service.hard]) as unknown as HardLevel);
        formik.values.skill = ((SkillLevel[service.skill]) as unknown as SkillLevel)
        formik.values.type = service.type;
        setValue(service.category.toString().toLowerCase())
        //navigate(`/evenement/${id}`
    };

    useEffect(() => {
        fetch()
    }, []);
    const navigate = useNavigate();
    const [newService] = useState<Service>(service);
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: newService,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            value && console.log("avoid compile error ", value)
        }
    });

    const updateFunction = async () => {
        formik.values.hard = HardLevel[formik.values.hard] as unknown as HardLevel;
        formik.values.skill = SkillLevel[formik.values.skill] as unknown as SkillLevel;
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
            <ServiceForm formik={formik} setValue={setValue} />
        </div >
    )
}