//src/domain/repositories-ports/EventRepositoryBase.ts

import { AddressDTO } from "../../infrastructure/DTOs/AddressDTO";
import { EventDTO } from "../../infrastructure/DTOs/EventDTO";
import { Event, EventPage } from "../entities/Event";



export abstract class EventRepositoryBase {
    abstract getEvents(page?: number, filter?: string, category?: string): Promise<EventPage>;
    abstract getEventById(id: number): Promise<Event>;
    abstract postEvent(data: EventDTO, address?: AddressDTO): Promise<Event>;
    abstract updateEvent(id: number, data: EventDTO, address?: AddressDTO): Promise<Event>;
    abstract deleteEvent(id: number): Promise<void>;
}



