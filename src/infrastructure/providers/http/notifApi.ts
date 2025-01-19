//src/infrastructure/api/userApi.tsx
import { Notif } from "../../../domain/entities/Notif";
import { Api, useApi } from "./useApi";
import { handleApiCall } from "./useApi";


export class NotifApi {
    private readonly api: Api;
    private readonly dataType: string = 'notifs';

    constructor() { this.api = useApi() }
    async getNotifs(): Promise<Notif[]> {
        return handleApiCall(() => this.api.get(this.dataType));
    }

}

