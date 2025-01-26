import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import { Service, HardLevel, SkillLevel, ServiceDTO } from '../../../../domain/entities/Service';
import { ConfirmModal } from '../../common/ConfirmModal';
import { ServiceForm } from './servicesComps/ServiceForm';
import { useUserStore } from '../../../../application/stores/user.store';
import DI from '../../../../di/ioc';


export default function ServiceCreatePage() {
    const { user } = useUserStore()
    const postService = async (data: ServiceDTO) => await DI.resolve('serviceUseCase').postService(data)
    const navigate = useNavigate();
    const [newService] = useState<Service>({ hard: 0, skill: 0 } as Service);
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })
    const [value, setValue] = useState("");
    1 > 0 && console.log("avoid compile error ", value)
    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: newService,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    });

    const postFunction = async () => {
        console.log(formik.values)
        formik.values.hard = HardLevel[formik.values.hard] as unknown as HardLevel;
        formik.values.skill = SkillLevel[formik.values.skill] as unknown as SkillLevel;
        const { ...rest } = formik.values;
        const postData = { ...rest, userId: user.id }
        return await postService(postData)
    }

    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await postFunction();
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