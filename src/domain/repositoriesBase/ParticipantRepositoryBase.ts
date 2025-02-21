import { ParticipantDTO } from "../../infrastructure/DTOs/ParticipantDTO";
import { Participant } from "../entities/Participant";


export interface ParticipantRepositoryBase {
    getParticipants: () => Promise<Participant[]>;
    postParticipant: (participant: ParticipantDTO) => Promise<Participant>;
    deleteParticipant: (eventId: number) => Promise<void>;
}


