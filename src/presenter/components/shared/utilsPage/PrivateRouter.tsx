import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    return accessToken || refreshToken ? <Outlet /> : <Navigate to="/signin?msg=Vous devez vous connecter" />;
};


