import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DI from '../../../../di/ioc';
import { VoteForm } from './voteCards/VoteForm';
import { PoolDTO, SurveyDTO } from '../../../../infrastructure/DTOs/PoolSurveyDTO';
import { PoolSurveyView } from '../../../views/viewsEntities/poolSurveyViewEntity';
import { VoteTarget } from '../../../../domain/entities/Vote';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { SurveyCard } from './voteCards/SurveyCard';
import { User } from '../../../../domain/entities/User';
import { PoolCard } from './voteCards/PoolCard';

export default function VoteCreatePage() {
    const [initialValues] = useState<PoolSurveyView>({} as PoolSurveyView);
    const postSurvey = async (data: SurveyDTO) => await DI.resolve('postSurveyUseCase').execute(data)
    const postPool = async (data: PoolDTO) => await DI.resolve('postPoolUseCase').execute(data)
    const [type, setType] = useState<VoteTarget>(VoteTarget.SURVEY)
    const { setOpen, setAlertValues, handleApiError } = useAlertStore()

    const navigate = useNavigate();
    const formSchemaSurvey = object({
        typeS: string().required("Type est obligatoire"),
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        groupId: string().required("Groupe est obligatoire"),
    })

    const formSchemaPool = object({
        typeS: string().required("Type est obligatoire"),
        userIdBenef: string().required("Le beneficiaire est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        groupId: string().required("Groupe est obligatoire"),
    })


    const createFunction = async () => {
        if (type === VoteTarget.SURVEY) {
            const updateData = new SurveyDTO(formik.values as SurveyDTO)
            const data = await postSurvey(updateData)
            data.error ? handleApiError(data?.error) :
                navigate(`/sondage/${data?.id}`)
        }
        else if (type === VoteTarget.POOL) {
            const updateData = new PoolDTO(formik.values as PoolDTO)
            const data = await postPool(updateData)
            data.error ? handleApiError(data?.error) :
                navigate(`/cagnotte/${data?.id}`)
        }
    }

    //// TODO add handle error in all form

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as any,
        validationSchema: type === VoteTarget.SURVEY ? formSchemaSurvey : formSchemaPool,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            setAlertValues({
                handleConfirm: async () => await createFunction(),
                confirmString: "Enregistrer ",
                title: "Confimrer la création",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-2xl pt-12 p-5'>
                        {type === VoteTarget.SURVEY ?
                            <SurveyCard
                                survey={new PoolSurveyView({ ...formik.values, Votes: [], image: formik.values?.blob || formik.values?.image }, {} as User, 0)}
                                change={() => { }}
                                update={() => { }}
                            /> :
                            <PoolCard
                                pool={new PoolSurveyView({ ...formik.values, Votes: [] }, {} as User, 0)}
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
            <VoteForm
                formik={formik}
                type={type}
                setType={(type: VoteTarget) => setType(type)}
            />
        </div >
    )
}