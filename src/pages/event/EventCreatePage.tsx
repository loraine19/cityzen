import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GetAdressGps } from '../../functions/GeoMapFunction';
import { EventForm } from '../../components/eventComps/EventForm';
import UserContext from '../../contexts/user.context';


export default function EventCreatePage() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [newEvent, setNewEvent] = useState<any>({
        id: 0,
        title: "",
        start: "",
        end: "",
        participants: 0,
        description: "",
        image: "",
        adress: user.adress,
        category: "",
        users: []
    });




    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participants: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("La catégorie est obligatoire"),
        adress: string().required("Adresse est obligatoire").min(2, "minmum 2 lettres"),
    })
    const [adress] = useState<string>("-");
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

    const initGpsAdress = ""
    const [gpsAdress, setGpsAdress] = useState<any>(initGpsAdress)

    useEffect(() => {
        formik.values.adress = adress
        if (formik.values.adress != initGpsAdress) {
            const loadGps = async () => {
                const adressGpsLoaded = await GetAdressGps(formik.values.adress);
                adressGpsLoaded && setGpsAdress(adressGpsLoaded)
                console.log("loadGps", gpsAdress)
            }
            loadGps()
        }

    }, [formik.values, adress])



    return (

        <div className="Body cyan">
            <EventForm formik={formik} setValue={setValue} />
        </div >
    )
}