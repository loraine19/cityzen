import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { AuthHeader } from '../../components/authComps/AuthHeader';
import { Profile } from '../../types/class';
import { ConfirmModal } from '../../components/UIX/ConfirmModal';
import { getUserMe } from '../../functions/API/usersApi';
import { getAddresses, postAddress } from '../../functions/API/addressApi';
import { patchProfile } from '../../functions/API/profilesApi';
import { logOut } from '../../functions/API/useApi';
import { ProfileForm } from '../../components/authComps/ProfileForm';
import UserContext from '../../contexts/user.context';

export default function MyInfosPage() {
    const { setUserCont } = useContext(UserContext)
    const navigate = useNavigate();
    const [newProfile, setNewProfile] = useState<Profile>({} as Profile);
    const [skillList, setSkillList] = useState<string[]>(newProfile.skills ? newProfile.skills : [])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const user = await getUserMe()
            const { Profile } = user
            setNewProfile(user.Profile)
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
        const addressList = await getAddresses()
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
    const updateFunction = async () => {
        formik.values.addressId = formik.values.Address.id
        const { Address, ...rest } = formik.values;
        const updateData = { ...rest }
        const patchedProfile = await patchProfile(updateData);
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
                        setUserCont(ok)
                        navigate("/");
                        setOpen(false)
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <div className="w-respLarge flex-col !max-w-[100vw] flex justify-between pt-1">
                <div className="flex justify-between items-center gap-4">
                    <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 opacity-80"
                        onClick={() => logOut()}>
                        <span className="material-symbols-outlined fillThin !text-4xl" >logout</span>
                    </Button>
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