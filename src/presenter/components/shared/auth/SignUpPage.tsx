import { useFormik } from 'formik';
import { object, string, ref, boolean } from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from './authComps/AuthForm';
import { AuthHeader } from './authComps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';
import DI from '../../../../di/ioc';
import { terms } from '../../../../domain/constants/constants';

export default function SignUpPage() {
    const [notif, setNotif] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(false)

    ////SIGN UP
    const { errorAuth, signUp } = DI.resolve('authSignUpViewModel')()
    console.log(errorAuth)

    ////FORMIK
    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligatoire").min(8, "minimum 8 lettres"),
        passwordConfirm: string().oneOf([ref('password')], "les mots de passes doivent correspondre").required("Confirmation obligatoire"),
        checkbox: boolean().oneOf([true], "Vous devez accepter les termes et conditions").required("Vous devez accepter les termes et conditions")
    })

    const formik = useFormik({
        initialValues: {} as any,
        validationSchema: formSchema,
        onSubmit: values => {
            if (values.email && values.password === values.passwordConfirm && values.checkbox) {
                const connect = async () => {
                    const result = await signUp({ email: values.email, password: values.password })
                    console.log(result)
                    if (result && result.message.includes("created")) {
                        setNotif(result.message);
                        formik.resetForm();
                        setHidden(true)
                    }
                    else setNotif(result?.message || "Erreur inconnue")
                }
                connect()
            }
            else setNotif("Veuillez remplir correctement tout les champs")
        },
    });


    return (
        <div className="Body gray">
            <AuthHeader />
            <main className='items-center gap-4'>
                <AuthForm
                    lead="Creer votre compte"
                    notif={notif}
                    popOverContent={terms}
                    popOverButtonText="les condition d'utilisiation"
                    popOverClass="font-light underline underline-offset-8 text-start "
                    popOverVariant="texte"
                    submitText="S'enregistrer"
                    confirm={true}
                    formik={formik}
                    hidden={hidden}
                />
                <Typography variant="small" className=" flex justify-center">
                    Vous avez deja un compte?
                </Typography>
                <Link to="/signin">
                    <Button size="md" className="rounded-full">
                        Connectez-vous
                    </Button>
                </Link>
            </main>
        </div>
    )
}
