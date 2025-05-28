import { Component, ReactNode, ErrorInfo } from 'react';
import { AuthHeader } from '../auth/auth.Comps/AuthHeader';
import { Typography } from '@material-tailwind/react';
import { PathElement } from '../../../constants';
import { AlertModal } from '../../common/AlertModal';
import Cookies from 'js-cookie';
import { Icon } from '../../common/IconComp';

interface ErrorBoundaryProps {
    children: ReactNode;
    retryCount: number;
    onRetry: () => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps & { retryCount: number, onRetry: () => void }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (this.props.retryCount < 3) {
            this.setState({ error });
            console.error('retrying...' + this.props.retryCount, error.message);
            this.props.onRetry();
        }
        else {
            console.error('load', error, errorInfo, this.props.retryCount);
            this.setState({ hasError: true })
        }
    }


    render() {

        const errorMessage = this.state.error?.message;
        if (this.state.hasError) {
            const path = window.location.pathname
            let bodyColor: string;
            switch (true) {
                case path.includes(PathElement.SERVICE) || path.includes(PathElement.EVENT):
                    bodyColor = 'cyan';
                    break;
                case path.includes(PathElement.POST) || path.includes(PathElement.SURVEY) || path.includes(PathElement.POOL) || path.includes(PathElement.VOTE):
                    bodyColor = 'orange';
                    break;
                default:
                    bodyColor = 'gray';
            }

            // Function to determine the current section from the URL
            function getSectionFromPath(path: string): string | null {
                const sections = [
                    PathElement.SERVICE,
                    PathElement.EVENT,
                    PathElement.POST,
                    PathElement.SURVEY,
                    PathElement.POOL,
                    PathElement.VOTE
                ];
                for (const section of sections) {
                    if (path.includes(section + '/')) {
                        return section;
                    }
                }
                return null;
            }
            const pathBack = getSectionFromPath(path) || '';

            const alertValues = {
                handleConfirm: () => { window.location.replace('/') },
                title: errorMessage ?? 'Oups... vous êtes inactif depuis trop longtemps ou une erreur s\'est produite',
                element: <div className="items-center text-center pb-8 flex flex-col gap-4">
                    <Typography
                        variant="lead">
                        Vous pouvez essayer de recharger la page
                    </Typography>

                    <Icon
                        bg
                        fill
                        style='flex-0 !pb-2 shadow-orange shadow-md '
                        icon="sync_problem"
                        size="4xl"
                        color="orange"
                        onClick={() => window.location.reload()} />
                    <Typography>
                        Si le problème persiste, vous pouvez retourner à la page d'accueil<br></br>
                        ou vous pouvez vous re-connecter
                    </Typography>
                </div>,
                confirmString: 'Retour à l\'accueil',
                disableConfirm: true,
                button2: {
                    text: 'Déconnexion', onClick: () => {
                        Cookies.remove('user')
                        Cookies.remove('refreshToken')
                        window.location.replace('/signin')
                    }
                },
                isOpen: true,
                close: () => { window.location.replace('/') }
            }

            const errorAlertValues = {
                isOpen: true,
                handleConfirm: () => { window.location.replace('/') },
                title: 'Une erreur s\'est produite',
                element: <div className="items-center text-center pb-8 flex flex-col gap-4">
                    <Typography
                        variant="lead">
                        {errorMessage ?? 'Une erreur inconnue s\'est produite'},
                    </Typography>
                    {pathBack && <>
                        <Icon
                            bg
                            fill
                            style='flex-0 !pb-2 shadow-orange shadow-md '
                            icon="undo"
                            size="4xl"
                            color="orange"
                            onClick={() => window.location.replace(`/${pathBack}`)} />
                        <Typography>
                            Vous pouvez retourner à la page précédente {pathBack}
                        </Typography></>}
                </div>,
                confirmString: 'Retour à l\'accueil',
                disableConfirm: true,
                button2: {
                    text: 'Déconnexion', onClick: () => {
                        Cookies.remove('user')
                        Cookies.remove('refreshToken')
                        window.location.replace('/signin')
                    }
                },
            }

            return (
                <>
                    <AlertModal values={!errorMessage ? alertValues : errorAlertValues} />


                    <div className={"Body " + bodyColor}>
                        <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
                            <div className="flex items-center justify-center gap-2">
                            </div>
                            <AuthHeader />
                        </div>
                        <main
                            className="flex items-center gap-8 h-full py-12">

                        </main>
                    </div>
                </>

            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
