import { Component, ReactNode, ErrorInfo } from 'react';
import { AuthHeader } from '../auth/auth.Comps/AuthHeader';
import { Button, Typography } from '@material-tailwind/react';
import { LogOutButton } from '../../common/LogOutBtn';
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
            console.error('retrying...' + this.props.retryCount);
            this.props.onRetry();
        }
        else {
            console.error('load', error, errorInfo, this.props.retryCount);
            this.setState({ hasError: true })
        }
    }
    render() {
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

            return (
                <>
                    <AlertModal values={{

                        handleConfirm: () => { window.location.replace('/') },
                        title: 'Oups... vous êtes inactif depuis trop longtemps ou une erreur s\'est produite',
                        element: <div className="items-center text-center pb-8 flex flex-col gap-4">
                            <Typography
                                variant="h6">
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
                            text: 'Re-connexion', onClick: () => {
                                Cookies.remove('user')
                                Cookies.remove('refreshToken')
                                window.location.replace('/signin')
                            }
                        },
                        isOpen: true,
                        close: () => { window.location.replace('/') }


                    }} />

                    <div className={"Body " + bodyColor}>
                        <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
                            <div className="flex items-center justify-center gap-2">
                            </div>
                            <AuthHeader />
                        </div>
                        <main className="flex items-center gap-8 h-full py-12">
                            <Typography variant="lead" color="blue-gray" className="flex items-center justify-center mt-2">
                                {`Désolé, une erreur s'est produite... `}
                            </Typography>
                            <Button
                                size='lg'
                                onClick={() => window.location.href = '/'}
                                className="LnBtn rounded-full">retour à l' acceuil
                            </Button>
                            <Typography
                                variant="lead"
                                color="blue-gray"
                                className="flex items-center justify-center mt-2">
                                {`ou déconnectez-vous`}
                            </Typography>
                            <LogOutButton />
                        </main>
                    </div>
                </>

            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
