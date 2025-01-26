import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useEffect, useState } from 'react';
import { EventForm } from './eventComps/EventForm';
import { EventDTO, EventUpdateDTO } from '../../../../domain/entities/Event';
import { ConfirmModal } from '../../common/ConfirmModal';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { Address, AddressDTO } from '../../../../domain/entities/Address';
import { useUserStore } from '../../../../application/stores/user.store';

export default function EventDetailPage() {
    const { id } = useParams()
    const idS = id ? parseInt(id) : 0;

    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, loadingEvent } = eventIdViewModelFactory(idS);
    const user = useUserStore((state) => state.user);

    const [eventDto, setEventDto] = useState<EventDTO>(new EventDTO(event));

    useEffect(() => {
        setEventDto(new EventDTO(event));
        console.log(event.userId, user.id)
        event && event.userId !== user.id && navigate("/msg?msg=Vous n'avez pas le droit de modifier cet événement")
    }, [loadingEvent]);


    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const updateEvent = async (id: number, data: EventUpdateDTO) => await DI.resolve('eventUseCase').updateEvent(id, data)
    const updateAddress = async (data: AddressDTO) => await DI.resolve('addressService').updateAddress(data)


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
        enableReinitialize: true,
        initialValues: eventDto,
        validationSchema: formSchema,
        onSubmit: async values => {
            const updatedAddress: Address = await updateAddress(formik.values.Address)
            formik.values.Address = updatedAddress;
            formik.values = values
            setOpen(true)
        }
    })



    const updateFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        formik.values.addressId = formik.values.Address.id
        const { Address, ...rest } = formik.values;
        const updateData = { ...rest }
        const updated = await updateEvent(event.id, updateData)
        if (updated) {
            navigate("/evenement/" + updated.id);
            location.reload()
            setOpen(false)
        }
    }


    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => await updateFunction()}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />
            {loadingEvent || formik.values === null ?
                <Skeleton /> :
                <EventForm formik={formik} />}
        </div >
    )
}