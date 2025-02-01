//src/infrastructure/providers/http/participantApi.ts

import { Participant, ParticipantDTO } from "../../../domain/entities/Participant";
import { ApiServiceI, ApiService } from "./apiService";


export class ParticipantApi {
    private readonly dataType: string = 'participants';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getParticipants(): Promise<Participant[]> {
        return this.api.get(this.dataType)
    }

    async postParticipant(dataDTO: ParticipantDTO): Promise<Participant> {
        return this.api.post(this.dataType, dataDTO)
    }

    async deleteParticipant(eventId: number): Promise<void> {
        return this.api.delete(`${this.dataType}/event${eventId}`)
    }

}