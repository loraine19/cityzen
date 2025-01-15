import { useState } from 'react';
import Cookies from 'js-cookie';
import { getTokenExpirationDate } from '../../infrastructure/services/authService';


export const useToken = () => {
    const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
    const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken'));
    const saveToken = (accesToken: string, refreshtoken: string) => {
        const accessToken = accesToken;
        const refreshToken = refreshtoken
        const expirationDateAccess = getTokenExpirationDate(accessToken) || new Date();
        const expirationDateRefresh = getTokenExpirationDate(refreshToken) || new Date();
        localStorage.setItem('accessToken', expirationDateAccess.toString());
        localStorage.setItem('refreshToken', expirationDateRefresh.toString());
        Cookies.set('accessToken', accesToken, { expires: expirationDateAccess });
        Cookies.set('refreshToken', refreshToken, { expires: expirationDateRefresh });
        setAccessToken(accesToken);
        setRefreshToken(refreshtoken)
    };
    return { accessToken, refreshToken, saveToken };
};