import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useState } from 'react';
import { EventForm } from './eventComps/EventForm';
import { ConfirmModal } from '../../common/ConfirmModal';
import DI from '../../../../di/ioc';
import { Address } from '../../../../domain/entities/Address';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { EventUpdateDTO, EventDTO } from '../../../../infrastructure/DTOs/EventDTO';


export default function EventCreatePage() {
    const navigate = useNavigate();
    const [Address, setAddress] = useState<AddressDTO>({} as AddressDTO)
    const postEvent = async (data: EventUpdateDTO, Address: Address) => await DI.resolve('postEventUseCase').execute(data, Address)

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participantsMin: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("Catégorie est obligatoire"),
        Address: object({
            city: string().required("Ville est obligatoire"),
            zipcode: string().required("Code postal est obligatoire"),
        })
    })

    const formik = useFormik({
        initialValues: new EventDTO(),
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            setOpen(true)
        }
    });

    const postFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        const { Address, Participants, ...rest } = formik.values;
        const updateData = { ...rest }
        const post = await postEvent(updateData, Address);
        if (post) {
            navigate("/evenement/" + post.id);
            location.reload()
        }
    }



    const [open, setOpen] = useState(false);
    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => { await postFunction() }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <EventForm
                formik={formik}
                Address={Address}
                setAddress={setAddress} />
        </div >
    )
}