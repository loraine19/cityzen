import { Typography } from "@material-tailwind/react"
import { Icon } from "../../common/IconComp"
import { AlertValues } from "../../../../domain/entities/Error"
import Cookies from "js-cookie"


export const errorValues: AlertValues = {

    handleConfirm: () => { window.location.replace('/') },
    title: 'Désolé, Une erreur s\'est produite',
    element: <div className="items-center text-center pb-8 flex flex-col gap-4">
        <Typography
            variant="h6"
            color="blue-gray">
            Veuillez réessayer de recharger la page
        </Typography>

        <Icon
            bg
            fill
            style='flex-0 !pb-2 shadow-orange shadow-md '
            icon="sync_problem"
            size="4xl"
            color="orange"
            onClick={() => window.location.reload()} />
        <Typography
            color="blue-gray">
            Si le problème persiste, vous pouvez retourner à la page d'accueil<br></br>
            ou vous pouvez vous re-connecter
        </Typography>


    </div>,
    confirmString: 'Retour à l\'accueil',
    disableConfirm: false,
    button2: {
        text: 'Déconnexion', onClick: () => {
            Cookies.remove('user')
            window.location.replace('/signin')
        }
    },
    isOpen: true,

}