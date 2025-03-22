//src/infrastructure/api/userApi.tsx
import { Message } from "../../../domain/entities/Message";
import { Notif } from "../../../domain/entities/Notif";
import { ApiService, ApiServiceI } from "./apiService";



export class MessageApi {

    private readonly dataType: string = 'messages';
    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService() }

    async getMessages(): Promise<Message[]> {
        return this.api.get(`${this.dataType}`)
    }

    async getConversation(withId: number, page?: number): Promise<Message[]> {
        const pageR = page ? `?page=${page}` : '?page=0';
        return this.api.get(`${this.dataType}/conversation/${withId}${pageR}`)
    }

    async readMessage(id: number): Promise<Notif> {
        return this.api.put(`${this.dataType}/${id}`)
    }

    async readConversation(withId: number): Promise<Message[]> {
        return this.api.patch(`${this.dataType}/readConverstaion/${withId}`)
    }
}

