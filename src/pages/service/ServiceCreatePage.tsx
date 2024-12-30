import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, } from 'react-router-dom';
import { useContext, useState } from 'react';
import DataContext from '../../contexts/data.context';
import { Service } from '../../types/class';
import { ConfirmModal } from '../../components/UIX/ConfirmModal';
import { ServiceForm } from '../../components/servicesComps/ServiceForm';
import UserContext from '../../contexts/user.context';


export default function ServiceCreatePage() {
    const { data, setDataInLocal } = useContext(DataContext)
    const { user } = useContext(UserContext)
    const { services } = data
    const navigate = useNavigate();
    const maxId = Math.max.apply(null, services.map((service: Service) => service.id));
    const [newService] = useState<Service>({
        id: maxId + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 0,
        user_id: user.user_id,
        user_id_resp: 0,
        type: "get",
        skill: 0,
        hard: 0,
    } as any);

    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        skill: string(),
        hard: string(),

    })
    const [value, setValue] = useState("");


    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: newService as Service,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            value && console.log("avoid compile error ", value)
        }
    });


    function saveService() {
        data.services.push(formik.values as Service)
        setDataInLocal({ ...data, services: [...data.services] })
    }


    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    saveService();
                    navigate(`/service?search=mines`);
                    setOpen(false)
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            <ServiceForm formik={formik} setValue={setValue} />
        </div >
    )
}