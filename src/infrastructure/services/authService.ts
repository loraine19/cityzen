import { jwtDecode } from "jwt-decode";
import { cryptedCookie, cryptedCookieI } from "./cookiService";

interface AuthServiceI {
    // logOut(): void;
    getTokenExpirationDate(token: string): Date | null;
    getRefreshToken(): string;
    saveToken(refreshtoken: string): void;
}
export class AuthService implements AuthServiceI {
    private storage: cryptedCookieI;

    constructor() {
        this.storage = new cryptedCookie();
    }

    getTokenExpirationDate = (token: string): Date | null => {
        const decoded: any = jwtDecode(token);
        if (!decoded.exp) { console.log('decoded exp not found', decoded) }
        return new Date(decoded.exp * 1000);
    }

    getRefreshToken = (): string => {
        return this.storage.getItem('refresh') || '';
    }

    saveToken = (refreshToken: string): boolean => {
        this.storage.setItem('refresh', refreshToken);
        const token = this.storage.getItem('refresh');
        if (token === refreshToken) return true;
        else return false


    }

    clearCookies = () => {
        this.storage.clear();
    }
}