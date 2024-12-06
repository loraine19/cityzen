import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { EventForm } from '../../components/eventComps/EventForm';
import UserContext from '../../contexts/user.context';
import { EventP, Profile } from '../../types/class';
import { ConfirmModal } from '../../components/ConfirmModal';
import { FindAdressData } from '../../functions/GetDataFunctions';
import DataContext from '../../contexts/data.context';


export default function EventCreatePage() {
    const { user } = useContext(UserContext);
    const { data, setDataInLocal } = useContext(DataContext);

    const navigate = useNavigate();
    type EventPA = EventP & { address?: any }
    const [newEvent] = useState<EventPA>({
        id: data.events.length + 1,
        user_id: user.id,
        title: "",
        start: "",
        end: "",
        users: [],
        category: "",
        participants_min: 1
    } as unknown as EventPA)

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participants_min: number().required("Participants est obligatoire").min(0, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("La catégorie est obligatoire"),
        address: string().required("Adresse est obligatoire").min(2, "minmum 2 lettres"),
    })
    const [value, setValue] = useState("");


    const formik = useFormik({
        initialValues: newEvent as EventPA,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            console.log(value)
        }
    });


    const index = data.events.length
    async function addressIn() {
        const addressFind = await FindAdressData(formik.values.address, data.address, data, formik)
        addressFind.id !== newEvent.address_id && (formik.values.address_id = addressFind.id);
        formik.values.address = addressFind?.address
        data.events[index] = formik.values as EventP
        data.events[index].users.push(user as Profile)
        setDataInLocal({ ...data, events: data.events })
    }

    const [open, setOpen] = useState(false);
    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    addressIn();
                    navigate(`/evenement`);
                    setOpen(false)
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            <EventForm formik={formik} setValue={setValue} />
        </div >
    )
}