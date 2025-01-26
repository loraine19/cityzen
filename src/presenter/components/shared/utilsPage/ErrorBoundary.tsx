import { Component, ReactNode, ErrorInfo } from 'react';
import { AuthHeader } from '../auth/auth.Comps/AuthHeader';
import { Button, Typography } from '@material-tailwind/react';
import NavBarBottom from '../../common/NavBarBottom';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="Body gray">
                    <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
                        <div className="flex items-center justify-center gap-2">
                        </div>
                        <AuthHeader />
                    </div>
                    <main className="flex items-center justify-evenly h-full py-10">
                        <Typography variant="lead" color="blue-gray" className="flex items-center justify-center mt-2">
                            {`Désolé, une erreur s'est produite... `}
                        </Typography>
                        <Button onClick={() => window.location.href = '/'} className="lnBtn rounded-2xl">retour à l' acceuil</Button>
                    </main>
                    <NavBarBottom addBtn={false} />
                </div>)
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
