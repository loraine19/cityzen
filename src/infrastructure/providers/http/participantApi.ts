//src/infrastructure/providers/http/participantApi.ts
import { useApi, handleApiCall, Api } from "./UseApi";
import { Participant, ParticipantDTO } from "../../../domain/entities/Participant";

export class ParticipantApi {
    private readonly api: Api;
    private readonly dataType: string = 'participants';

    constructor() { this.api = useApi() }

    async getParticipants(): Promise<Participant[]> {
        return handleApiCall(() => this.api.get(this.dataType));
    }

    async postParticipant(dataDTO: ParticipantDTO): Promise<Participant> {
        return handleApiCall(() => this.api.post(this.dataType, dataDTO))
    }

    async deleteParticipant(eventId: number): Promise<void> {
        console.log('eventId', eventId)
        return handleApiCall(() => this.api.delete(`${this.dataType}/event${eventId}`));
    }

}