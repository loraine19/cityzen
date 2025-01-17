import { useFormik } from 'formik';
import { object, string, ref, boolean } from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from './authComps/AuthForm';
import { AuthHeader } from './authComps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';
import { AuthService } from '../../../../domain/repositories-ports/AuthRepository';

export default function SignUpPage() {
    const { signUp } = new AuthService()
    const [notif, setNotif] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(false)
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

    const terms = `"Votre vie privée est importante pour nous !
    Lorsque vous visitez notre site, des compagnies pré - sélectionnées peuvent accéder à certaines informations sur votre appareil et sur cette page Web et les utiliser pour diffuser des annonces pertinentes ou du contenu personnalisé.Veuillez noter que ces annonces nous permettent de maintenir notre service gratuit.Les données à caractère personnel seront traitées sur la base du consentement conformément à l'article 6 (1) (a) du cadre du RGPD dans le droit communautaire, ou en tant qu'intérêt légitime conformément à l'article 6 (1) (f) de ce même cadre.
    
    Comprenez pourquoi vous voyez cela
        Nous, l'« Éditeur », et un groupe restreint de partenaires de confiance (850), dénommés « Fournisseurs », avons besoin de votre consentement à des fins de traitement des données. Ces objectifs incluent de stocker et/ou accéder à des informations stockées sur un terminal, comme la gestion des cookies et pour traiter des données personnelles telles que les informations standard envoyées par un terminal et d'autres identificateurs uniques à des fins de publicités et contenu personnalisés, mesure de performance des publicités et du contenu, données d’audience et développement de produit.Avec votre consentement, nous et nos partenaires pouvons utiliser des données de géolocalisation précises et analyser activement les caractéristiques du terminal pour l’identification.
    "`

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
                    <Button color="white" size="md" className="rounded-full">
                        Connectez-vous
                    </Button>
                </Link>
            </main>
        </div>
    )
}
