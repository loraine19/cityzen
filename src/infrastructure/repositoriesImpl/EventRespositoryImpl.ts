//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { EventRepositoryBase } from "../../domain/repositoriesBase/EventRepositoryBase";
import { Event, EventDTO } from "../../domain/entities/Event";

interface IData extends EventRepositoryBase {
    api: any;
    dataType: any;
}

export class EventRepositoryImpl implements EventRepositoryBase {
    private eventData: IData;
    constructor({ eventData }: { eventData: IData }) { this.eventData = eventData }

    public async getEvents(page?: number, filter?: string, category?: string): Promise<Event[]> {
        return await this.eventData.getEvents(page, filter, category);
    }

    public async getEventById(id: number): Promise<Event> {
        return this.eventData.getEventById(id);
    }

    public async createEvent(data: EventDTO): Promise<Event> {
        return this.eventData.createEvent(data);
    }

    public async updateEvent(id: number, data: EventDTO): Promise<Event> {
        return this.eventData.updateEvent(id, data);
    }

    public async deleteEvent(id: number): Promise<void> {
        return this.eventData.deleteEvent(id);
    }
}
