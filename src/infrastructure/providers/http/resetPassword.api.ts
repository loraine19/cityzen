///src/infrastructure/providers/http/authApi.ts
import { ResetDTO } from "../../../domain/entities/Auth";
import { MessageBack } from "../../../domain/entities/frontEntities";
import { ApiServiceI, ApiService } from "./UseApi";


export class ResetPasswordApi {
    private readonly dataType: string = 'reset-password';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async resetPassword(email: string): Promise<MessageBack> {
        return this.api.post(this.dataType, { email })
    }

    async resetPasswordUpdate(dataDTO: ResetDTO): Promise<MessageBack> {
        console.log('resetPasswordApi', dataDTO)
        return this.api.post(`${this.dataType}/update`, dataDTO)
    }
}
