import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from '../../components/authComps/AuthForm';
import { user } from '../../types/user';
import { AuthHeader } from '../../components/authComps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';
import { signIn, signInVerify } from '../../functions/API/usersApi';
import { useToken } from '../../functions/API/useToken';


export default function SignInPage() {
    const { saveToken } = useToken();
    const [searchParams] = useSearchParams();
    const params = { email: searchParams.get("email"), token: searchParams.get("token") }
    const { email, token } = params
    console.log(token)
    const [newUser] = useState<user>({
        email: email ? email : "",
    } as user);
    // const navigate = useNavigate();
    const [notif, setNotif] = useState<string>(email ? 'vous pouvez maintenant vous connecter' : "");

    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligatoire").min(8, "minimum 8 lettres"),

    })

    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            if (values.email && values.password) {

                const result = token ? await signInVerify({ email: values.email, password: values.password, verifyToken: token }) : await signIn({ email: values.email, password: values.password })
                if (result && result.accessToken) {
                    saveToken(result.accessToken, result.refreshToken)
                    !token ? window.location.replace("/") : window.location.replace("/signup_details")
                }
                else if (result && !result.accessToken) {
                    setNotif('Compte non activé, veuillez vérifier votre email')
                    formik.values = {} as any
                }
                else setNotif('Email ou mot de passe incorrect')
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
                    <Typography className="text-xs font-medium p-2 text-center underline underline-offset-8 uppercase">Mot de pass oublié</Typography>
                </Link>

                <Typography variant="small" className=" flex justify-center">
                    Pas encore de compte ?
                </Typography>

                <Link to="/signup">
                    <Button
                        size="lg" className="rounded-full"
                        color="white">
                        inscrivez-vous
                    </Button>
                </Link>

            </main>
        </div>
    )
}

