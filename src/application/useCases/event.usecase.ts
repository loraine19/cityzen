
import { Event } from "../../domain/entities/Event";
import { EventRepositoryBase } from "../../domain/repositories-ports/EventRepositoryBase";

export class EventUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }

    public async getEvents(): Promise<Event[]> {
        return await this.eventRepository.getEvents();
    }

    public async getEventsMines(): Promise<Event[]> {
        return await this.eventRepository.getEventsMines();
    }

    public async getEventsIgo(): Promise<Event[]> {
        return await this.eventRepository.getEventsIgo();
    }

    public async getEventsValidated(): Promise<Event[]> {
        return await this.eventRepository.getEventsValidated();
    }

    public async getEventById(id: number): Promise<Event> {
        return await this.eventRepository.getEventById(id)
    }

}

