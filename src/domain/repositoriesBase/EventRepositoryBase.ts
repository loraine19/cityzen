//src/domain/repositories-ports/EventRepositoryBase.ts
import { EventDTO } from "../entities/Event";
import { Event } from "../entities/Event";



export abstract class EventRepositoryBase {
    abstract getEvents(page?: number, filter?: string, category?: string): Promise<Event[]>;
    abstract getEventById(id: number): Promise<Event>;
    abstract createEvent(data: EventDTO): Promise<Event>;
    abstract updateEvent(id: number, data: EventDTO): Promise<Event>;
    abstract deleteEvent(id: number): Promise<void>;
}



