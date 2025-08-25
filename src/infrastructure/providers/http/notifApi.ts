//src/infrastructure/api/userApi.tsx
import { Notif, NotifPage } from "../../../domain/entities/Notif";
import { ApiService, ApiServiceI } from "./apiService";



export class NotifApi {

    private readonly dataType: string = 'notifications';
    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService() }

    async getNotifs(page?: number, filter?: string, map?: boolean): Promise<NotifPage> {
        const pageR = page ? `?page=${page}` : `?page=${0}`;
        const filterR = filter ? `&filter=${filter}` : ``;
        const mapR = map ? `&map=${map}` : '';
        return this.api.get(`${this.dataType}${pageR}${filterR}${mapR}`)
    }

    async readNotif(id: number): Promise<Notif> {
        return this.api.put(`${this.dataType}/${id}`)
    }

    async readAllNotif(): Promise<Notif> {
        return this.api.put(`${this.dataType}/all`)
    }
}

