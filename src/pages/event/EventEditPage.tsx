import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useContext, useEffect, useState } from 'react';
import { EventForm } from '../../components/eventComps/EventForm';
import DataContext from '../../contexts/data.context';
import { EventP } from '../../types/class';
import { FindAdressData, getDays, getUsers } from '../../functions/GetDataFunctions';
import { ConfirmModal } from '../../components/ConfirmModal';
export default function EventDetailPage() {
    const { id } = useParams()
    const { data, setDataInLocal } = useContext(DataContext)
    const { events, participants, profiles } = data
    const [eventList] = useState<EventP[]>(getDays(getUsers(events, participants as [], profiles as [], "event_id")))
    const found = (eventList.find((EventP: EventP) => EventP.id == parseInt(id!)))

    const navigate = useNavigate();
    useEffect(() => { !found && navigate(`/evenement/${id}`) }, [id])

    type EventPA = EventP & { address?: any }
    const [newEvent] = useState<EventP>(found ? (found) : (eventList[0]));

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participants_min: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("Catégorie est obligatoire"),
        address: string().required("Adresse est obligatoire").min(2, "minmum 2 lettres"),
    })
    const [value, setValue] = useState("");
    value && console.log("avoid compile error ", value)

    const formik = useFormik({
        initialValues: newEvent as EventPA,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    });

    const index = data.events.findIndex((element: any) => element.id === newEvent.id);
    async function addressIn() {
        const addressFind = await FindAdressData(formik.values.address, data.address, data, formik)
        addressFind.id !== newEvent.address_id && (formik.values.address_id = addressFind.id);
        formik.values.address = addressFind?.address
        data.events[index] = (delete formik.values.address) && formik.values as EventP
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