import { Event, EventDTO } from "../../../domain/entities/Event";
import { createFormData, handleApiCall } from "./utilsApi";
import { useApi, Api } from "./UseApi";

export class EventApi {
    private readonly api: Api;
    private readonly dataType: string = 'events';

    constructor() { this.api = useApi() }
    async getEvents(): Promise<Event[]> {
        return handleApiCall(() => this.api.get(this.dataType));
    }

    async getEventById(id: number): Promise<Event> {
        return handleApiCall(() => this.api.get(`${this.dataType}/${id}`));
    }

    async getEventsByTag(category: string): Promise<Event[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/${category}`));
    }

    async getEventsMines(): Promise<Event[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/mines`));
    }

    async getEventsIgo(): Promise<Event[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/igo`));
    }

    async getEventsValidated(): Promise<Event[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/validated`));
    }

    async getEventsByUser(id: number): Promise<Event[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/user/${id}`));
    }

    async getEventsByParticipant(id: number): Promise<Event[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/participant/${id}`));
    }

    async searchEvents(elementToSearch: string): Promise<Event[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/search?q=${elementToSearch}`));
    }

    async postEvent(event: EventDTO): Promise<Event> {
        const formData = createFormData(event);
        return handleApiCall(() => this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async patchEvent(id: number, event: EventDTO): Promise<Event> {
        const formData = createFormData(event);
        return handleApiCall(() => this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async deleteEvent(id: number): Promise<Event> {
        return handleApiCall(() => this.api.delete(`${this.dataType}/${id}`));
    }
}