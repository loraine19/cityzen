import { useFormik } from 'formik';
import { object, string } from 'yup';

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Card, CardBody, Typography, Input, Button, Select, Option, CardHeader, Avatar, IconButton, List, ListItem, ListItemSuffix, } from '@material-tailwind/react';
import MapPickUpComp from '../../components/mapComps/MapPickUpComp';
import UserContext from '../../contexts/user.context';
import { AuthHeader } from '../../components/authComps/AuthHeader';
import { assistanceLevel } from '../../datas/enumsCategories';
import { getImageBlob } from '../../functions/GetDataFunctions';
import { Profile } from '../../types/class';


export default function SignUpDetailPage() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    interface ProfileA extends Profile {
        address: string
    }
    const [newUser, setNewUser] = useState<ProfileA>({} as ProfileA);

    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(2, "minmum 2 lettres"),
        // address: string().required("Addresse est obligatoire").min(2, "minmum 2 lettres"),
    })
    const [address, setAddress] = useState<string>("");
    const [value, setValue] = useState("0");
    1 < 0 && console.log("avoid compile error ", value)


    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: values => {
            alert("enregistrement effectué:" + JSON.stringify(values, null, 2));
            navigate("/")
            setNewUser(values)
        }
    });

    const [skillList, setSkillList] = useState<string[]>([])
    const [newSkill, setNewSkill] = useState<string | undefined>()

    useEffect(() => {
        formik.values.address = address
        formik.values.skills = skillList
        formik.values.assistance = formik.values.assistance
    }, [formik.values, address, skillList])

    const removeSkill = (index: number, array: string[]) => { array.splice(index, 1); console.log(array); setSkillList([...array]); }
    const addSkill = () => { newSkill && setSkillList([...skillList, newSkill as string]), setNewSkill('') }
    const [imgBlob, setImgBlob] = useState<string>("")

    return (
        <div className="Body gray height-[100vh]">

            <AuthHeader />
            <form onSubmit={formik.handleSubmit} className='flex h-full flex-col gap-2 ' >
                <main className='flex flew-1 pt-8'>
                    <Card className="w-respLarge h-full justify-between">  <CardHeader className="bg-transparent shadow-none flex pb-2 justify-center items-end " floated={true}>
                        <Avatar src={imgBlob ? imgBlob : user?.avatar} alt="avatar" size="xl" className=" shadow-md w-24 h-24" />
                        <div className="flex -ml-8">
                            <Button color="gray" className="w-8 h-12 rounded-full z-20">
                                <label htmlFor="image"
                                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <span className="material-symbols-rounded">add_a_photo</span>
                                    <div className="flex flex-col w-full items-center justify-center">
                                        <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                    </div>
                                </label>
                            </Button>
                            <Button type='button' variant='text' color="cyan" className={imgBlob ? `p-1` : `hidden`} onClick={() => { setImgBlob(''), formik.values.avatar = '' }}>
                                <span className="material-symbols-rounded">cancel</span>
                            </Button>
                        </div>
                    </CardHeader>
                        <CardBody className="flex flex-1 flex-col h-full pb-4 pt-0 overflow-auto !max-h-[calc(100vh-18rem)] gap-[3%]">
                            <Typography className='text-xs'>Information pour : {user.email} </Typography>
                            <Typography className='text-xs error'>{formik.errors.firstName as string} </Typography>
                            <Input label="Prénom" name="firstName" variant="standard" onChange={formik.handleChange} />
                            <Typography className='text-xs error'>{formik.errors.lastName as string} </Typography>
                            <Input label="Nom" name="lastName" variant="standard" onChange={formik.handleChange} />
                            <Typography className='text-xs error'>{formik.errors.phone as string} </Typography>
                            <Input label="Télephone" name="phone" variant="standard" onChange={formik.handleChange} />
                            <Typography className='text-xs error'>{formik.errors.phone as string} </Typography>
                            <Typography className='text-xs max-w-50  max-h-4 overflow-auto'>{formik.errors.address as string}  </Typography>

                            <div className="relative w-full min-w-[200px] h-11 pb-2">
                                <MapPickUpComp address={address} setAddress={setAddress} inputStyle={true} text={"Addresse"} />
                                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] after:content[''] after:block after:w-full after:absolute after:-bottom-1.5 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-gray-500 peer-focus:text-gray-900 after:border-gray-500 peer-focus:after:border-gray-900">addresse </label></div>
                            <Select className="p-5 capitaliz " label="Assistance" name="level" variant='standard'
                                value={value}
                                onChange={(val: any) => { setValue(val); formik.values.assistance = parseInt(val) as 0 | 1 | 2 | 3 }}
                            >
                                {assistanceLevel.map((level: number, index: number) => {
                                    return (
                                        <Option value={(level)?.toString()} key={index}>
                                            {level > 0 ? `assistance niveau ${level}` : `pas d'assistance`}
                                        </Option>
                                    )
                                })}
                            </Select>
                            <div className='flex items-center'>
                                <Input label="Ajouter une compétences" name="skills" value={newSkill} variant="standard" onChange={(e) => { e.preventDefault(); setNewSkill(e.target.value) }}
                                    onSubmit={addSkill} />
                                <button type="button"
                                    onClick={addSkill}>
                                    <span className='material-symbols-rounded'>add</span></button>
                            </div>
                            <List className='flex  p-0'>
                                <Typography className='text-xs'>   Liste des compétences</Typography>
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
                <footer className="w-respLarge pb-2">
                    <Button type="submit" size="md" className="w-full rounded-full" >
                        enregistrer mon profile
                    </Button>
                </footer>
            </form>

        </div >
    )
}