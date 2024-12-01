import { useFormik } from 'formik';
import { bool, object, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from '../../components/authComps/AuthForm';
import { user } from '../../types/user';
import { AuthHeader } from '../../components/authComps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';


export default function SignInPage() {

    const [newUser, setNewUser] = useState<user>({} as user);
    const navigate = useNavigate();
    const [notif, setNotif] = useState<string>("");

    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligtaoire").min(8, "minmum 8 lettres"),
        acceptTerms: bool()
    })

    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: values => {
            if (values.email && values.password) {
                navigate("/")
                setNewUser(values)
            }
            else setNotif("Non connecté")
        },
    });
    const terms = "Vous resterez connecté pour 48h ..."

    return (

        <div className="Body gray pb-2">
            <AuthHeader />
            <main className='items-center gap-4 pb-2'>
                <AuthForm handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                    lead="Acceder à votre compte"
                    notif={notif}
                    popOverContent={terms}
                    popOverButtonText="Rester connecté"
                    popOverClass="font-light text-start "
                    popOverVariant="texte"
                    checkboxName="stayConnected"
                    submitText="Se connecter"
                    errorEmail={formik.errors.email}
                    errorPassword={formik.errors.password}
                    errorCheck={formik.errors.acceptTerms}
                    confirm={false}
                    errorConfirm={""}
                />
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