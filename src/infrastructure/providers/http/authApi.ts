///src/infrastructure/providers/http/authApi.ts
import { AccessDTO, Auth } from "../../../domain/entities/Auth";
import { Api, useApi } from "./UseApi";
import { handleApiCall } from "./utilsApi";

export class AuthApi {
    private readonly api: Api;
    private readonly dataType: string = 'auth';

    constructor() { this.api = useApi() }
    async signIn(credentials: AccessDTO): Promise<Auth> {
        return handleApiCall(() => this.api.post(`${this.dataType}/signin`, credentials));
    }

    async signInVerify(data: { email: string, password: string, verifyToken: string }): Promise<Auth> {
        console.log('verifyToken', data.verifyToken);
        return handleApiCall(() => this.api.post(`${this.dataType}/signin/verify`, data));
    }

    async signUp(credentials: AccessDTO): Promise<{ message: string }> {
        return handleApiCall(() => this.api.post(`${this.dataType}/signup`, credentials));
    }

}
