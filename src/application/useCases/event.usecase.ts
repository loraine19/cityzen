
import { Event, EventDTO, EventPage } from "../../domain/entities/Event";
import { EventRepositoryBase } from "../../domain/repositoriesBase/EventRepositoryBase";

export class GetEventsUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(page?: number, filter?: string, category?: string): Promise<EventPage> {
        return await this.eventRepository.getEvents(page, filter, category);
    }
}

export class GetEventByIdUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(id: number): Promise<Event> {
        return await this.eventRepository.getEventById(id);
    }
}

export class PostEventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(data: EventDTO): Promise<Event> {
        return await this.eventRepository.postEvent(data);
    }
}

export class UpdateEventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(id: number, data: EventDTO): Promise<Event> {
        return await this.eventRepository.updateEvent(id, data);
    }
}

export class DeleteEventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(id: number): Promise<void> {
        return await this.eventRepository.deleteEvent(id);
    }
}

export const eventUseCases = {
    GetEventsUseCase,
    GetEventByIdUseCase,
    PostEventUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase
}

