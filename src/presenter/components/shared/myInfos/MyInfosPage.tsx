import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { AuthHeader } from '../auth/authComps/AuthHeader';
import { ProfileForm } from '../auth/authComps/ProfileForm';
import { Profile } from '../../../../domain/entities/Profile';
import { ConfirmModal } from '../../common/ConfirmModal';

//import { logOut } from '../../../../infrastructure/services/authService';
import DI from '../../../../di/ioc';
import { Address } from '../../../../domain/entities/Address';
import { LogOutButton } from '../../common/SmallComps';
import { useUserStore } from '../../../../application/stores/userStore';


export default function MyInfosPage() {
    const { setUserProfile } = useUserStore()
    const navigate = useNavigate();
    const [newProfile] = useState<Profile>({} as Profile);
    const [skillList, setSkillList] = useState<string[]>(newProfile.skills ? newProfile.skills : [])
    const [open, setOpen] = useState(false);
    const { addresses } = DI.resolve('addressViewModel')()
    const { postAddress } = DI.resolve('postAddressViewModel')()
    const { profileMe } = DI.resolve('profileMeViewModel')()
    const { updateProfile } = DI.resolve('updateProfileViewModel')()
    console.log("profile", profileMe)

    const { user, loadingUser, errorUser } = DI.resolve('userViewModel')
    console.log(user, loadingUser, errorUser)

    useEffect(() => {
        const fetch = async () => {
            const { Profile } = user
            formik.values.firstName = Profile.firstName
            formik.values.lastName = Profile.lastName
            formik.values.phone = Profile.phone.toString()
            formik.values.image = Profile.image
            formik.values.addressId = Profile.addressId
            formik.values.Address = Profile.Address
            formik.values.assistance = Profile.assistance.toString().replace(/LEVEL_/g, "")
            formik.values.skills = Profile.skills
        }
        fetch()
    }, []);

    /// FORMIK SCHEMA
    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(10, "minmum 2 caractères").max(14, "maxmum 14 caractères").matches(/^\+33/, "Le Numéro doit commencer par +33"),
        Address: object({ city: string().required("Ville est obligatoire"), zipcode: string().required("Code postal est obligatoire") })
    })

    /// FORMIK SUBMIT
    const formik = useFormik({
        initialValues: newProfile as any,
        validationSchema: formSchema,
        onSubmit: values => {
            addressIn()
            !formik.values.assistance.includes("LEVEL_") && (formik.values.assistance = `LEVEL_${formik.values.assistance}`);
            formik.values.skills = skillList.toString();
            formik.values = values
            setOpen(true)
        }
    })

    /// ADDRESS FUNCTION
    async function addressIn() {
        const AdressToSearch = formik.values.Address
        const addressList = addresses
        const addressFind = addressList.find((address: Address) => address.address === AdressToSearch.address && address.city === AdressToSearch.city)
        if (!addressFind) {
            const post = await postAddress(AdressToSearch)
            post ? (formik.values.Address = post) : (formik.values.Address = '')
        }
        else {
            addressFind?.id !== newProfile.addressId && (formik.values.Address = addressFind);
        }
        formik.values.addressId = formik.values.Address.id
    }

    /// UPDATE FUNCTION API
    const updateFunction = async () => {
        formik.values.addressId = formik.values.Address.id
        const { Address, ...rest } = formik.values;
        const updateData = { ...rest }
        const patchedProfile = await updateProfile(updateData);
        return patchedProfile
    }


    return (
        <div className="Body gray flex">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await updateFunction()
                    if (ok) {
                        setUserProfile(ok)
                        navigate("/");
                        setOpen(false)
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

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
            <ProfileForm formik={formik} user={newProfile} setSkillList={setSkillList} />

        </div >
    )
}