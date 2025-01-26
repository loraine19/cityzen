import { Participant, ParticipantDTO } from "../entities/Participant";


export interface ParticipantRepositoryBase {
    getParticipants: () => Promise<Participant[]>;
    postParticipant: (participant: ParticipantDTO) => Promise<Participant>;
    deleteParticipant: (eventId: number) => Promise<void>;
}


