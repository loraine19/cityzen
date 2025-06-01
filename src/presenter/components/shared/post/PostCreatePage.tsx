import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Share } from '../../../../domain/entities/Post';
import { ConfirmModal } from '../../common/ConfirmModal';
import { PostFormCard } from './PostComps/PostFormCard';
import { PostDTO } from '../../../../infrastructure/DTOs/PostDTO';
import { PostView } from '../../../views/viewsEntities/postViewEntities';
import DI from '../../../../di/ioc';
import { TextLength } from '../../../../domain/entities/utilsEntity';


export default function PostCreatePage() {
    const navigate = useNavigate();
    const postPost = async (data: PostDTO) => DI.resolve('postPostUseCase').execute(data);

    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres").max(TextLength.MAX_LONGTEXT, "le texte est trop long"),
        shareA: array().required("Partager est obligatoire").min(1, "minmum 1 contact"),
        groupId: string().required("Groupe est obligatoire"),
    })

    const [open, setOpen] = useState(false);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {} as PostView,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    });

    const updateFunction = async () => {
        const shareArray = formik.values.shareA as string[];
        const share = shareArray.sort().join('_').toUpperCase() as unknown as Share;
        const updateData = new PostDTO({ ...formik.values as PostDTO, share });
        return await postPost(updateData)
    }


    return (
        <>
            <ConfirmModal
                open={open}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction()
                    if (ok) { navigate(`/annonce`); setOpen(false) }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values as PostDTO, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <PostFormCard
                formik={formik} />
        </>
    )
}