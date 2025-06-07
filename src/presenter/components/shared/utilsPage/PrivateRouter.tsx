import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../../../application/stores/user.store';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const PrivateRoute = () => {
    const { isLoggedIn, user, setIsLoggedIn, fetchUser } = useUserStore((state) => state)
    const isLoggedCookie = Cookies.get('isLogged');
    const isLogged = isLoggedCookie === 'true' ? true : false
    if (typeof isLogged === 'boolean' && (isLoggedIn !== isLogged)) setIsLoggedIn(isLogged);


    useEffect(() => {
        console.log('PrivateRoute user:', user);
        if (!user || !user.id)
            fetchUser().catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, [user]);

    const userName = user?.Profile?.firstName ?? 'Bonjour'
    if (!isLoggedIn && !isLogged) {
        return <Navigate to={`/signin?msg=${userName}, vous n'etes pas connecté`} />;
    }
    return <Outlet />;
};


