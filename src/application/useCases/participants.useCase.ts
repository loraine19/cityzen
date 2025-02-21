import { Participant } from "../../domain/entities/Participant";
import { ParticipantRepositoryBase } from "../../domain/repositoriesBase/ParticipantRepositoryBase";
import { Event } from "../../domain/entities/Event";
import { ParticipantDTO } from "../../infrastructure/DTOs/ParticipantDTO";

export class GetParticipantsUseCase {
    private participantRepository: ParticipantRepositoryBase;

    constructor({ participantRepository }: { participantRepository: ParticipantRepositoryBase }) {
        this.participantRepository = participantRepository;
    }

    public async execute(): Promise<Participant[]> {
        return await this.participantRepository.getParticipants();
    }
}

export class PostParticipantUseCase {
    private participantRepository: ParticipantRepositoryBase;

    constructor({ participantRepository }: { participantRepository: ParticipantRepositoryBase }) {
        this.participantRepository = participantRepository;
    }

    public async execute(dataDTO: ParticipantDTO): Promise<Participant> {
        return await this.participantRepository.postParticipant(dataDTO);
    }
}

export class DeleteParticipantUseCase {
    private participantRepository: ParticipantRepositoryBase;

    constructor({ participantRepository }: { participantRepository: ParticipantRepositoryBase }) {
        this.participantRepository = participantRepository;
    }

    public async execute(eventId: number): Promise<void> {
        return await this.participantRepository.deleteParticipant(eventId);
    }
}

export class ToogleParticipantUseCase {
    private participantRepository: ParticipantRepositoryBase;

    constructor({ participantRepository }: { participantRepository: ParticipantRepositoryBase }) {
        this.participantRepository = participantRepository;
    }

    public async execute(event: Event, eventId: number, userId: number): Promise<boolean> {
        const isParticipant: Participant | undefined = (event?.Participants.find((p: Participant) => p.userId === userId))
        if (isParticipant) {
            await this.participantRepository.deleteParticipant(eventId)
            return true
        }
        else {
            await this.participantRepository.postParticipant({ eventId, userId })
            return true
        }
    }
}

