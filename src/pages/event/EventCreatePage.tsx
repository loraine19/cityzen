import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useState } from 'react';
import { EventForm } from '../../components/eventComps/EventForm';
import { EventP } from '../../types/class';
import { addressIn } from '../../functions/GetDataFunctions';
import { ConfirmModal } from '../../components/UIX/ConfirmModal';
import { postEvent } from '../../functions/API/eventsApi';
export default function EventCreatePage() {
    const [newEvent] = useState<EventP>({} as EventP);
    const navigate = useNavigate();

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participantsMin: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("Catégorie est obligatoire"),
        Address: object({
            city: string().required("Ville est obligatoire"),
            zipcode: string().required("Code postal est obligatoire"),
        })
    })
    const [value, setValue] = useState("");
    9 > 10 && console.log("avoid compile error ", value)

    const formik = useFormik({
        initialValues: newEvent as EventP,
        validationSchema: formSchema,
        onSubmit: values => {
            addressIn(formik, newEvent);
            formik.values = values
            setOpen(true)
        }
    });

    const postFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        formik.values.addressId = formik.values.Address.id
        const { Address, Participants, ...rest } = formik.values;
        const updateData = { ...rest }
        return await postEvent(updateData);
    }

    const [open, setOpen] = useState(false);
    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await postFunction()
                    if (ok) {
                        navigate("/evenement/" + ok.id);
                        setOpen(false);
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            {newEvent &&
                <EventForm formik={formik} setValue={setValue} />}
        </div >
    )
}