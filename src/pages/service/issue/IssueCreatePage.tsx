import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../../components/NavBarTop';
import SubHeader from '../../../components/SubHeader';
import { Option, Button, Select, Card, CardBody, CardHeader, Chip, Textarea, Typography } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import UserContext from '../../../contexts/user.context';
import { getImageBlob } from '../../../functions/GetDataFunctions';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import DataContext from '../../../contexts/data.context';
import { Issue, Profile, Service } from '../../../types/class';
import ServiceIssueCard from '../../../components/servicesComps/ServiceIssueCard';
import { ConfirmModal } from '../../../components/ConfirmModal';

export default function FlagEditPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const { data, setDataInLocal } = useContext(DataContext)
    const { services, issues, profiles } = data
    // const idS = user.id ? user.id : 0
    const elementFound = services.find((element: Service) => element.id === Number(id));
    const elementSelected = elementFound ? elementFound : {} as Service;
    const maxId = Math.max.apply(null, issues.map((element: Issue) => element.id));
    const navigate = useNavigate();
    const [newIssue, setNewIssue] = useState<Partial<Issue>>({
        id: maxId + 1,
        user_id_M: elementSelected ? elementSelected.user_id_Mget : 0,
        user_id_Mresp: elementSelected ? elementSelected.user_id_Mdo : 0,
        servicesid: elementSelected ? elementSelected.id : 0,
        description: "",
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
        image: "",
    });

    const haveImage = false
    const formSchema = object({
        description: string().required("Description est obligatoire"),
        user_id_M: string().required("le choix du modérateur est obligatoire"),
    })
    const [value, setValue] = useState("");

    const formik = useFormik({
        initialValues: newIssue as Issue,
        validationSchema: formSchema,
        onSubmit: values => {
            setNewIssue(values)
            formik.values = values
            setOpen(true)
            value && console.log("avoid compile error ", value)

        }
    });

    const { created_at, description, image } = formik.values
    const { title } = elementSelected
    const modo = profiles.filter((profile: Profile) => profile.user_id !== elementSelected.user_id && profile.user_id !== elementSelected.user_id_resp)
    const [img] = useState<string>('');
    const [imgBlob, setImgBlob] = useState<string | undefined>(img);
    const [open, setOpen] = useState(false);
    function saveIssue() {
        data.issues.push(formik.values as Issue)
        setDataInLocal({ ...data, issues: [...data.issues] })
    }
    console.log(formik.errors)
    return (
        <div className="Body gray">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    saveIssue();
                    navigate(`/service/${elementSelected.id}`);
                    setOpen(false)
                }}
                title={"Confimrer le litige"}
                element={(JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-3 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={newIssue.id && newIssue.id < issues.length ? `Modifier mon litige ` : "Créer mon litige"} place={" "} closeBtn />
                    <div className="w-respLarge">
                        <Select className="rounded-full shadow  bg-white border-none capitalize"
                            label={formik.errors.user_id_M ? formik.errors.user_id_M as string : "Choisir un modérateur"}
                            name={"category"}
                            labelProps={{ className: `${formik.errors.user_id_M && "error"} before:border-none after:border-none ` }}
                            value={(formik.values.user_id_M)?.toString()}
                            onChange={(val: any) => { setValue(val); formik.values.user_id_M = val }}
                        >
                            {modo.map((user: Profile, index: number) => {
                                return (
                                    <Option className={"rounded-full my-1 capitalize"} value={(user.user_id).toString()} key={index} >
                                        {user.firstName} - {user.lastName}
                                    </Option>)
                            })}
                        </Select>
                    </div>
                </header>
                <main className={`flex flex-1 pb-1 ' ${haveImage && "pt-[1.5rem]"}`}>
                    <Card className=" w-respLarge FixCard">
                        <CardHeader className={"FixCardHeader NoImage"}
                            floated={false}>
                            <div className={` "absolute top-0 p-2" h-full   justify-between w-full flex `}>

                                <Typography className=' px-2'>
                                    je créé ce litige sur {elementSelected.type === "get" ? "une demande" : "une offre"} de service  {user.id === elementSelected.user_id ? "que j'ai créé" : "à laquelle j'ai repondu"}</Typography>
                                <Chip value={(new Date(created_at ? created_at : new Date())).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                                </Chip>
                            </div>

                        </CardHeader>


                        <CardBody className='FixCardBody '>
                            <div className='CardOverFlow h-full justify-between gap-4 !pb-4'>
                                <div className='flex  gap-5 pt-3 h-full'>
                                    <div className='flex flex-col flex-1 pt-1'>
                                        <Textarea rows={2} resize={true} variant="static" label="Description" name="description" onChange={formik.handleChange} className=" focus:outline-none min-h-full  "
                                            value={description}
                                            containerProps={{
                                                className: "grid h-full",
                                            }} labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} />
                                        <Typography className='text-xs error pt-2'>{formik.errors.description as string} </Typography>

                                    </div>

                                    <div className="flex w-max max-w-[50%] relative justify-end items-end h-full bg-blue-gray-100 rounded-2xl">
                                        <Button className="shadow  absolute right-3 bottom-3 w-8 h-12 rounded-full z-20" ripple={false}>
                                            <label htmlFor="image"
                                                className=" flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                                <span className="material-symbols-rounded">{imgBlob ? "edit" : "add_a_photo"}</span>
                                                <div className="flex flex-col w-full items-center justify-center">
                                                    <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                                </div>
                                            </label>
                                        </Button>
                                        <Button type='button' variant='text' ripple={false} color="red" className={formik.values.image ? `z-30 rounded-full absolute -right-5  -bottom-2` : `hidden`} onClick={() => { formik.values.image = '', setImgBlob('') }}>
                                            <span className="material-symbols-rounded !text-2xl">cancel</span>
                                        </Button>

                                        {image &&

                                            <img
                                                src={imgBlob}
                                                alt={title}
                                                className="h-full w-full flex-1  rounded-2xl object-cover"
                                            />
                                        }
                                    </div>

                                </div>


                                <ServiceIssueCard service={elementSelected} />
                            </div>

                        </CardBody>
                    </Card>

                </main>
                <footer className="w-respLarge">
                    <Button type="submit" size="lg" className="w-full rounded-full" >
                        enregistrer
                    </Button>
                </footer>
            </form>
        </div >
    )
}