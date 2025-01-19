//rc/application/useCases/participantCase.ts/participants.useCase.ts
import { Participant, ParticipantDTO } from "../../../domain/entities/Participant";
import { ParticipantRepositoryBase } from "../../../domain/repositories-ports/ParticipantRepositoryBase";

export class ParticipantUseCase {
    private participantRepository: ParticipantRepositoryBase;

    constructor({ participantRepository }: { participantRepository: ParticipantRepositoryBase }) {
        this.participantRepository = participantRepository;
    }

    public async executeGetParticipants(): Promise<Participant[]> {
        return await this.participantRepository.getParticipants();
    }

    public async executePostParticipant(dataDTO: ParticipantDTO): Promise<Participant> {
        return await this.participantRepository.postParticipant(dataDTO);
    }

    public async executeDeleteParticipant(eventId: number): Promise<void> {
        console.log('ParticipantUseCase execeuteDeleteParticipant');
        return await this.participantRepository.deleteParticipant(eventId);
    }
}

