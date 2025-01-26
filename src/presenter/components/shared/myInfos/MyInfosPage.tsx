import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { AuthHeader } from '../auth/auth.Comps/AuthHeader';
import { ProfileForm } from '../auth/auth.Comps/ProfileForm';
import { ProfileDTO, } from '../../../../domain/entities/Profile';
import { ConfirmModal } from '../../common/ConfirmModal';

//import { logOut } from '../../../../infrastructure/services/authService';
import DI from '../../../../di/ioc';
import { Address, AddressDTO } from '../../../../domain/entities/Address';
import { LogOutButton } from '../../common/SmallComps';
import { useUserStore } from '../../../../application/stores/user.store';
import { User } from '../../../../domain/entities/User';
import { Skeleton } from '../../common/Skeleton';


export default function MyInfosPage() {
    const { setUserProfile } = useUserStore()
    const navigate = useNavigate();
    const user: User = useUserStore((state) => state.user);
    const [skillList, setSkillList] = useState<string[]>(user.Profile?.skills ? user.Profile.skills : [])
    const [assistance, setAssistance] = useState<string | undefined>()
    const [Address, setAddress] = useState<Address>(user.Profile?.Address)
    const [open, setOpen] = useState(false);
    const updateAddress = async (data: AddressDTO) => await DI.resolve('addressService').updateAddress(data)
    const updateProfile = async (data: ProfileDTO) => await DI.resolve('profileUseCase').updateProfile(data)

    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(10, "minmum 2 caractères").max(14, "maxmum 14 caractères").matches(/^\+33/, "Le Numéro doit commencer par +33"),
        Address: object({ city: string().required("Ville est obligatoire"), zipcode: string().required("Code postal est obligatoire") })
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...user.Profile } as any,
        validationSchema: formSchema,
        onSubmit: async values => {
            const updatedAddress: Address = await updateAddress(formik.values.Address)
            formik.values.Address = updatedAddress;
            formik.values.assistance = assistance
            formik.values.skills = skillList.toString();
            formik.values = values
            setOpen(true)
        }
    })


    const update = async () => {
        formik.values.addressId = formik.values.Address.id
        const { createdAt, updatedAt, userId, Address, ...rest } = formik.values;
        const updateData = { assistance, ...rest }
        const updated = await updateProfile(updateData);
        if (updated) {
            setUserProfile(updated)
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
                handleConfirm={async () => { await update() }}
                title={"Confimrer la modification"}
                element={
                    `<p className="font-bold text-lg">Voulez vous vraiment modifier vos informations personnelles ?</p>`
                } />

            <div className="w-respLarge flex-col !max-w-[100vw] flex justify-between pt-1">
                <div className="flex justify-between items-center gap-4">
                    <LogOutButton />
                    <Link to={`/`}>
                        <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 opacity-80">
                            <span className="material-symbols-outlined fillThin !text-4xl" >cancel</span>
                        </Button>
                    </Link>
                </div>
                <AuthHeader />
            </div>
            {!user.Profile ?
                <Skeleton /> :
                <ProfileForm formik={formik} setAssistance={setAssistance} setSkillList={setSkillList} setAddress={setAddress} />}
        </div >
    )
}