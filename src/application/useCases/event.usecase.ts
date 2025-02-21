import { Event } from "../../domain/entities/Event"
import { EventPage } from "../../domain/entities/Event";
import { EventRepositoryBase } from "../../domain/repositoriesBase/EventRepositoryBase";
import { AddressDTO } from "../../infrastructure/DTOs/AddressDTO";
import { EventDTO } from "../../infrastructure/DTOs/EventDTO";

export class GetEventsUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(page?: number, filter?: string, category?: string): Promise<EventPage> {
        return this.eventRepository.getEvents(page, filter, category);
    }
}

export class GetEventByIdUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(id: number): Promise<Event> {
        return this.eventRepository.getEventById(id);
    }
}

export class PostEventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(data: EventDTO, address: AddressDTO): Promise<Event> {
        return this.eventRepository.postEvent(data, address);
    }
}

export class UpdateEventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(id: number, data: EventDTO, address: AddressDTO): Promise<Event> {
        return this.eventRepository.updateEvent(id, data, address);
    }
}

export class DeleteEventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async execute(id: number): Promise<void> {
        return this.eventRepository.deleteEvent(id);
    }
}


