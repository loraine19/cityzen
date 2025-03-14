//src/infrastructure/api/userApi.tsx
import { Notif } from "../../../domain/entities/Notif";
import { ApiService, ApiServiceI } from "./apiService";



export class NotifApi {

    private readonly dataType: string = 'notifications';
    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService() }

    async getNotifs(page?: number, filter?: string): Promise<Notif[]> {
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        return this.api.get(`${this.dataType}${pageR}${filterR}`)
    }

    async readNotif(id: number): Promise<Notif> {
        return this.api.put(`${this.dataType}/${id}`)
    }
}

