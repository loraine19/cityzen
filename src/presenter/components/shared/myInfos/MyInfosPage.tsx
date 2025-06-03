import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthHeader } from '../auth/auth.Comps/AuthHeader';
import { ProfileForm } from '../auth/auth.Comps/ProfileForm';
import { ProfileDTO, } from '../../../../domain/entities/Profile';
import DI from '../../../../di/ioc';
import { useUserStore } from '../../../../application/stores/user.store';
import { User } from '../../../../domain/entities/User';
import { Skeleton } from '../../common/Skeleton';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { LogOutButton } from '../../common/LogOutBtn';
import { Icon } from '../../common/IconComp';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { ProfileDiv } from '../../common/ProfilDiv';

export default function MyInfosPage() {
    const { setUser } = useUserStore()
    const navigate = useNavigate();
    const user: User = useUserStore((state) => state.user);
    const [assistance, setAssistance] = useState<string | undefined>(user.Profile?.assistance)
    const [mailSub, setMailSub] = useState<string | undefined>(user.Profile?.mailSub)
    const [address, setAddress] = useState<AddressDTO>(user.Profile?.Address)
    const updateProfile = async (data: ProfileDTO, Address: AddressDTO) => await DI.resolve('updateProfileUseCase').execute(data, Address)

    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(10, "minmum 2 caractères").max(14, "maxmum 14 caractères").matches(/^\+33/, "Le Numéro doit commencer par +33"),
        Address: object({ city: string().required("Ville est obligatoire"), zipcode: string().required("Code postal est obligatoire") }),
        mailSub: string()
    })

    const { setOpen, setAlertValues } = useAlertStore(state => state)

    const updateFunction = async () => {
        const { blob, ...rest } = formik.values;
        const updateData = new ProfileDTO({ assistance, ...rest })
        const updated = await updateProfile(updateData, address)
        console.log("updated", updated)
        if (!updated || updated?.error) {
            setOpen(false)
            throw new Error(updated?.error || "Une erreur est survenue lors de la mise à jour du profil");
        }
        else {
            navigate("/");
            setOpen(false)
            setUser({ ...user, Profile: updated })
        }
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: user.Profile as any,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values;
            formik.values.assistance = assistance;
            formik.values.mailSub = mailSub;
            const image = formik.values.blob ?? formik.values.image
            setOpen(true)
            setAlertValues({
                close: () => setOpen(false),
                handleConfirm: async () => await updateFunction(),
                disableConfirm: false,
                confirmString: "Enregistrer les modifications",
                title: "Confimrer la modification : ",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-2xl p-5'>
                        <ProfileDiv
                            profile={{ ...user, Profile: { ...formik.values, image } }}
                        />
                    </div>
                )
            })
        }
    })



    useEffect(() => { if (address) formik.values.Address = address }, [address])

    return (
        <>
            <header className="w-respLarge relative flex-col flex justify-between pt-2">
                <div className="flex absolute justify-between items-center top-4 z-50 -left-1 w-full">
                    <LogOutButton />
                    <Icon

                        bg clear
                        fill
                        size='2xl'
                        icon='cancel'
                        title='fermer'
                        link='/' />

                </div>
                <AuthHeader />
            </header>
            {!user.Profile ?
                <Skeleton /> :
                <ProfileForm
                    formik={formik}
                    setAssistance={setAssistance}
                    setAddress={setAddress}
                    setMailSub={setMailSub}
                />}
        </ >
    )
}