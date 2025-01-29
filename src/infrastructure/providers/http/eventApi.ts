import { Event, EventDTO, EventPage } from "../../../domain/entities/Event";
import { createFormData, handleApiCall } from "./utilsApi";
import { useApi, Api } from "./UseApi";

export class EventApi {
    private readonly api: Api;
    private readonly dataType: string = 'events';

    constructor() { this.api = useApi() }
    async getEvents(page?: number, filter?: string, category?: string): Promise<EventPage> {
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        const categoryR = category ? `&category=${category}` : '';
        return handleApiCall(() => this.api.get(`${this.dataType}${pageR}${filterR}${categoryR}`));
    }

    async getEventById(id: number): Promise<Event> {
        return handleApiCall(() => this.api.get(`${this.dataType}/${id}`));
    }

    async postEvent(event: EventDTO): Promise<Event> {
        const formData = createFormData(event);
        return handleApiCall(() => this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async updateEvent(id: number, event: EventDTO): Promise<Event> {
        const formData = createFormData(event);
        return handleApiCall(() => this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async deleteEvent(id: number): Promise<Event> {
        return handleApiCall(() => this.api.delete(`${this.dataType}/${id}`));
    }
}