import sjcl from 'sjcl';

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
        return JSON.stringify(sjcl.encrypt(secretKey, data));
    }

    private decrypt(data: string): string {
        return sjcl.decrypt(secretKey, data);
    }

    getItem(name: string): any {
        const data = sessionStorage.getItem(name);
        if (data) {
            return JSON.parse(this.decrypt(data));
        }
        return null;
    }

    setItem(name: string, value: any): void {
        const data = this.encrypt(JSON.stringify(value));
        sessionStorage.setItem(name, data);
    }

    removeItem(name: string): void {
        sessionStorage.removeItem(name);
    }

    clear(): void {
        sessionStorage.clear();
    }
}
