//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { EventRepositoryBase } from "../../domain/repositoriesBase/EventRepositoryBase";
import { Event, EventDTO, EventPage } from "../../domain/entities/Event";
import { ApiServiceI } from "../providers/http/apiService";
import { AddressDTO } from "../../domain/entities/Address";

interface IData extends EventRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class EventRepositoryImpl implements EventRepositoryBase {
    private eventData: IData;
    constructor({ eventData }: { eventData: IData }) { this.eventData = eventData }

    public async getEvents(page?: number, filter?: string, category?: string): Promise<EventPage> {
        return await this.eventData.getEvents(page, filter, category);
    }

    public async getEventById(id: number): Promise<Event> {
        return this.eventData.getEventById(id);
    }

    public async postEvent(data: EventDTO, address?: AddressDTO): Promise<Event> {
        return this.eventData.postEvent(data, address);
    }

    public async updateEvent(id: number, data: EventDTO, address?: AddressDTO): Promise<Event> {
        return this.eventData.updateEvent(id, data, address);
    }

    public async deleteEvent(id: number): Promise<void> {
        return this.eventData.deleteEvent(id);
    }
}
