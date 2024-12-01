import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useEffect, useState } from 'react';
import { user, userProfile } from '../../types/user';
import { AuthHeader } from '../../components/authComps/AuthHeader';
import { Typography, Button, Card, CardBody, Input } from '@material-tailwind/react';
import { usersFaker } from '../../datas/fakers/usersFaker';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {

    const [newUser, setNewUser] = useState<user>({} as user);
    const [notif, setNotif] = useState<string>("");

    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
    })
    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: values => {
            if (find) {
                alert("Email envoyé à " + find.firstName)
                setNewUser(values)
            }
            else alert("pas trouvé")
        },
    });
    const [find, setFind] = useState<userProfile | undefined>(usersFaker.find((user) => user.email === (formik.values.email))
    )
    useEffect(() => {
        let find2 = usersFaker.find((user) => user.email === formik.values.email)
        setNotif(find2 ? "Email trouvé" : "")
        setFind(find2)
    }, [formik.values.email])



    return (
        <div className="Body gray gap-8 items-center">
            <div className=" w-respLarge flex justify-between items-center">
                <AuthHeader />
                <Link to={`/signin`}>
                    <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 p-4 opacity-80">
                        <span className="material-symbols-outlined fillThin !text-4xl" >cancel</span>
                    </Button>
                </Link></div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8  py-[5vh] '>
                <main className='flex  flex-col items-center gap-4 pb-2'>
                    <Card className='w-respLarge flex py-4 flex-col items-center'>
                        <CardBody className='flex flex-col text-center gap-4'>
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Mot de pass oublié
                            </Typography>
                            <Typography color="gray" variant="lead" className="mb-4">
                                Entrez votre adresse email et nous vous enverrons un lien pour changer votre mot de pass
                            </Typography>
                            <Typography className='text py-2'>{notif}   </Typography>


                            <Input label="Email" name="email" variant="static" onChange={formik.handleChange} />
                            <Typography className='text-xs error py-2'>{formik.errors.email as string}   </Typography>
                        </CardBody>
                    </Card>
                </main>
                <footer>
                    <Button type="submit" size="lg" className="w-full rounded-full shadow-xl">
                        Envoyer
                    </Button>
                </footer>
            </form>
        </div>
    )
}