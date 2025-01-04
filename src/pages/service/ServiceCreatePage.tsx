import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Service, HardLevel, SkillLevel } from '../../types/class';
import { ConfirmModal } from '../../components/UIX/ConfirmModal';
import { ServiceForm } from '../../components/servicesComps/ServiceForm';
import { getServiceById, patchService, postService } from '../../functions/API/servicesApi';
import { getEnumVal } from '../../functions/GetDataFunctions';
import UserContext from '../../contexts/user.context';

export default function ServiceCreatePage() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const [newService] = useState<Service>({
        hard: 0,
        skill: 0
    } as Service);
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
        }
    });

    const postFunction = async () => {
        console.log(formik.values)
        formik.values.hard = HardLevel[formik.values.hard] as unknown as HardLevel;
        formik.values.skill = SkillLevel[formik.values.skill] as unknown as SkillLevel;
        console.log(formik.values)
        const { ...rest } = formik.values;
        const postData = { ...rest, userId: user.userId }
        console.log(rest)
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