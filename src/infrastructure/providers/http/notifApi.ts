//src/infrastructure/api/userApi.tsx
import { Notif } from "../../../domain/entities/Notif";
import { ApiService, ApiServiceI } from "./apiService";



export class NotifApi {

    private readonly dataType: string = 'notifs';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }
    async getNotifs(): Promise<Notif[]> {
        console.log(await this.api.get(this.dataType))
        return this.api.get(this.dataType)
    }
}

