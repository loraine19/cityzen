///src/infrastructure/providers/http/authApi.ts
import { ResetDTO } from "../../../domain/entities/Auth";
import { MessageBack } from "../../../domain/entities/frontEntities";
import { Api, useApi } from "./UseApi";
import { handleApiCall } from "./utilsApi";

export class ResetPasswordApi {
    private readonly api: Api;
    private readonly dataType: string = 'reset-password';

    constructor() { this.api = useApi() }

    async resetPassword(email: string): Promise<MessageBack> {
        return handleApiCall(() => this.api.post(this.dataType, { email }));
    }

    async resetPasswordUpdate(dataDTO: ResetDTO): Promise<MessageBack> {
        console.log('resetPasswordApi', dataDTO)
        return handleApiCall(() => this.api.post(`${this.dataType}/update`, dataDTO));
    }
}
