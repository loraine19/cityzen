export class Error {
    message?: string;
    code?: number;

    constructor(data?: any) {
        console.log('data', data);
        this.message = data?.message || 'erreur inconnue';
        this.code = data?.code || 500;
    }
}
// 