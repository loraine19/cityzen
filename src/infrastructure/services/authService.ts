import { jwtDecode } from "jwt-decode";
import { cryptedStorage, cryptedStorageI } from "./storageService";

interface AuthServiceI {
    // logOut(): void;
    getTokenExpirationDate(token: string): Date | null;
    getRefreshToken(): string;
    saveToken(refreshtoken: string): void;
}
export class AuthService implements AuthServiceI {
    private storage: cryptedStorageI;

    constructor() {
        this.storage = new cryptedStorage();
    }

    // logOutSe = () => {
    //     this.storage.removeItem('refresh');
    //     window.location.replace('/signin');
    // }

    getTokenExpirationDate = (token: string): Date | null => {
        const decoded: any = jwtDecode(token);
        if (!decoded.exp) { console.log('decoded exp not found', decoded) }
        return new Date(decoded.exp * 1000);
    }

    getRefreshToken = (): string => this.storage.getItem('refresh')

    saveToken = (refreshToken: string) => {
        this.storage.setItem('refresh', refreshToken);
    }
}