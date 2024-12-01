import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { post } from '../../types/type';
import postsFaker from '../../datas/fakers/postsFaker';
import { AnnounceForm } from '../../components/announceComps/AnnounceForm';


export default function AnnounceEditPage() {
    const { id } = useParams()
    let found = (postsFaker.find(post => post.id == parseInt(id!)))
    const [selectedAnnounce] = useState<post>(found ? (found) : (postsFaker[0]))
    const navigate = useNavigate();
    const [newAnnounce, setNewAnnounce] = useState<post>(selectedAnnounce);
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