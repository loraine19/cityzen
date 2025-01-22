import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthServiceI {
    logOut(): void;
    getTokenExpirationDate(token: string): Date | null;
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
}