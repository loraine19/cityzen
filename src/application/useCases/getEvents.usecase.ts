import { EventRepositoryBase } from "../../../domain/repositories-ports/EventRepositoryBase";
import { Event } from "../../../domain/entities/Event";

export class GetEventsUseCase {
    private eventRepository: EventRepositoryBase;

    constructor({ eventRepository }: { eventRepository: EventRepositoryBase }) {
        this.eventRepository = eventRepository;
    }


    public async execute(): Promise<Event[]> {
        return await this.eventRepository.getEvents();
    }

    public async executeMines(): Promise<Event[]> {
        return await this.eventRepository.getEventsMines();
    }

    public async executeIgo(): Promise<Event[]> {
        return await this.eventRepository.getEventsIgo();
    }

    public async executeValidated(): Promise<Event[]> {
        return await this.eventRepository.getEventsValidated();
    }

    public async executeById(id: number): Promise<Event> {
        return await this.eventRepository.getEventById(id)
    }

}

