import { jwtDecode } from "jwt-decode";
import { cryptedStorage, cryptedStorageI } from "./storageService";

interface AuthServiceI {
    logOut(): void;
    getTokenExpirationDate(token: string): Date | null;
    saveToken(accesToken: string, refreshtoken: string): void;
}
export class AuthService implements AuthServiceI {
    private storage: cryptedStorageI;

    constructor() {
        this.storage = new cryptedStorage();
    }

    logOut = () => {
        this.storage.removeItem('access');
        this.storage.removeItem('refresh');
        window.location.replace('/signin');
    }

    getTokenExpirationDate = (token: string): Date | null => {
        const decoded: any = jwtDecode(token);
        if (!decoded.exp) { console.log('decoded exp not found', decoded) }
        return new Date(decoded.exp * 1000);
    }

    saveToken = (accessToken: string, refreshToken: string) => {
        this.storage.setItem('access', accessToken);
        this.storage.setItem('refresh', refreshToken);
    }
}