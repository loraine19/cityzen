import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnnounceForm } from '../../components/announceComps/AnnounceForm'
import { Post } from '../../types/class';
import { ConfirmModal } from '../../components/UIX/ConfirmModal';
import { getPostById, patchPost } from '../../functions/API/postsApi'
import parse from 'html-react-parser';


export default function AnnounceEditPage() {
    const { id } = useParams()
    const [newPost, setNewPost] = useState<Post>({} as Post);
    const navigate = useNavigate();
    const [value, setValue] = useState("");

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const fetched = await getPostById(idS);
        setNewPost(fetched);
        formik.values.category = fetched.category;
        formik.values.title = fetched.title;
        formik.values.description = fetched.description;
        formik.values.share = fetched.share.toString().split('_');
        formik.values.image = fetched.image;
        formik.values.category = fetched.category;
        formik.values.createdAt = fetched.createdAt;
        setValue(fetched.category.toString().toLowerCase())
        //navigate(`/evenement/${id}`
    };

    useEffect(() => {
        fetch()
    }, []);


    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        share: array().required("Partager est obligatoire").min(1, "minmum 1 contact"),
    })



    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: newPost as any,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            value && console.log("avoid compile error ", value)
        }
    });

    const updateFunction = async () => {
        formik.values.share = formik.values.share.sort((a: string, b: string) => a.localeCompare(b)).toString().toUpperCase().replace(',', '_')
        const { ...rest } = formik.values;
        const updateData = { ...rest }
        return await patchPost(newPost.id, updateData)
    }


    return (
        <div className="Body orange">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction()
                    if (ok) {
                        navigate(`/annonce`);
                        setOpen(false)
                    }
                }}
                title={"Confimrer la modification"}
                element={parse((JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")) as unknown as string} />
            <AnnounceForm formik={formik} setValue={setValue} />
        </div >
    )
}