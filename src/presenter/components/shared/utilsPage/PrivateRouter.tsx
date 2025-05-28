import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../../../application/stores/user.store';

export const PrivateRoute = () => {
    const { isLoggedIn, user } = useUserStore((state) => state);

    return (!isLoggedIn && !user && !window.location.pathname.includes('/sign')) ?
        <Navigate to="/signin?msg=Vous n'etes pas connecté" /> :
        <Outlet />
};


