import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

// const excludedPaths = [
//     '/signin',
//     '/signup',
//     '/signup_details',
//     '/motdepasse_oublie',
//     '/motdepasse_oublie/reset',
// ];

export const PrivateRoute = () => {
    const accessToken = Cookies.get('accessToken');


    return accessToken ? <Outlet /> : <Navigate to="/signin" />;
    //const isLogged = accessToken ? true : false;
    //const isExcludedPath = excludedPaths.includes(window.location.pathname);
    // if (isExcludedPath) {
    //     return <Outlet />;
    //   } else if (!isLogged) {
    //     return <Navigate to="/signin" />;
    //   } else {
    //     return <Outlet />;
    //   }
};


