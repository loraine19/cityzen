import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export const logOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.replace('/signin');
}

export const getTokenExpirationDate = (token: string): Date | null => {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) { console.log('decoded exp not found', decoded) }
    return new Date(decoded.exp * 1000);
};