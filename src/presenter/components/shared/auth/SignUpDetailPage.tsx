import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Button, Typography, } from '@material-tailwind/react';
import { AuthHeader } from './authComps/AuthHeader'
import { ProfileForm } from './authComps/ProfileForm';
import Skeleton from 'react-loading-skeleton';
import { Address } from '../../../../domain/entities/Address';
import UserContext from '../../../../contexts/user.context';
import { Profile } from '../../../../domain/entities/Profile';
import { ConfirmModal } from '../../common/ConfirmModal';
import { logOut } from '../../../../infrastructure/services/authService';
import DI from '../../../../di/ioc';

export default function SignUpDetailPage() {
    const { setUserProfile } = useContext(UserContext)
    const navigate = useNavigate();
    const [newProfile] = useState<Profile>({} as Profile);
    const [skillList] = useState<string[]>(newProfile.skills ? newProfile.skills : [])
    const [open, setOpen] = useState(false);
    const { addresses } = DI.resolve('addressViewModel')()
    const { postAddress } = DI.resolve('postAddressViewModel')()
    const { postProfile } = DI.resolve('postProfileViewModel')()
    const { user, loadingUser } = DI.resolve('userViewModel')
    console.log(postAddress)
    const [addressList] = useState<Address[]>(addresses ? addresses : [])

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
        onSubmit: values => {
            addressIn()
            formik.values.userId = user?.id || 0
            !formik.values.assistance.includes("LEVEL_") && (formik.values.assistance = `LEVEL_${formik.values.assistance}`);
            formik.values.skills = skillList.toString();
            formik.values = values
            setOpen(true)
        }
    })


    /// ADDRESS FUNCTION
    async function addressIn() {
        const AdressToSearch = formik.values.Address
        const addressFind = addressList.find((address) => address.address === AdressToSearch.address && address.city === AdressToSearch.city)
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
    const PostFunction = async () => {
        formik.values.addressId = formik.values.Address.id
        const { Address, ...rest } = formik.values;
        const Data = { ...rest }
        console.log('Data', Data)
        const postedProfile = await postProfile(Data);
        return postedProfile
    }

    return (
        <div className="Body gray flex">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await PostFunction()
                    if (ok) {
                        setUserProfile(ok);
                        navigate("/");
                        setOpen(false);
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <div className="w-respLarge flex-col flex justify-between ">
                <AuthHeader />
                <div className="flex justify-between items-center pb-3">
                    <Typography color="blue-gray" className='w-resp px-4 flex justify-center pb-2'>Bienvenue, veuillez remplir votre profil pour pouvoir utiliser Collect'if</Typography>
                    <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 opacity-80"
                        onClick={() => logOut()}>
                        <span className="material-symbols-outlined fillThin !text-4xl" >logout</span>
                    </Button>
                </div>
            </div>
            {loadingUser ?
                <Skeleton /> :
                <ProfileForm formik={formik} />}
        </div >
    )
}