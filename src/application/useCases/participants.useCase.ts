//rc/application/useCases/participantCase.ts/participants.useCase.ts

import { Participant, ParticipantDTO } from "../../domain/entities/Participant";
import { ParticipantRepositoryBase } from "../../domain/repositories-ports/ParticipantRepositoryBase";


export class ParticipantUseCase {
    private participantRepository: ParticipantRepositoryBase;

    constructor({ participantRepository }: { participantRepository: ParticipantRepositoryBase }) {
        this.participantRepository = participantRepository;
    }

    public async getParticipants(): Promise<Participant[]> {
        return await this.participantRepository.getParticipants();
    }

    public async postParticipant(dataDTO: ParticipantDTO): Promise<Participant> {
        console.log('post')
        return await this.participantRepository.postParticipant(dataDTO);
    }

    public async deleteParticipant(eventId: number): Promise<void> {
        return await this.participantRepository.deleteParticipant(eventId);
    }
}

