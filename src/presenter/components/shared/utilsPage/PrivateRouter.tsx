import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../../../application/stores/user.store';

export const PrivateRoute = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    return (!isLoggedIn && !window.location.pathname.includes('/sign')) ?
        <Navigate to="/signin?msg=Veuillez vous re-connecter" /> :
        <Outlet />
};


