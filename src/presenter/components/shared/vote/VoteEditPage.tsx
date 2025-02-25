import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ConfirmModal } from '../../common/ConfirmModal';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { VoteForm } from './voteCards/VoteForm';
import { useUserStore } from '../../../../application/stores/user.store';
import { PoolDTO, SurveyDTO } from '../../../../infrastructure/DTOs/PoolSurveyDTO';
import { PoolSurveyView } from '../../../views/viewsEntities/poolSurveyViewEntity';
import { VoteTarget } from '../../../../domain/entities/Vote';

export default function VoteEditPage() {
    const { id, target } = useParams();
    const idS = id ? parseInt(id) : 0
    const user = useUserStore((state) => state.user);
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, error } = surveyIdViewModelFactory(idS);
    const poolIdViewModelFactory = DI.resolve('poolIdViewModel');
    const { pool, isLoading: isLoadingPool, error: errorPool } = poolIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<PoolSurveyView>({} as PoolSurveyView);
    const updateSurvey = async (id: number, data: SurveyDTO) => await DI.resolve('updateSurveyUseCase').execute(id, data)
    const updatePool = async (id: number, data: PoolDTO) => await DI.resolve('updatePoolUseCase').execute(id, data)


    const navigate = useNavigate();
    const formSchemaSurvey = object({
        typeS: string().required("Type est obligatoire"),
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })

    const formSchemaPool = object({
        typeS: string().required("Type est obligatoire"),
        userIdBenef: string().required("Le beneficiaire est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })

    useEffect(() => {
        if (survey && pool) target === "sondage" ? setInitialValues(survey) : setInitialValues(pool)
        initialValues.userId && initialValues.userId !== user.id && navigate(`/msg?msg=Vous n'avez pas le droit de modifier ${initialValues?.title}`)
    }, [isLoading, isLoadingPool]);

    const [open, setOpen] = useState(false);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as PoolSurveyView,
        validationSchema: target === "sondage" ? formSchemaSurvey : formSchemaPool,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    })

    const updateFunction = async () => {
        if (target === "sondage") {
            const updateData = new SurveyDTO(formik.values as SurveyDTO)
            return await updateSurvey(survey.id, updateData)
        }
        else if (target === "cagnotte") {
            const updateData = new PoolDTO(formik.values as PoolDTO)
            return await updatePool(pool.id, updateData)
        }
    }


    return (
        <div className="Body orange">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction();
                    if (ok) {
                        navigate(`/${target}/${ok.id}`);
                        setOpen(false)
                    }
                }}
                title={"Confimrer la modification"}
                element={
                    target === "sondage" ? JSON.stringify(new SurveyDTO(formik.values as SurveyDTO), null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ").replace(/}/g, "") : (JSON.stringify(new PoolDTO(formik.values as PoolDTO), null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            {isLoading || error || isLoadingPool || errorPool ?
                <Skeleton
                    className={'w-24'}
                    key={'S'} /> :
                <VoteForm
                    formik={formik}
                    type={target as VoteTarget} />}
        </div >
    )
}