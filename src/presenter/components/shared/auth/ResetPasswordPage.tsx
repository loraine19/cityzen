import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useEffect, useState } from 'react';
import { AuthHeader } from './authComps/AuthHeader';
import { Typography, Button, Card, CardBody, Input } from '@material-tailwind/react';
import { Link, useSearchParams } from 'react-router-dom';
import { User } from '../../../../domain/entities/User'
import { FETCH_URL } from '../../../../../env.local';
import { ResetPasswordApi } from '../../../../infrastructure/providers/http/resetPassword.api';


export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const [newUser,] = useState<User>({} as User);
    const [notif,] = useState<string>("");
    const params = { email: searchParams.get("email"), token: searchParams.get("token") }
    const { email, token } = params
    const { resetPasswordUpdate } = new ResetPasswordApi()

    const formSchema = object({
        password: string().required("password est obligatoire"),
    })

    console.log('r', FETCH_URL)
    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            const updatepassword = await resetPasswordUpdate({ email: email as string, password: formik.values.password, resetToken: token as string })
            if (updatepassword) {
                alert("mot de pass changé")
                window.location.href = "/signin"
            }
        },
    });


    useEffect(() => {
        if (token) {
            console.log(token)
        }
    }, [token]);




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
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Reinitialisation du mot de pass
                            </Typography>
                            <Typography color="gray" className="mb-4">
                                en cours de developpement
                                ecrire votre nouveaux mot de passe pour
                            </Typography>
                            <Typography className='text py-2'>{notif}   </Typography>
                            <Input label={'email'} name="email" variant="static" value={email as string} disabled={true} />
                            <Input label={formik.errors.email ? formik.errors.email : "Mot de passe"} name="password" variant="static" error={formik?.errors.password ? true : false} onChange={formik.handleChange} />
                        </CardBody>
                    </Card>
                </main>
                <footer>
                    <Button type="submit" size="lg" className="w-full rounded-full shadow-xl" >
                        Envoyer
                    </Button>
                </footer>
            </form>
        </div>
    )
}