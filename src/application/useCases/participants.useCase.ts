import { Participant, ParticipantDTO } from "../../domain/entities/Participant";
import { ParticipantRepositoryBase } from "../../domain/repositoriesBase/ParticipantRepositoryBase";
import { Event } from "../../domain/entities/Event";

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

    public async execute(event: Event, eventId: number, userId: number): Promise<Participant | void> {
        if (event.Participants.find(p => p.userId === userId))
            return await this.participantRepository.deleteParticipant(eventId)
        else
            return await this.participantRepository.postParticipant({ eventId, userId });

    }
}

export const participantUsesCases = {
    GetParticipantsUseCase,
    PostParticipantUseCase,
    DeleteParticipantUseCase
}
