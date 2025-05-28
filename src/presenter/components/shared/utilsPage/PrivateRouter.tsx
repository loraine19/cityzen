import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../../../application/stores/user.store';

export const PrivateRoute = () => {
    const { isLoggedIn, user } = useUserStore((state) => state)
    const userName = user?.Profile?.firstName ?? 'Bonjour'

    return (!isLoggedIn && !window.location.pathname.includes('/sign')) ?
        <Navigate to={`/signin?msg=${userName}, vous n'etes pas connecté `} /> :
        <Outlet />
};


