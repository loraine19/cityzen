///src/infrastructure/providers/http/authApi.ts
import { MessageBack } from "../../../domain/entities/frontEntities";
import { ResetDTO } from "../../DTOs/AuthDTO";
import { ApiServiceI, ApiService } from "./apiService";


export class ResetPasswordApi {
    private readonly dataType: string = 'reset-password';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async resetPassword(email: string): Promise<MessageBack> {
        return this.api.post(this.dataType, { email })
    }

    async resetPasswordUpdate(data: ResetDTO): Promise<MessageBack> {
        console.log('resetPasswordApi', data)
        return this.api.post(`${this.dataType}/update`, data)
    }
}
