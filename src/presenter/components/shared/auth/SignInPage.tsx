//src/presenter/components/shared/auth/SignInPage.tsx
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthForm } from './authComps/AuthForm';
import { AuthHeader } from './authComps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';
import { useToken } from '../../../../domain/repositories-ports/useToken';
import DI from '../../../../di/ioc';
import { Auth } from '../../../../domain/entities/Auth';


export default function SignInPage() {
    const { saveToken } = useToken();
    const [searchParams] = useSearchParams();
    const params = { email: searchParams.get("email"), token: searchParams.get("token") }
    const { email, token } = params
    const [notif, setNotif] = useState<string>(email ? 'vous pouvez maintenant vous connecter' : "");

    ////SIGN IN
    const { errorAuth, signIn } = DI.resolve('authSignInViewModel')()

    ////SIGN IN VERIFY
    const { errorAuthVerify, signInVerify } = DI.resolve('authSignInVerifyViewModel')();

    ////USE EFFECT
    useEffect(() => {
        console.log(errorAuth, errorAuthVerify)
    }, [errorAuth, errorAuthVerify])

    ////FORMIK
    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligatoire").min(8, "minimum 8 lettres"),
    })
    const formik = useFormik({
        initialValues: {} as any,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            if (values.email && values.password) {
                ////SIGN IN VERIFY
                if (token) {

                    const authVerify = await signInVerify({ email, password: values.password, verifyToken: token })
                    console.log(authVerify)
                    if (authVerify) {
                        saveToken(authVerify.accessToken, authVerify.refreshToken);
                        setNotif('Votre compte est vérifié et vous êtes connecté, redirection ...')
                        setTimeout(() => {
                            window.location.replace("/signup_details")
                        }, 2000);
                    }
                    else if (errorAuthVerify || errorAuth) {
                        setNotif('Compte non activé, veuillez vérifier votre email' + errorAuthVerify + errorAuth)
                        formik.values = {} as any
                    }
                    else if (!authVerify) {
                        setNotif('identifiants iconnus ...')
                    }

                }
                ////SIGN IN
                else if (!token) {
                    const auth: Auth = await signIn({ email: values.email, password: values.password })
                    console.log(auth)
                    if (auth && auth.accessToken) {

                        saveToken(auth.accessToken, auth.refreshToken);
                        setNotif('Vous êtes connecté, redirection ...')
                        setTimeout(() => {
                            window.location.replace("/")
                        }, 2000);
                    }
                    else if (auth && !auth.accessToken) {
                        setNotif('Compte non activé, nous vous avons envoyé un nouvel email de vérification')
                    }
                    else if (errorAuth || errorAuthVerify) {
                        setNotif('Email ou mot de passe incorrect' + errorAuth + errorAuthVerify)
                        formik.values = {} as any
                    }
                    else {
                        setNotif('erreur iconnue ...')
                    }

                }
            }
        },
    });
    const terms = "Vous resterez connecté pour 48h ..."

    return (

        <div className="Body gray pb-2">
            <AuthHeader />
            <main className='items-center gap-4 pb-2'>
                <AuthForm
                    formik={formik}
                    lead="Acceder à votre compte"
                    notif={notif}
                    popOverContent={terms}
                    popOverButtonText="Rester connecté"
                    popOverClass="font-light text-start "
                    popOverVariant="texte"
                    submitText="Se connecter"
                    confirm={false} />
                <Link to="/motdepasse_oublie">
                    <Typography className="text-xs font-medium p-2 text-center underline underline-offset-8 uppercase">
                        Mot de pass oublié
                    </Typography>
                </Link>

                <Typography variant="small" className=" flex justify-center">
                    Pas encore de compte ?
                </Typography>

                <Link to="/signup">
                    <Button
                        size="md" className="rounded-full mb-2">
                        inscrivez-vous
                    </Button>
                </Link>
            </main>
        </div>
    )
}

