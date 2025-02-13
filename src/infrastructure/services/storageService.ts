import CryptoJS from 'crypto-js'

export interface cryptedStorageI {
    getItem(name: string): any;
    setItem(name: string, value: any): void;
    removeItem(name: string): void;
    clear(): void;
}

const secretKey = import.meta.env.VITE_STORE_KEY as string;
export class cryptedStorage implements cryptedStorageI {

    constructor() { }

    private encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    private decrypt(data: string): string {
        const bytes = CryptoJS.AES.decrypt(data, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getItem(name: string): any {
        const data = localStorage.getItem(name);
        if (data) {
            return JSON.parse(this.decrypt(data));
        }
        return null;
    }

    setItem(name: string, value: any): void {
        const data = this.encrypt(JSON.stringify(value));
        localStorage.setItem(name, data);
    }

    removeItem(name: string): void {
        localStorage.removeItem(name);
    }

    clear(): void {
        localStorage.clear();
    }
}

