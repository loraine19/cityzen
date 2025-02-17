import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { AuthHeader } from './auth.Comps/AuthHeader';
import { Typography, Button, Card, CardBody, Input, CardHeader, CardFooter } from '@material-tailwind/react';;
import { User } from '../../../../domain/entities/User';
import DI from '../../../../di/ioc';
import { Icon } from '../../common/SmallComps';

export default function ForgotPasswordPage() {
    const resetPassword = async (email: string) => await DI.resolve('resetPasswordUseCase').execute(email)
    const [hidden, setHidden] = useState<boolean>(false)
    const [notif, setNotif] = useState<string>('Entrez votre adresse email et nous vous enverrons un lien pour changer votre mot de passe');
    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
    })
    const formik = useFormik({
        initialValues: new User(),
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            const email = formik.values.email.trim()
            const response = await resetPassword(email)
            setNotif(response ? response.message : 'Verifiez votre email')
            setHidden(true)
        },
    });

    return (
        <div className="Body gray items-center gap-4">
            <div className=" w-respLarge flex justify-between items-center">
                <AuthHeader />
                <Icon fill size='3xl' icon='cancel' title='fermer' link='/signin' />
            </div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col  w-respLarge' >
                <main className='flex flex-col py-6 gap-4 '>
                    <Card className='FixCardNoImage flex py-8 w-respLarge'>
                        <CardHeader className="FixCardHeaderNoImage flex-col !my-0 p-4 " floated={false}>
                            <Typography variant="h5" color="blue-gray" >
                                Mot de pass oublié
                            </Typography>
                            <Typography >{notif}</Typography>
                        </CardHeader>
                        <CardBody className='FixCardBody gap-8 my-4 '>
                            <Input label={formik?.errors.email ? formik?.errors.email : "Email"} name="email" variant="static" error={formik?.errors.email ? true : false} onChange={formik.handleChange} onInput={() => setHidden(false)} className='w-full' />
                        </CardBody>
                        <CardFooter className='FixCardFooter'>
                            <Button type="submit" className={`lgBtn w-max ${hidden && ' invisible'}`}>
                                Envoyer
                            </Button>
                        </CardFooter>
                    </Card>
                </main>

            </form>
        </div>
    )
}