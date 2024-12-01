import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { post } from '../../types/type';
import { AnnounceForm } from '../../components/announceComps/AnnounceForm';


export default function AnnounceCreatePage() {
    const navigate = useNavigate();
    const [newAnnounce, setNewAnnounce] = useState<post>({
        id: 0,
        user_id: 0,
        title: "",
        description: "",
        category: "",
        image: "",
        created_at: (new Date()).toISOString(),
        share: [],
        users: []
    });


    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        share: array().required("Partager est obligatoire").min(1, "minmum 1 contact"),

    })
    const [value, setValue] = useState("");
    value && console.log("avoid compile error ", value)

    const formik = useFormik({
        initialValues: newAnnounce,
        validationSchema: formSchema,
        onSubmit: values => {
            setNewAnnounce(values)
            alert("Announce enregistrée : " + JSON.stringify(values, null, 2));
            navigate("/annonce")
        }
    });



    return (
        <div className="Body orange">
            <AnnounceForm formik={formik} setValue={setValue} />
        </div >
    )
}