import { useFormik } from 'formik';
import { bool, object, string, ref } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from '../../components/authComps/AuthForm';
import { user } from '../../types/user';
import { AuthHeader } from '../../components/authComps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';



export default function SignUpPage() {
    interface newuser extends user {
        passwordConfirm: string
    }

    const [newUser, setNewUser] = useState<newuser>({
        id: 0,
        email: "",
        password: "",
        acceptTerms: false,
        stayConnected: false,
        passwordConfirm: ""
    });
    const navigate = useNavigate();

    const [notif, setNotif] = useState<string>("");

    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligatoire").min(8, "minmum 8 lettres"),
        passwordConfirm: string().oneOf([ref('password')], "les mots de passes doivent correspondre").required("Confirmer le mot de passe"),
        acceptTerms: bool().oneOf([true], "vous devez accepter : ").required("Vous devez accepter : ")
    })

    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: values => {
            console.log(values)
            if (values.email && values.password === values.passwordConfirm && values.acceptTerms) {
                navigate("/signup_details")

                setNewUser(values)
            }
            else setNotif("Non enregitsré ")
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
            <main className='items-center gap-4 pb-8'>
                <AuthForm handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                    lead="Creer votre compte"
                    notif={notif}
                    popOverContent={terms}
                    popOverButtonText="les condition d'utilisiation"
                    popOverClass="font-light underline underline-offset-8 text-start "
                    popOverVariant="texte"
                    checkboxName="acceptTerms"
                    submitText="S'enregistrer"
                    errorEmail={formik.errors.email}
                    errorPassword={formik.errors.password}
                    errorCheck={formik.errors.acceptTerms}
                    confirm={true}
                    errorConfirm={formik.errors.passwordConfirm}
                />

                <Typography variant="small" className="mt-6 flex justify-center">
                    Vous avez deja un compte?
                </Typography>
                <Link to="/signin">
                    <Button
                        color="white"
                        size="lg" className="rounded-full"
                    >
                        Connectez-vous
                    </Button>
                </Link>
            </main>
        </div>
    )
}
