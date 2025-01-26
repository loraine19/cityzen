import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { dayMS } from "../../domain/entities/frontEntities";

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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace('/signin');
    }

    getTokenExpirationDate = (token: string): Date | null => {
        const decoded: any = jwtDecode(token);
        if (!decoded.exp) { console.log('decoded exp not found', decoded) }
        return new Date(decoded.exp * 1000);
    }

    saveToken = (accessToken: string, refreshToken: string) => {
        const expirationDateAccess = this.getTokenExpirationDate(accessToken) || new Date(Date.now() + 7 * dayMS);
        const expirationDateRefresh = this.getTokenExpirationDate(refreshToken) || new Date(Date.now() + 7 * dayMS);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        Cookies.set('accessToken', accessToken, { expires: expirationDateAccess });
        Cookies.set('refreshToken', refreshToken, { expires: expirationDateRefresh });
    }
}