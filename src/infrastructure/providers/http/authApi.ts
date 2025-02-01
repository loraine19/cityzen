///src/infrastructure/providers/http/authApi.ts
import { AccessDTO, Auth } from "../../../domain/entities/Auth";
import { ApiServiceI, ApiService } from "./apiService";


export class AuthApi {
    private readonly dataType: string = 'auth';
    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async signIn(credentials: AccessDTO): Promise<Auth> {
        return this.api.post(`${this.dataType}/signin`, credentials)
    }

    async signInVerify(data: { email: string, password: string, verifyToken: string }): Promise<Auth> {
        return this.api.post(`${this.dataType}/signin/verify`, data)
    }

    async signUp(credentials: AccessDTO): Promise<{ message: string }> {
        return this.api.post(`${this.dataType}/signup`, credentials)
    }

}
