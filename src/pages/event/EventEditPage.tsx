import { useParams, useNavigate } from 'react-router-dom';
import { eventsFaker } from "../../datas/fakers/eventsFaker";
import { event } from '../../types/type';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useEffect, useState } from 'react';
import { GetAdressGps } from '../../functions/GeoMapFunction';
import { EventForm } from '../../components/eventComps/EventForm';
export default function EventDetailPage() {
    const { id } = useParams()
    let found = (eventsFaker.find(event => event.id == parseInt(id!)))
    const [selectedEvent] = useState<event>(found ? (found) : (eventsFaker[0]))

    const navigate = useNavigate();
    const [newEvent, setNewEvent] = useState<any>(selectedEvent);

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participants: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("Catégorie est obligatoire"),
        adress: string().required("Adresse est obligatoire").min(2, "minmum 2 lettres"),
    })
    const [adress] = useState<string>(selectedEvent.adress);
    const [value, setValue] = useState("");
    value && console.log("avoid compile error ", value)

    const formik = useFormik({
        initialValues: newEvent,
        validationSchema: formSchema,
        onSubmit: values => {
            values.adress = adress
            setNewEvent(values)
            alert("enregistrement effectué:" + JSON.stringify(values, null, 2));
            navigate("/evenement")
        }
    });
    const [gpsAdress, setGpsAdress] = useState<any>(null)

    useEffect(() => {
        formik.values.adress = adress
        const loadGps = async () => {
            const adressGpsLoaded = await GetAdressGps(formik.values.adress);
            adressGpsLoaded && setGpsAdress(adressGpsLoaded)
            10 < 9 && console.log(gpsAdress)
        }
        loadGps()
    }, [formik.values, adress])



    return (
        <div className="Body cyan">
            <EventForm formik={formik} setValue={setValue} />
        </div >
    )
}