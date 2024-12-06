import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AnnounceForm } from '../../components/announceComps/AnnounceForm';
import DataContext from '../../contexts/data.context';
import { Post } from '../../types/class';
import { ConfirmModal } from '../../components/ConfirmModal';


export default function AnnounceEditPage() {

    const { id } = useParams()
    const { data, setDataInLocal } = useContext(DataContext)
    const { posts } = data

    const found = (posts.find((post: Post) => post.id == parseInt(id!)))
    useEffect(() => { !found && navigate(`/annonce ${id}`) }, [id])
    const [selectedAnnounce] = useState<Post>(found ? (found) : (posts[0]))
    const navigate = useNavigate();
    const [newAnnounce] = useState<Post>(selectedAnnounce);
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        share: array().required("Partager est obligatoire").min(1, "minmum 1 contact"),

    })
    const [value, setValue] = useState("");


    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: newAnnounce as Post,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            value && console.log("avoid compile error ", value)
        }
    });

    const index = data.posts.findIndex((element: any) => element.id === newAnnounce.id);
    function saveAnnounce() {
        data.posts[index] = formik.values as Post
        setDataInLocal({ ...data, posts: data.posts })
    }


    return (
        <div className="Body orange">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    saveAnnounce();
                    navigate(`/annonce`);
                    setOpen(false)
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            <AnnounceForm formik={formik} setValue={setValue} />
        </div >
    )
}