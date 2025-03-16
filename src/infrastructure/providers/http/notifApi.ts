//src/infrastructure/api/userApi.tsx
import { Notif } from "../../../domain/entities/Notif";
import { ApiService, ApiServiceI } from "./apiService";



export class NotifApi {

    private readonly dataType: string = 'notifications';
    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService() }

    async getNotifs(page?: number, filter?: string, map?: boolean): Promise<Notif[]> {
        const pageR = page ? `?page=${page}` : `?page=${0}`;
        const filterR = filter ? `&filter=${filter}` : ``;
        const mapR = map ? `&map=${map}` : '';
        console.log('useCase', page, filter, map, `${this.dataType}${pageR}${filterR}${mapR}`)
        return this.api.get(`${this.dataType}${pageR}${filterR}${mapR}`)
    }

    async readNotif(id: number): Promise<Notif> {
        return this.api.put(`${this.dataType}/${id}`)
    }
}

