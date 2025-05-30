//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { EventRepositoryBase } from "../../domain/repositoriesBase/EventRepositoryBase";
import { Event, EventPage } from "../../domain/entities/Event";
import { ApiServiceI } from "../providers/http/apiService";
import { AddressDTO } from "../DTOs/AddressDTO";
import { EventDTO } from "../DTOs/EventDTO";

interface IData extends EventRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class EventRepositoryImpl implements EventRepositoryBase {
    private eventData: IData;
    constructor({ eventData }: { eventData: IData }) { this.eventData = eventData }

    public async getEvents(page?: number, filter?: string, category?: string, sort?: string, reverse?: boolean): Promise<EventPage> {
        return await this.eventData.getEvents(page, filter, category, sort, reverse);
    }

    public async getEventById(id: number): Promise<Event> {
        return this.eventData.getEventById(id);
    }

    public async postEvent(data: EventDTO): Promise<Event> {
        return this.eventData.postEvent(data);
    }

    public async updateEvent(id: number, data: EventDTO, address?: AddressDTO): Promise<Event> {
        return this.eventData.updateEvent(id, data, address);
    }

    public async deleteEvent(id: number): Promise<void> {
        return this.eventData.deleteEvent(id);
    }
}
