import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useEffect, useState } from 'react';
import { EventForm } from './eventComps/EventForm';
import Skeleton from 'react-loading-skeleton';
import { EventView } from '../../../../domain/entities/Event';
import { addressIn } from '../../../../infrastructure/services/utilsService';
import { ConfirmModal } from '../../common/ConfirmModal';
import { EventApi } from '../../../../infrastructure/providers/http/eventApi';
import DI from '../../../../di/ioc';

export default function EventDetailPage() {
    const { id } = useParams()
    const idS = id ? parseInt(id) : 0;

    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, loadingEvent } = eventIdViewModelFactory(idS);
    const [eventLoad, setEventLoad] = useState<EventView>({} as EventView);
    useEffect(() => { console.log(event, loadingEvent); !loadingEvent && setEventLoad(event) }, [loadingEvent]);
    const [newEvent] = useState<EventView>({} as EventView);
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { patchEvent } = new EventApi()



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

    const formik = useFormik({
        initialValues: newEvent as EventView,
        validationSchema: formSchema,
        onSubmit: values => {
            addressIn(formik, newEvent);
            formik.values = values
            setOpen(true)
        }
    })

    formik.values.category = eventLoad.category;
    formik.values.Address = eventLoad.Address;
    formik.values.start = eventLoad.start;
    formik.values.title = eventLoad.title;
    formik.values.description = eventLoad.description;
    formik.values.participantsMin = eventLoad.participantsMin as number;
    formik.values.end = eventLoad.end;
    formik.values.image = eventLoad.image;
    formik.values.Participants = eventLoad.Participants

    const updateFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        formik.values.addressId = formik.values.Address.id
        const { Address, Participants, ...rest } = formik.values;
        const updateData = { ...rest }
        return await patchEvent(newEvent.id, updateData)
    }


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
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            {loadingEvent ? <Skeleton count={1} height="100%" /> :
                <EventForm formik={formik} />}
        </div >
    )
}