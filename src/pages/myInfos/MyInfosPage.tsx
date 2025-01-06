import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardBody, Typography, Input, Button, Select, Option, CardHeader, Avatar, IconButton, List, ListItem, ListItemSuffix, } from '@material-tailwind/react';
import { AuthHeader } from '../../components/authComps/AuthHeader';
import { getImageBlob, } from '../../functions/GetDataFunctions';
import { Address, AssistanceLevel, assistanceLevel, ProfileDTO, User } from '../../types/class';
import { ConfirmModal } from '../../components/UIX/ConfirmModal';
import { getUserMe } from '../../functions/API/usersApi';
import { getAddresses, postAddress } from '../../functions/API/addressApi';
import { patchProfile } from '../../functions/API/profilesApi';
import { AddressInputOpen } from '../../components/mapComps/AddressInputOpen';

export default function MyInfosPage() {
    const [user, setUser] = useState<User>({} as User);
    const [Address, setAddress] = useState<Address>({} as Address);
    const navigate = useNavigate();
    // const [newAddress, setNewAddress] = useState<string>(`${Address.address} ${Address.zipcode} ${Address.city}`);
    const [newProfile, setNewProfile] = useState<ProfileDTO>({} as ProfileDTO);
    const [imgBlob, setImgBlob] = useState<string>("")
    const [skillList, setSkillList] = useState<string[]>(newProfile.skills ? newProfile.skills : [])
    const [newSkill, setNewSkill] = useState<string | undefined>()
    const [value, setValue] = useState(newProfile.assistance ? newProfile.assistance.toString() : "0");
    const [addressList, setAddressList] = useState<Address[]>([])
    1 > 2 && console.log("avoid compile error", addressList)
    const [open, setOpen] = useState(false);
    let assistanceLevelSelect = assistanceLevel.filter((level: any) => { if (!isNaN(level)) { return level.toString() } }) as string[]
    type AddressErrors = { zipcode: string, city: string }

    /// ON LOAD PAGE FETCH 
    useEffect(() => {
        const fetch = async () => {
            const user = await getUserMe()
            const addresses = await getAddresses()
            setAddressList(addresses)
            setUser(user)
            const { Profile } = user
            setNewProfile(user.Profile)
            setAddress(Profile.Address)
            //setNewAddress(`${Profile.Address.address} ${Profile.Address.zipcode} ${Profile.Address.city}`)
            setSkillList(Profile.skills.toString().split(','))
            setImgBlob(user.Profile.image as string)
            formik.values.firstName = Profile.firstName
            formik.values.lastName = Profile.lastName
            formik.values.phone = Profile.phone.toString()
            formik.values.image = Profile.image
            formik.values.addressId = Profile.addressId
            const assistanceValue = Profile.assistance.toString().replace(/LEVEL_/g, "")
            formik.values.assistance = assistanceValue as unknown as AssistanceLevel
            setValue(assistanceValue)

        }
        fetch()
    }, []);
    /////////////////////

    /// FORMIK SCHEMA
    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(10, "minmum 2 caractères").max(14, "maxmum 14 caractères").matches(/^\+33/, "Le Numéro doit commencer par +33"),
        Address: object({
            city: string().required("Ville est obligatoire"),
            zipcode: string().required("Code postal est obligatoire"),
        })
    })

    /// FORMIK SUBMIT
    const formik = useFormik({
        initialValues: newProfile as any,
        validationSchema: formSchema,
        onSubmit: values => {
            addressIn()
            formik.values = values
            setOpen(true)
        }
    })

    /// UPDATE FORMIK VALUES ON CHANGE 
    useEffect(() => {
        async function updateAddress() {
            formik.values.Address = Address
            formik.values.addressId = formik.values.Address?.id
        }
        updateAddress()
    }, [newProfile, Address])



    /// SKILLS FUNCTIONS
    const removeSkill = (index: number, array: string[]) => { array.splice(index, 1); console.log(array); setSkillList([...array]) }
    const addSkill = () => { newSkill && setSkillList([...skillList, newSkill as string]), setNewSkill('') }


    /// ADDRESS FUNCTION
    async function addressIn() {
        const AdressToSearch = formik.values.Address
        const addressList = await getAddresses()
        const addressFind = addressList.find((address) => address.address === AdressToSearch.address && address.city === AdressToSearch.city)
        if (!addressFind) {
            console.log('post', AdressToSearch)
            const post = await postAddress(AdressToSearch)
            post ? (formik.values.Address = post) : (formik.values.Address = '')
        }
        else {
            addressFind?.id !== newProfile.addressId && (formik.values.Address = addressFind);
        }
        formik.values.addressId = formik.values.Address.id
        console.log("formik.values.Address", formik.values.Address)
    }

    /// DESTRCUCTURING FORMIK VALUES
    let { firstName, lastName, phone, image } = formik.values

    /// UPDATE FUNCTION API
    const updateFunction = async () => {
        formik.values.assistance = "LEVEL_" + formik.values.assistance
        formik.values.skills = skillList.toString()
        formik.values.addressId = formik.values.Address.id
        const { Address, ...rest } = formik.values;
        const updateData = { ...rest }
        const patchedProfile = await patchProfile(user.Profile.userId, updateData);
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
                        navigate("/");
                        setOpen(false);
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <div className=" w-respLarge flex justify-between p-4">
                <Link to={`/signin`}>
                    <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 p-4 opacity-80">
                        <span className="material-symbols-outlined fillThin !text-4xl" >logout</span>
                    </Button>
                </Link>
                <AuthHeader />
                <Link to={`/`}>
                    <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 p-4 opacity-80">
                        <span className="material-symbols-outlined fillThin !text-4xl" >cancel</span>
                    </Button>
                </Link>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex h-full flex-col gap-2 ' >
                <main className='flex flew-1 pt-8'>
                    <Card className="w-respLarge h-full justify-between">
                        <CardHeader className="bg-transparent shadow-none flex pb-2 justify-center items-end " floated={true}>
                            <Avatar src={imgBlob ? imgBlob as String : image} alt={image || imgBlob ? firstName : ''} size="xl" className={"bg-blue-gray-500 shadow-md w-24 h-24 BgUser"} />
                            <div className="flex -ml-8">
                                <Button color="gray" className="w-8 h-12 rounded-full z-20">
                                    <label htmlFor="image"
                                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                        <span className="material-symbols-rounded">{image ? 'edit' : 'add_a_photo'}</span>
                                        <div className="flex flex-col w-full items-center justify-center">
                                            <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                        </div>
                                    </label>
                                </Button>
                                <button type='button' className={imgBlob ? `p-0 absolute bottom-0 z-50 right-[calc(50%-4.5rem)] rounded] text-red-500 h-max !text-sm` : `hidden`} onClick={() => { setImgBlob(''), formik.values.image = '' }}>
                                    <span className="material-symbols-rounded ">cancel</span>
                                </button>
                                <Button type='button' variant='text' color="blue-gray" className="absolute top-7 -right-6" onClick={() => navigate('/motdepasse_oublie')}>
                                    modifier le mot de passe ?
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="flex flex-1 flex-col h-full gap-[4%] pb-8 pt-0 overflow-auto !max-h-[calc(100vh-18rem)]">
                            <Typography className='text-xs'>Information pour : {user.email} </Typography>
                            <Typography className='text-xs error'>{formik.errors.firstName as string} </Typography>
                            <Input label="Prénom" name="firstName" variant="standard" onChange={formik.handleChange} value={firstName} />
                            <Typography className='text-xs error'>{formik.errors.lastName as string} </Typography>
                            <Input label="Nom" name="lastName" variant="standard" onChange={formik.handleChange} value={lastName} />
                            <Typography className='text-xs error'>{formik.errors.phone as string} </Typography>
                            <Input label="Télephone" name="phone" variant="standard" onChange={formik.handleChange} value={phone} />

                            <AddressInputOpen address={formik.values.Address} setAddress={setAddress}
                                placeHolder={Address.address ? Address?.address + " " + Address?.zipcode + " " + Address?.city : ''} />
                            <Typography className='text-xs error pt-2'>
                                {formik.errors.Address && (formik.errors.Address as AddressErrors).zipcode && (formik.errors.Address as AddressErrors).city ? `${(formik.errors.Address as AddressErrors).zipcode} ${(formik.errors.Address as AddressErrors).city}` : '' as string}
                            </Typography>


                            <Select className="p-5 capitaliz " label="Assistance" name="level" variant='standard'
                                value={value}
                                onChange={(val: any) => { setValue(val); formik.values.assistance = val }}>
                                {assistanceLevelSelect.map((level: string, index: number) => {
                                    return (
                                        <Option value={(level).toString()} key={index}>
                                            {level}
                                        </Option>
                                    )
                                })}
                            </Select>
                            <div className='flex items-center'>
                                <Input label="Ajouter une compétences" name="skills" value={newSkill} variant="standard" onChange={(e) => { e.preventDefault(); setNewSkill(e.target.value) }} onSubmit={addSkill} />
                                <button type="button"
                                    onClick={addSkill}>
                                    <span className='material-symbols-rounded'>add</span></button>
                            </div>
                            <List className='flex  p-0'>
                                <Typography className='text-xs'>Liste des compétences</Typography>
                                {skillList?.map((skill: string, index: number) =>
                                    <ListItem ripple={true} key={index} className="!py-0 px-2 rounded-full text-sm">
                                        {skill}
                                        <ListItemSuffix>
                                            <IconButton variant="text" color="blue-gray" onClick={() => removeSkill(index, skillList)}>
                                                <span className="material-symbols-rounded !text-xl">close</span>
                                            </IconButton>
                                        </ListItemSuffix>
                                    </ListItem>
                                )}
                            </List>
                        </CardBody>
                    </Card>

                </main>
                <footer className="w-respLarge pb-2 flex-2">
                    <Button type="submit" size="md" className="w-full rounded-full" >
                        modifier mon profile
                    </Button>
                </footer>
            </form>

        </div >
    )
}