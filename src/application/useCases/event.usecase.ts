
import { Event, EventDTO } from "../../domain/entities/Event";
import { EventRepositoryBase } from "../../domain/repositoriesBase/EventRepositoryBase";

export class EventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async getEvents(page?: number, filter?: string, category?: string): Promise<Event[]> {
        const events = await this.eventRepository.getEvents(page, filter, category);
        return events;
    }

    public async getEventById(id: number): Promise<Event> {
        return await this.eventRepository.getEventById(id)
    }

    public async createEvent(data: EventDTO): Promise<Event> {
        return await this.eventRepository.createEvent(data)
    }

    public async updateEvent(id: number, data: EventDTO): Promise<Event> {
        return await this.eventRepository.updateEvent(id, data)
    }

    public async deleteEvent(id: number): Promise<void> {
        return await this.eventRepository.deleteEvent(id)
    }

}

