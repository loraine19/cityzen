import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Service, HardLevel, SkillLevel } from '../../../../domain/entities/Service';
import { ServiceService } from '../../../../domain/repositories-ports/ServiceRepository';
import { ConfirmModal } from '../../common/ConfirmModal';
import { ServiceForm } from './servicesComps/ServiceForm';


export default function ServiceEditPage() {
    const [service, setService] = useState<Service>({} as Service);
    const { id } = useParams()
    const { getServiceById, patchService } = new ServiceService()

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const fetched = await getServiceById(idS);
        setService(fetched);
        console.log(fetched)
        formik.values.category = fetched.category;
        formik.values.title = fetched.title;
        formik.values.description = fetched.description;
        formik.values.image = fetched.image;
        formik.values.category = fetched.category;
        formik.values.createdAt = fetched.createdAt;
        formik.values.hard = ((HardLevel[fetched.hard]) as unknown as HardLevel);
        formik.values.skill = ((SkillLevel[fetched.skill]) as unknown as SkillLevel)
        formik.values.type = fetched.type;
        setValue(fetched.category.toString().toLowerCase())
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
        return await patchService(service.id, updateData)
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