//src/infrastructure/api/userApi.tsx
import { Notif } from "../../../domain/entities/Notif";
import { Api, useApi } from "./UseApi";
import { handleApiCall } from "./utilsApi";


export class NotifApi {
    private readonly api: Api;
    private readonly dataType: string = 'notifs';

    constructor() { this.api = useApi() }
    async getNotifs(): Promise<Notif[]> {
        const response = await handleApiCall(() => this.api.get(this.dataType));
        return response
    }
}

