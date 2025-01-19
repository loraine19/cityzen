//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { EventRepositoryBase } from "../../domain/repositories-ports/EventRepositoryBase";
import { Event, EventDTO } from "../../domain/entities/Event";

interface IData extends EventRepositoryBase {
    api: any;
    dataType: any;
}

export class EventRepositoryImpl implements EventRepositoryBase {
    private eventData: IData;
    constructor({ eventData }: { eventData: IData }) { this.eventData = eventData }

    public async getEvents(): Promise<Event[]> {
        return this.eventData.getEvents();
    }

    public async getEventById(id: number): Promise<Event> {
        return this.eventData.getEventById(id);
    }

    public async getEventsMines(): Promise<Event[]> {
        return this.eventData.getEventsMines();
    }

    public async getEventsIgo(): Promise<Event[]> {
        return this.eventData.getEventsIgo();
    }

    public async getEventsValidated(): Promise<Event[]> {
        return this.eventData.getEventsValidated();
    }

    public async createEvent(eventDTO: EventDTO): Promise<Event> {
        return this.eventData.createEvent(eventDTO);
    }

    public async updateUser(eventDTO: EventDTO): Promise<Event> {
        return this.eventData.updateUser(eventDTO);
    }

    public async deleteUser(id: number): Promise<void> {
        return this.eventData.deleteUser(id);
    }
}
