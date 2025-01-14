import { Participant, ParticipantDTO } from "../../domain/entities/Participant";
import { handleApiCall, useApi } from "../../api/useApi";

const api = useApi();
const dataType = "participants";

export interface ParticipantRepository {
    getParticipants: () => Promise<Participant[]>;
    getParticipantsByEvent: (eventId: number) => Promise<Participant[]>;
    postParticipant: (participant: ParticipantDTO) => Promise<Participant>;
    patchParticipant: (id: number, participant: ParticipantDTO) => Promise<Participant>;
    deleteParticipant: (eventId: number) => Promise<Participant>;
    deleteParticipantWoReq: (userId: number, eventId: number) => Promise<Participant>;
}

export class ParticipantService implements ParticipantRepository {
    async getParticipants(): Promise<Participant[]> {
        return handleApiCall(() => api.get(dataType));
    }

    async getParticipantsByEvent(eventId: number): Promise<Participant[]> {
        return handleApiCall(() => api.get(`${dataType}/event/${eventId}`));
    }

    async postParticipant(participant: ParticipantDTO): Promise<Participant> {
        return handleApiCall(() => api.post(dataType, participant));
    }

    async patchParticipant(id: number, participant: ParticipantDTO): Promise<Participant> {
        return handleApiCall(() => api.patch(`${dataType}/${id}`, participant));
    }

    async deleteParticipant(eventId: number): Promise<Participant> {
        return handleApiCall(() => api.delete(`${dataType}/event${eventId}`));
    }
    async deleteParticipantWoReq(userId: number, eventId: number): Promise<Participant> {
        return handleApiCall(() => api.delete(`${dataType}/user${userId}/event${eventId}`));
    }
}
