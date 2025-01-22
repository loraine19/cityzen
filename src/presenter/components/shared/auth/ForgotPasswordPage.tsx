import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { AuthHeader } from './authComps/AuthHeader';
import { Typography, Button, Card, CardBody, Input } from '@material-tailwind/react';;
import { Link } from 'react-router-dom';
import { User } from '../../../../domain/entities/User';
import DI from '../../../../di/ioc';

export default function ForgotPasswordPage() {
    const resetPasswordViewModelFactory = DI.resolve('resetPasswordViewModel');
    const [newUser] = useState<User>({} as User);
    const [hidden, setHidden] = useState<boolean>(false)
    const [notif, setNotif] = useState<string>(' Entrez votre adresse email et nous vous enverrons un lien pour changer votre mot de passe');
    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
    })
    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            let email = formik.values.email.trim()
            const response = await resetPasswordViewModelFactory(email)
            setNotif(response ? response.message : 'Verifiez votre email')
            setHidden(true)
        },
    });




    return (
        <div className="Body gray gap-8 items-center">
            <div className=" w-respLarge flex justify-between items-center">
                <AuthHeader />
                <Link to={`/signin`}>
                    <Button variant="text" className="flex justify-center items-center rounded-full h-8 w-8 p-4 opacity-80">
                        <span className="material-symbols-outlined fillThin !text-4xl" >cancel</span>
                    </Button>
                </Link>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex w-full w-respLarge h-full flex-col gap-8  py-[5vh] '>
                <main className='flex flex-1 h-full flex-col items-center gap-4 pb-2'>
                    <Card className='w-respLarge w-full h-full flex py-4 flex-col items-center'>
                        <CardBody className='flex w-full flex-col text-center gap-4'>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Mot de pass oublié
                            </Typography>

                            <Typography className='text py-2'>{notif}   </Typography>


                            <Input label={formik?.errors.email ? formik?.errors.email : "Email"} name="email" variant="static" error={formik?.errors.email ? true : false} onChange={formik.handleChange} onInput={() => setHidden(false)} className='w-full' />

                        </CardBody>
                    </Card>
                </main>
                <footer>
                    <Button type="submit" size="lg" className={`lgBtn ${hidden && ' invisible'}`}>
                        Envoyer
                    </Button>

                </footer>
            </form>
        </div>
    )
}