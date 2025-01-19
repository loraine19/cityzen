import { EventDTO } from "../entities/Event";
import { Event } from "../entities/Event";



export abstract class EventRepositoryBase {
    abstract getEvents(): Promise<Event[]>;
    abstract getEventById(id: number): Promise<Event>;
    abstract getEventsMines(): Promise<Event[]>;
    abstract getEventsIgo(): Promise<Event[]>;
    abstract getEventsValidated(): Promise<Event[]>;
    abstract createEvent(eventTO: EventDTO): Promise<Event>;
    abstract updateUser(eventTO: EventDTO): Promise<Event>;
    abstract deleteUser(id: number): Promise<void>;
}



