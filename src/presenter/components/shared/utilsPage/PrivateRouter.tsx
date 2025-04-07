import { Navigate, Outlet } from 'react-router-dom';
import { cryptedCookie } from '../../../../infrastructure/services/cookiService';

export const PrivateRoute = () => {
    const cookies = new cryptedCookie()
    const user = cookies.getItem('user');
    return user ?
        <Outlet /> :
        <Navigate to="/signin?msg=Vous devez vous connecter pour accéder au service" />;
};


