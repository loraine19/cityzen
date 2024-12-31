import parse from 'html-react-parser';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useEffect, useState } from 'react';
import { EventForm } from '../../components/eventComps/EventForm';
import { EventP } from '../../types/class';
import { addressIn } from '../../functions/GetDataFunctions';
import { ConfirmModal } from '../../components/UIX/ConfirmModal';
import { getEventById, patchEvent } from '../../functions/API/eventsApi';
export default function EventDetailPage() {
    const { id } = useParams()
    const [newEvent, setNewEvent] = useState<EventP>({} as EventP);
    const navigate = useNavigate();

    const fetchEvent = async () => {
        const idS = id ? parseInt(id) : 0;
        const fetchedEvent = await getEventById(idS);
        setNewEvent(fetchedEvent);
        formik.values.category = fetchedEvent.category;
        formik.values.Address = fetchedEvent.Address;
        formik.values.start = fetchedEvent.start;
        formik.values.title = fetchedEvent.title;
        formik.values.description = fetchedEvent.description;
        formik.values.participantsMin = fetchedEvent.participantsMin as number;
        formik.values.end = fetchedEvent.end;
        formik.values.image = fetchedEvent.image;
        formik.values.Participants = fetchedEvent.Participants;
        //navigate(`/evenement/${id}`
    };

    useEffect(() => {
        fetchEvent()
    }, []);

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participantsMin: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("Catégorie est obligatoire"),
        Address: object().required("Adresse est obligatoire")
    })
    const [value, setValue] = useState("");
    value && 9 > 10 && console.log("avoid compile error ", value)


    const formik = useFormik({
        initialValues: newEvent as EventP,
        validationSchema: formSchema,
        onSubmit: values => {
            addressIn(formik, newEvent);
            formik.values = values
            console.log("values", values)
            setOpen(true)
        }
    });

    const updateFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        formik.values.addressId = formik.values.Address.id
        //formik.values.category = getValue(formik.values.category, eventCategories)
        const { Address, Participants, ...rest } = formik.values;
        const updateData = { ...rest }
        return await patchEvent(newEvent.id, updateData)
    }

    const [open, setOpen] = useState(false);
    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction()
                    if (ok) {
                        navigate("/evenement/" + newEvent.id);
                        setOpen(false);
                    }
                }}
                title={"Confimrer la modification"}
                element={parse((JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")) as unknown as string} />
            {newEvent && newEvent.id &&
                <EventForm formik={formik} setValue={setValue} />}
        </div >
    )
}