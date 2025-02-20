//src/presenter/components/shared/auth/SignInPage.tsx
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from './auth.Comps/AuthForm';
import { AuthHeader } from './auth.Comps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';
import DI from '../../../../di/ioc';
import { useUserStore } from '../../../../application/stores/user.store';
import { AccessDTO, VerifyDTO } from '../../../../infrastructure/DTOs/AuthDTO';

export default function SignInPage() {
    const { saveToken } = DI.resolve('authService');
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const msg = searchParams.get("msg");
    const [notif, setNotif] = useState<string>(email && 'vous pouvez maintenant vous connecter' || msg || '');

    const signIn = async (accessData: AccessDTO) => await DI.resolve('signInUseCase').execute(accessData)
    const signInVerify = async (verifyData: VerifyDTO) => await DI.resolve('signInVerifyUseCase').execute(verifyData)

    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligatoire").min(6, "minimum 6 charactères"),
    });

    const formik = useFormik({
        initialValues: new AccessDTO(),
        validationSchema: formSchema,
        onSubmit: async (values) => {
            token ? await handleSignInVerify(values.email, values.password, token) : await handleSignIn(values.email, values.password)
        },
    });

    const handleSignInVerify = async (email: string, password: string, token: string) => {
        const verifyData = { email, password, verifyToken: token }
        const authVerify = await signInVerify(verifyData);
        if (authVerify?.refreshToken) {
            saveToken(authVerify.refreshToken);
            setNotif('Votre compte est vérifié et vous êtes connecté, redirection ...');
            setTimeout(() => { window.location.replace("/profile/create") }, 1000);
        } else {
            setNotif(authVerify?.error || 'Erreur de connexion');
            formik.resetForm();
        }

    };

    const fetchUser = useUserStore((state) => state.fetchUser);
    const handleSignIn = async (email: string, password: string) => {
        const accessData = { email, password }
        const auth = await signIn(accessData);
        if (auth?.refreshToken) {
            saveToken(auth.refreshToken);
            fetchUser()
            setNotif('Vous êtes connecté, redirection ...');
            setTimeout(() => { window.location.replace("/") }, 1000);
        } else {
            setNotif(auth?.error || 'Erreur de connexion');
            setTimeout(() => { formik.resetForm(); }, 1000);
        }
    }



    const terms = "Vous resterez connecté pour 48h ...";

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
                    popOverClass="font-light text-start"
                    submitText="Se connecter"
                    confirm={false}
                />

            </main>
            <footer className="flex flex-col items-center gap-2 py-2">
                <Link to="/motdepasse_oublie">
                    <Typography className="text-xs font-medium p-2 text-center underline underline-offset-8 uppercase">
                        Mot de pass oublié
                    </Typography>
                </Link>
                <Typography variant="small" className="flex justify-center">
                    Pas encore de compte ?
                </Typography>
                <Link to="/signup">
                    <Button size="sm" className="rounded-full mb-2">
                        inscrivez-vous
                    </Button>
                </Link>
            </footer>
        </div>
    );
}
