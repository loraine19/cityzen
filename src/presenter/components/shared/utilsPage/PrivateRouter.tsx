import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../../../application/stores/user.store';
import Cookies from 'js-cookie';

export const PrivateRoute = () => {
    const { isLoggedIn, user, setIsLoggedIn } = useUserStore((state) => state)
    const isLoggedCookie = Cookies.get('isLogged');
    const isLogged = isLoggedCookie === 'true' ? true : false
    if (typeof isLogged === 'boolean' && (isLoggedIn !== isLogged)) setIsLoggedIn(isLogged);

    const userName = user?.Profile?.firstName ?? 'Bonjour'
    if (!isLoggedIn && !isLogged) {
        return <Navigate to={`/signin?msg=${userName}, vous n'etes pas connecté ${isLoggedIn} ${isLogged}`} />;
    }
    return <Outlet />;
};


