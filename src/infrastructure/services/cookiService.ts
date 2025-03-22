// src/infrastructure/services/cookiService.ts
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

export interface CryptedCookieOptions {
    secure?: boolean;  // HTTPS only
    httpOnly?: boolean; // Inaccessible to JavaScript (mitigates XSS) -- Generally NOT used on the frontend
    sameSite?: 'strict' | 'lax' | 'none'; // CSRF protection
    domain?: string;
    path?: string;
    expires?: number | Date; // Expiration in days (number) or a specific Date
}

export interface cryptedCookieI {
    getItem(name: string): any;
    setItem(name: string, value: any, options?: CryptedCookieOptions): void;
    removeItem(name: string, options?: CryptedCookieOptions): void;
    clear(): void; // Note: clear() will only clear cookies created by *this* instance, with the given options.
}

const secretKey = import.meta.env.VITE_STORE_KEY as string;
const secure = import.meta.env.PROD ? true : false;
const domain = import.meta.env.PROD ? import.meta.env.VITE_DOMAIN : import.meta.env.VITE_DOMAIN_DEV;

export class cryptedCookie implements cryptedCookieI {
    private options: CryptedCookieOptions;

    constructor(options: CryptedCookieOptions = {}) {
        this.options = {
            secure: secure,
            // httpOnly: true, // Generally NOT used on the frontend, as JS needs to access the cookie
            sameSite: 'strict',
            path: '/',
            domain: domain,
            ...options,
        };
    }

    private encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    private decrypt(data: string): string {
        const bytes = CryptoJS.AES.decrypt(data, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getItem(name: string): any | null {
        const data = Cookies.get(name);
        if (data) {
            try {
                return JSON.parse(this.decrypt(data));
            } catch (error) {
                console.error("Error decrypting or parsing cookie:", error);
                return null;
            }
        }
        return null;
    }

    setItem(name: string, value: any, options: CryptedCookieOptions = {}): void {
        const mergedOptions = { ...this.options, ...options };
        const data = this.encrypt(JSON.stringify(value));
        Cookies.set(name, data, {
            expires: mergedOptions.expires, // Use combined options
            path: mergedOptions.path,
            domain: mergedOptions.domain,
            secure: mergedOptions.secure,
            sameSite: mergedOptions.sameSite
        });
    }

    removeItem(name: string, options: CryptedCookieOptions = {}): void {
        const mergedOptions = { ...this.options, ...options };
        Cookies.remove(name, {
            path: mergedOptions.path,
            domain: mergedOptions.domain,
            secure: mergedOptions.secure,
            sameSite: mergedOptions.sameSite
        });
    }

    clear(): void {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this.removeItem(name.trim())
        }
    }
}