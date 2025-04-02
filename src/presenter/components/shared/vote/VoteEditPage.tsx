import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { VoteForm } from './voteCards/VoteForm';
import { useUserStore } from '../../../../application/stores/user.store';
import { PoolDTO, SurveyDTO } from '../../../../infrastructure/DTOs/PoolSurveyDTO';
import { PoolSurveyView } from '../../../views/viewsEntities/poolSurveyViewEntity';
import { VoteTarget } from '../../../../domain/entities/Vote';
import { Typography } from '@material-tailwind/react';
import { User } from '../../../../domain/entities/User';
import { PoolCard } from './voteCards/PoolCard';
import { SurveyCard } from './voteCards/SurveyCard';
import { useAlertStore } from '../../../../application/stores/alert.store';

export default function VoteEditPage() {
    const { id, target } = useParams();
    const idS = id ? parseInt(id) : 0
    const user = useUserStore((state) => state.user);
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, error, refetch } = surveyIdViewModelFactory(idS);
    const poolIdViewModelFactory = DI.resolve('poolIdViewModel');
    const { pool, isLoading: isLoadingPool, error: errorPool, refetch: refetchPool } = poolIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<PoolSurveyView>({} as PoolSurveyView);
    const updateSurvey = async (id: number, data: SurveyDTO) => await DI.resolve('updateSurveyUseCase').execute(id, data)
    const updatePool = async (id: number, data: PoolDTO) => await DI.resolve('updatePoolUseCase').execute(id, data)
    const [type, setType] = useState<VoteTarget>(target as VoteTarget)
    const { setOpen, setAlertValues, handleApiError } = useAlertStore()

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
        if (initialValues.userId && initialValues.userId !== user.id) handleApiError({ message: "Vous n'avez pas le droit de modifier ce vote" }, () => navigate('/vote'))
    }, [isLoading, isLoadingPool])

    const updateFunction = async () => {
        if (target === "sondage") {
            const updateData = new SurveyDTO(formik.values as SurveyDTO)
            const data = await updateSurvey(survey.id, updateData)
            if (data.error) handleApiError(data?.error)
            else { refetch(); setOpen(false); navigate(`/sondage/${data?.id}`) }
        }
        else if (target === "cagnotte") {
            const updateData = new PoolDTO(formik.values as PoolDTO)
            const data = await updatePool(pool.id, updateData)
            if (data.error) handleApiError(data?.error)
            else { refetchPool(); setOpen(false); navigate(`/sondage/${data?.id}`) }
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as any,
        validationSchema: target === "sondage" ? formSchemaSurvey : formSchemaPool,
        onSubmit: values => {
            formik.values.UserBenef = values?.UserBenef
            formik.values = values
            setOpen(true)
            setAlertValues({
                handleConfirm: async () => await updateFunction(),
                confirmString: "Enregistrer ",
                title: "Confimrer la modification",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-2xl p-5'>
                        <Typography variant='h6'>
                            {type === VoteTarget.SURVEY ? 'Sondage' : 'Cagnotte'}
                        </Typography>
                        {type === VoteTarget.SURVEY ?
                            <SurveyCard
                                survey={new PoolSurveyView({ ...formik.values, image: formik.values?.blob || formik.values?.image }, {} as User, 0)}
                                change={() => { }}
                                update={() => { }}
                            /> :
                            <PoolCard
                                pool={new PoolSurveyView({ ...formik.values }, {} as User, 0)}
                                change={() => { }}
                                update={() => { }}
                            />}
                    </div>
                )
            })
        }
    })




    return (
        <div className="Body orange">
            {!isLoading && !error && !isLoadingPool && !errorPool ?
                <VoteForm
                    formik={formik}
                    type={type as VoteTarget}
                    setType={setType} /> :
                <Skeleton
                    className={'w-24'}
                    key={'S'} />
            }
        </div >
    )
}