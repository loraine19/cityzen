import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmModal } from '../../common/ConfirmModal';
import DI from '../../../../di/ioc';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';
import { VoteForm } from './voteCards/VoteForm';
import { PoolDTO, SurveyDTO } from '../../../../infrastructure/DTOs/PoolSurveyDTO';
import { PoolSurveyView } from '../../../views/viewsEntities/poolSurveyViewEntity';

export default function VoteCreatePage() {
    const [initialValues] = useState<PoolSurveyView>({} as PoolSurveyView);
    const postSurvey = async (data: SurveyDTO) => await DI.resolve('postSurveyUseCase').execute(data)
    const postPool = async (data: PoolDTO) => await DI.resolve('postPoolUseCase').execute(data)


    const navigate = useNavigate();
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })



    const [open, setOpen] = useState(false);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as PoolSurveyView,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    })

    const updateFunction = async () => {
        if (formik.values.typeS === "sondage") {
            const updateData = new SurveyDTO(formik.values as SurveyDTO)
            return await postSurvey(updateData)
        }
        else if (formik.values.typeS === "cagnotte") {
            const updateData = new PoolDTO(formik.values as PoolDTO)
            return await postPool(updateData)
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
                        navigate(`/sondage/${ok.id}`);
                        setOpen(false)
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(new ServiceDTO(formik.values as ServiceDTO), null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />


            <VoteForm
                formik={formik}
            />
        </div >
    )
}