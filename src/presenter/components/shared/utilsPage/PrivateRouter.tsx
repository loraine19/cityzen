import { Navigate, Outlet } from 'react-router-dom';
import { cryptedCookie } from '../../../../infrastructure/services/cookiService';

export const PrivateRoute = () => {
    const cookies = new cryptedCookie()
    const refreshToken = cookies.getItem('refresh');
    return refreshToken ?
        <Outlet /> :
        <Navigate to="/signin?msg=Vous devez vous connecter pour accéder au service" />;
};


