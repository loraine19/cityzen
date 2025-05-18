import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../../../application/stores/user.store';

export const PrivateRoute = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    return isLoggedIn ?
        <Outlet /> :
        <Navigate to="/signin?msg=Vous devez vous connecter pour accéder au service ..." />;
};


