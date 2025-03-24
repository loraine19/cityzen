import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmModal } from '../../common/ConfirmModal';
import DI from '../../../../di/ioc';
import { VoteForm } from './voteCards/VoteForm';
import { PoolDTO, SurveyDTO } from '../../../../infrastructure/DTOs/PoolSurveyDTO';
import { PoolSurveyView } from '../../../views/viewsEntities/poolSurveyViewEntity';
import { VoteTarget } from '../../../../domain/entities/Vote';

export default function VoteCreatePage() {
    const [initialValues] = useState<PoolSurveyView>({} as PoolSurveyView);
    const postSurvey = async (data: SurveyDTO) => await DI.resolve('postSurveyUseCase').execute(data)
    const postPool = async (data: PoolDTO) => await DI.resolve('postPoolUseCase').execute(data)
    const [type, setType] = useState<VoteTarget>(VoteTarget.SURVEY)

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


    const [open, setOpen] = useState(false);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as PoolSurveyView,
        validationSchema: type === VoteTarget.SURVEY ? formSchemaSurvey : formSchemaPool,
        onSubmit: values => {
            console.log(values)
            formik.values = values
            setOpen(true)
        }
    })

    const updateFunction = async () => {
        if (type === VoteTarget.SURVEY) {
            const updateData = new SurveyDTO(formik.values as SurveyDTO)
            return await postSurvey(updateData)
        }
        else if (type === VoteTarget.POOL) {
            const updateData = new PoolDTO(formik.values as PoolDTO)
            return await postPool(updateData)
        }
    }


    return (
        <div className="Body orange">
            <ConfirmModal
                open={open}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction();
                    if (ok) {
                        navigate(`/${type === VoteTarget.SURVEY ? 'sondage' : 'cagnotte'}/${ok.id}`);
                        setOpen(false)
                    }
                }}
                title={`Confimrer la création ${type === VoteTarget.SURVEY ? 'du sondage' : 'de la cagnotte'}`}
                element={Object.entries(type === VoteTarget.SURVEY ? new SurveyDTO(formik.values as SurveyDTO) : new PoolDTO(formik.values as PoolDTO)).map(([key, value]) => (value && `<b>${key} </b>: ${typeof value === 'object' ? value.name : value}<br>`)).join('')} />


            <VoteForm
                formik={formik}
                type={type}
                setType={(type: VoteTarget) => setType(type)}
            />
        </div >
    )
}