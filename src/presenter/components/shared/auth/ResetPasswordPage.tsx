import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { AuthHeader } from './authComps/AuthHeader';
import { Typography, Button, Card, CardBody, Input } from '@material-tailwind/react';
import { Link, useSearchParams } from 'react-router-dom';
import { User } from '../../../../domain/entities/User';
import { Icon } from '../../../components/common/SmallComps';
import DI from '../../../../di/ioc';


export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const [newUser,] = useState<User>({} as User);
    const [notif, setNotif] = useState<string>(' Entrez votre nouveau mot de passe');
    const params = { email: searchParams.get("email"), token: searchParams.get("token") }
    const { email, token } = params
    const { updatePassword } = DI.resolve('resetPasswordUpdateViewModel')()
    const passwordType = { value: 'password', icon: 'visibility' }
    const textType = { value: 'text', icon: 'visibility_off' }
    const [passWordInput, setPassWordInput] = useState<{ value: string, icon: string }>(passwordType)


    const formSchema = object({
        password: string().required("password est obligatoire"),
    })

    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            const updatepassword = await updatePassword({ email: email as string, password: formik.values.password, resetToken: token as string })
            if (updatepassword) {
                setNotif(updatepassword?.message);
                setTimeout(() => { window.location.href = '/signin'; }, 1000);
            }
            else { setNotif('une erreur est survenue') }
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
                </Link></div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8 w-full  py-[5vh] '>
                <main className='flex  flex-col items-center gap-4 pb-2'>
                    <Card className='w-respLarge flex py-4 flex-col items-center'>
                        <CardBody className='flex w-full w-resp flex-col text-center gap-4'>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Reinitialisation du mot de pass
                            </Typography>
                            <Typography color="gray" className="mb-4">
                                {notif}
                            </Typography>
                            <Input label={'email'} name="email" variant="static" value={email as string} disabled={true} />
                            <Input type={passWordInput.value}
                                icon={
                                    <Icon onClick={() => {
                                        passWordInput.value === 'password' ? setPassWordInput(textType) : setPassWordInput(passwordType)
                                    }} icon={passWordInput.icon} style='!-mt-4' />
                                }

                                label={formik.errors.email ? formik.errors.email : "Mot de passe"} name="password" variant="static" error={formik?.errors.password ? true : false} onChange={formik.handleChange} />
                        </CardBody>
                    </Card>
                </main>
                <footer className="flex justify-center w-respLarge">
                    <Button type="submit" size="lg" className="lgBtn" >
                        Envoyer
                    </Button>
                </footer>
            </form>
        </div>
    )
}