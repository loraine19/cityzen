import { Component, ReactNode, ErrorInfo } from 'react';
import { AuthHeader } from '../auth/auth.Comps/AuthHeader';
import { Button, Typography } from '@material-tailwind/react';
import { ConfirmModal } from '../../common/ConfirmModal';
import { LogOutButton } from '../../common/LogOutBtn';

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
            let bodyColor = 'defaultColor';
            if (path.includes('service') || path.includes('evenemen')) {
                bodyColor = 'cyan';
            }
            else if (path.includes('annonce') || path.includes('sondage') || path.includes('cagnotte') || path.includes('litige')) {
                bodyColor = 'orange'
            }
            else bodyColor = 'gray'

            let open = true

            return (
                <>
                    <ConfirmModal
                        open={true}
                        handleOpen={() => open = !open}
                        handleConfirm={() => { window.location.reload(); open = !open }}
                        handleCancel={() => window.location.href = '/'} title={'Désolé, Une erreur s\'est produite'} element={'Cliquer confirm pour reessayer, ou cliquer sur annuler pour revenir à l\'acceuil'} />

                    <div className={"Body " + bodyColor}>
                        <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
                            <div className="flex items-center justify-center gap-2">
                            </div>
                            <AuthHeader />
                        </div>
                        <main className="flex items-center justify-evenly h-full py-10">
                            <Typography variant="lead" color="blue-gray" className="flex items-center justify-center mt-2">
                                {`Désolé, une erreur s'est produite... `}
                            </Typography>
                            <Button size='lg' onClick={() => window.location.href = '/'} className="LnBtn rounded-full">retour à l' acceuil</Button>
                            <Typography variant="lead" color="blue-gray" className="flex items-center justify-center mt-2">
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
