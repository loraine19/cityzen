import { Auth } from "../entities/Token";
import { useApi, handleApiCall } from "../../infrastructure/providers/http/UseApi";

const api = useApi();

export interface AuthRepository {
    signIn(credentials: { email: string, password: string }): Promise<Auth>;
    signInVerify(credentials: { email: string, password: string, verifyToken: string }): Promise<Auth>;
    signUp(credentials: { email: string, password: string }): Promise<{ message: string }>;
    resetPassword(email: string): Promise<any>;
    resetPasswordUpdate(email: string, password: string, token: string): Promise<any>;
}

export class AuthService implements AuthRepository {
    async signIn(credentials: { email: string, password: string }): Promise<Auth> {
        return handleApiCall(() => api.post('auth/signin', credentials));
    }

    async signInVerify(credentials: { email: string, password: string, verifyToken: string }): Promise<Auth> {
        return handleApiCall(() => api.post('auth/signin/verify', credentials));
    }

    async signUp(credentials: { email: string, password: string }): Promise<{ message: string }> {
        return handleApiCall(() => api.post('auth/signup', credentials));
    }

    async resetPassword(email: string): Promise<any> {
        return handleApiCall(() => api.post('reset-password', { email }));
    }

    async resetPasswordUpdate(email: string, password: string, token: string): Promise<any> {
        return handleApiCall(() => api.post('reset-password/update', { email, password, token }));
    }
}
