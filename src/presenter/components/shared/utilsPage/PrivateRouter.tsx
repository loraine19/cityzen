import { Navigate, Outlet } from 'react-router-dom';
import { cryptedCookie } from '../../../../infrastructure/services/cookiService';

export const PrivateRoute = () => {
    const cookies = new cryptedCookie()
    const accessToken = cookies.getItem(import.meta.env.VITE_ACCESS_COOKIE_NAME);
    const refreshToken = cookies.getItem('refresh');
    return accessToken || refreshToken ? <Outlet /> : <Navigate to="/signin?msg=Vous devez vous connecter" />;
};


