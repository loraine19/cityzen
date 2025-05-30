import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../../../application/stores/user.store';
import { cryptedCookie } from '../../../../infrastructure/services/cookiService';
import { useEffect, useState } from 'react';
import { LoadingPage } from './LoadingPage';

export const PrivateRoute = () => {
    const cryptedStorage = new cryptedCookie();
    const { isLoggedIn, user } = useUserStore((state) => state)
    const userJson = JSON.parse(cryptedStorage.getItem('user'))
    const state = userJson?.state ?? null;

    const userName = user?.Profile?.firstName ?? 'Bonjour'

    if (isLoggedIn || state?.isLoggedIn || window.location.pathname.includes('/sign')) {
        return <Outlet />;
    }

    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShouldRedirect(true), 3000); // 3s delay
        return () => clearTimeout(timer);
    }, []);

    if (!shouldRedirect) {
        return <LoadingPage />;
    }

    return <Navigate to={`/signin?msg=${userName}, vous n'etes pas connecté `} />;
};


