import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../../../contexts/data.context';
import { Service } from '../../../types/class';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { ServiceForm } from '../../../components/servicesComps/ServiceForm';


export default function ServiceEditPage() {

    const { id } = useParams()
    const { data, setDataInLocal } = useContext(DataContext)
    const { services } = data

    const found = (services.find((Service: Service) => Service.id == parseInt(id!)))
    useEffect(() => { !found && navigate(`/annonce ${id}`) }, [id])
    const [selectedService] = useState<Service>(found ? (found) : (services[0]))
    const navigate = useNavigate();
    const [newService] = useState<Service>(selectedService);
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        skill: string(),
        hard: string()

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

    const index = data.services.findIndex((element: any) => element.id === newService.id);
    function saveService() {
        data.services[index] = formik.values as Service
        setDataInLocal({ ...data, services: data.services })
    }


    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    saveService();
                    navigate(`/service?serach=mines`);
                    setOpen(false)
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            <ServiceForm formik={formik} setValue={setValue} />
        </div >
    )
}