import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AnnounceForm } from '../../components/announceComps/AnnounceForm';
import { Post } from '../../types/class';
import DataContext from '../../contexts/data.context';
import UserContext from '../../contexts/user.context';
import { ConfirmModal } from '../../components/ConfirmModal';


export default function AnnounceCreatePage() {
    const { user } = useContext(UserContext);
    const { data, setDataInLocal } = useContext(DataContext);

    const navigate = useNavigate();
    const [newAnnounce] = useState<Post>({
        id: data.posts.length + 1,
        user_id: user.id,
        title: "",
        description: "",
        category: "",
        image: "",
        created_at: (new Date()),
        updated_at: (new Date()),
        share: ["email"],
    } as Post);


    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        share: array().required("Partager est obligatoire").min(1, "minmum 1 contact"),

    })
    const [value, setValue] = useState("");

    const formik = useFormik({
        initialValues: newAnnounce as Post,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            console.log(value)
        }
    });


    const index = data.posts.length
    function saveAnnounce() {
        data.posts[index] = formik.values as Post
        setDataInLocal({ ...data, posts: data.posts })
    }

    const [open, setOpen] = useState(false);


    return (
        <div className="Body orange">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    saveAnnounce();
                    navigate(`/announce`);
                    setOpen(false)
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            <AnnounceForm formik={formik} setValue={setValue} />
        </div >
    )
}