import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, } from '@material-tailwind/react';
import { AuthHeader } from './auth.Comps/AuthHeader'
import { ProfileForm } from './auth.Comps/ProfileForm';
import { Address, AddressDTO } from '../../../../domain/entities/Address';
import { Profile, ProfileDTO } from '../../../../domain/entities/Profile';
import { ConfirmModal } from '../../common/ConfirmModal';
import DI from '../../../../di/ioc';
import { LogOutButton } from '../../common/SmallComps';
import { useUserStore } from '../../../../application/stores/user.store';
import { Skeleton } from '../../common/Skeleton';
import { User } from '../../../../domain/entities/User';

export default function SignUpDetailPage() {
    const [newProfile] = useState<Profile>({} as Profile)
    const { setUserProfile } = useUserStore()
    const navigate = useNavigate();
    const user: User = useUserStore((state) => state.user);
    const [skillList, setSkillList] = useState<string[]>(user.Profile?.skills ? user.Profile.skills : [])
    const [assistance, setAssistance] = useState<string | undefined>()
    const [Address, setAddress] = useState<Address>(user.Profile?.Address)
    const [open, setOpen] = useState(false);
    const updateAddress = async (data: AddressDTO) => await DI.resolve('addressService').updateAddress(data)
    const postProfile = async (data: ProfileDTO) => await DI.resolve('profileUseCase').postProfile(data)

    /// FORMIK SCHEMA
    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(10, "minmum 2 caractères").max(14, "maxmum 14 caractères").matches(/^\+33/, "Le Numéro doit commencer par +33"),
        //  Address: object({ city: string().required("Ville est obligatoire") })
    })

    /// FORMIK SUBMIT
    const formik = useFormik({
        initialValues: newProfile as any,
        validationSchema: formSchema,
        onSubmit: async values => {
            const updatedAddress: Address = await updateAddress(formik.values.Address)
            formik.values.assistance = assistance
            formik.values.Address = updatedAddress;
            formik.values.skills = skillList.toString();
            formik.values = values
            setOpen(true)
        }
    })




    /// UPDATE FUNCTION API
    const updateFunction = async () => {
        formik.values.addressId = formik.values.Address.id
        const { createdAt, updatedAt, userId, Address, ...rest } = formik.values;
        const updateData = { assistance, ...rest }
        const postedProfile = await postProfile(updateData);
        if (postedProfile) {
            setUserProfile(postedProfile)
            navigate("/");
            setOpen(false)
        }
    }

    useEffect(() => { formik.values.Address = Address }, [Address])

    return (
        <div className="Body gray flex">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => { await updateFunction() }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <div className="w-respLarge flex-col flex justify-between ">
                <AuthHeader />
                <div className="flex justify-between items-center pb-3">
                    <Typography color="blue-gray" className='w-resp px-4 flex justify-center pb-2'>Bienvenue, veuillez remplir votre profil pour pouvoir utiliser Collect'if</Typography>
                    <LogOutButton />
                </div>
            </div>
            {!user ?
                <Skeleton /> :
                <ProfileForm formik={formik} setAssistance={setAssistance} setSkillList={setSkillList} setAddress={setAddress} />}
        </div >
    )
}