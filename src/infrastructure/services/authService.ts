import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthServiceI {
    logOut(): void;
    getTokenExpirationDate(token: string): Date | null;
    saveToken(accesToken: string, refreshtoken: string): void;
}
export class AuthService implements AuthServiceI {

    constructor() { }
    logOut = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.replace('/signin');
    }

    getTokenExpirationDate = (token: string): Date | null => {
        const decoded: any = jwtDecode(token);
        if (!decoded.exp) { console.log('decoded exp not found', decoded) }
        return new Date(decoded.exp * 1000);
    }

    saveToken = (accesToken: string, refreshtoken: string) => {
        const accessToken = accesToken;
        const refreshToken = refreshtoken
        const expirationDateAccess = this.getTokenExpirationDate(accessToken) || new Date();
        const expirationDateRefresh = this.getTokenExpirationDate(refreshToken) || new Date();
        localStorage.setItem('accessToken', expirationDateAccess.toString());
        localStorage.setItem('refreshToken', expirationDateRefresh.toString());
        Cookies.set('accessToken', accesToken, { expires: expirationDateAccess });
        Cookies.set('refreshToken', refreshToken, { expires: expirationDateRefresh });
    }
}