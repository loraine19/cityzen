///src/infrastructure/providers/http/authApi.ts
import { Auth } from "../../../domain/entities/Auth";
import { AccessDTO, DeleteDTO, VerifyDTO } from "../../DTOs/AuthDTO";
import { ApiServiceI, ApiService } from "./apiService";


export class AuthApi {
    private readonly dataType: string = 'auth';
    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async signIn(credentials: AccessDTO): Promise<Auth> {
        return this.api.post(`${this.dataType}/signin`, credentials)
    }

    async signInVerify(data: VerifyDTO): Promise<Auth> {
        console.log('verifyDataAPI', data, await this.api.post(`${this.dataType}/signinVerify`, data))
        return this.api.post(`${this.dataType}/signinVerify`, data)
    }

    async signUp(credentials: AccessDTO): Promise<{ message: string }> {
        return this.api.post(`${this.dataType}/signup`, credentials)
    }

    async deleteAccount(): Promise<{ message: string }> {
        return this.api.post(`${this.dataType}/deleteAccount`, {})
    }

    async deleteAccountConfirm(data: DeleteDTO): Promise<{ message: string }> {
        return this.api.post(`${this.dataType}/deleteAccountConfirm`, data)
    }

}
