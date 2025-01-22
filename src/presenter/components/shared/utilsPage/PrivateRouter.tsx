import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PrivateRoute = () => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    return accessToken || refreshToken ? <Outlet /> : <Navigate to="/signin?msg=Vous devez vous connecter" />;
};


