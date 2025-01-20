///src/infrastructure/providers/http/authApi.ts
import { Auth, ResetDTO } from "../../../domain/entities/Auth";
import { Api, useApi } from "./UseApi";
import { handleApiCall } from "./utilsApi";

export class ResetPasswordApi {
    private readonly api: Api;
    private readonly dataType: string = 'reset-password';

    constructor() { this.api = useApi() }

    async resetPassword(email: string): Promise<{ message: string }> {
        return handleApiCall(() => this.api.post(this.dataType, { email }));
    }

    async resetPasswordUpdate(dataDTO: ResetDTO): Promise<Auth> {
        return handleApiCall(() => this.api.post(`${this.dataType}/update`, dataDTO));
    }
}
