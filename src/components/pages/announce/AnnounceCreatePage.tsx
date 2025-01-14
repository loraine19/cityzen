import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnnounceForm } from '../../announceComps/AnnounceForm';
import { ConfirmModal } from '../../UIX/ConfirmModal';
import { PostService } from '../../../data/repositories/PostRepository';
import { Post } from '../../../domain/entities/Post';

export default function AnnounceCreatePage() {
    const [newPost,] = useState<Post>({} as Post);
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const { postPost } = new PostService()

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
        Array.isArray(formik.values.share) && formik.values.share.sort((a: string, b: string) => a.localeCompare(b))
        formik.values.share = formik.values.share.toString().toUpperCase().replace(',', '_')
        console.log('gppp', formik.values.share)
        const { ...rest } = formik.values;
        const updateData = { ...rest }
        console.log('gppp', updateData)
        return await postPost(updateData)
    }


    return (
        <div className="Body orange">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction()
                    if (ok) { navigate(`/annonce`); setOpen(false) }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            <AnnounceForm formik={formik} setValue={setValue} />
        </div >
    )
}