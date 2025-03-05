import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConfirmModal } from '../../common/ConfirmModal';
import { PostFormCard } from './announceComps/PostFormCard';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { PostDTO } from '../../../../infrastructure/DTOs/PostDTO';
import { Share } from '../../../../domain/entities/Post';
import { PostView } from '../../../views/viewsEntities/postViewEntities';

export default function AnnounceEditPage() {
    const { id } = useParams()
    const navigate = useNavigate();
    const updatePost = (id: number, data: PostDTO) => DI.resolve('updatePostUseCase').execute(id, data);
    const idS = id ? parseInt(id) : 0;
    const postIdViewModelFactory = DI.resolve('postIdViewModel');
    const { post, error, isLoading } = postIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<PostView>({} as PostView);
    const [open, setOpen] = useState(false);

    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        shareA: array().required("Partager est obligatoire").min(1, "minmum 1 contact"),
    })


    useEffect(() => {
        !isLoading && post && !post.mine && navigate("/msg?msg=Vous n'avez pas le droit de modifier cette annonce")
        setInitialValues(post)
    }, [isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as PostView,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    })

    const updateFunction = async () => {
        const shareArray = formik.values.shareA as string[];
        const share = shareArray.sort().join('_').toUpperCase() as unknown as Share;
        const updateData = new PostDTO({ ...formik.values as PostDTO, share });
        return await updatePost(post.id, updateData);
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
                element={(JSON.stringify(new PostDTO(formik.values as PostDTO), null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            {isLoading || error ?
                <Skeleton /> :
                <PostFormCard
                    formik={formik} />}
        </div >
    )
}