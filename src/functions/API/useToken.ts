import { useState } from 'react';
import Cookies from 'js-cookie';

export const useToken = () => {
    const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
    const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken'));

    const saveToken = (accesToken: string, refreshtoken: string) => {
        Cookies.set('accessToken', accesToken, { expires: 7 });
        Cookies.set('refreshToken', refreshtoken, { expires: 7 });
        setAccessToken(accesToken);
        setRefreshToken(refreshtoken)
    };

    return { accessToken, refreshToken, saveToken };
};