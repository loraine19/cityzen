import { EventDTO, EventP } from "../../domain/entities/Events";
import { useApi, createFormData, handleApiCall } from "../api/useApi";

const api = useApi();
const dataType = "events";

interface EventRepository {
    getEvents: () => Promise<EventP[]>;
    getEventById: (id: number) => Promise<EventP>;
    getEventsByTag: (category: string) => Promise<EventP[]>;
    getEventsMines: () => Promise<EventP[]>;
    getEventsIgo: () => Promise<EventP[]>;
    getEventsValidated: () => Promise<EventP[]>;
    getEventsByUser: (id: number) => Promise<EventP[]>;
    getEventsByParticipant: (id: number) => Promise<EventP[]>;
    searchEvents: (elementToSearch: string) => Promise<EventP[]>;
    postEvent: (event: EventDTO) => Promise<EventP>;
    patchEvent: (id: number, event: EventDTO) => Promise<EventP>;
    deleteEvent: (id: number) => Promise<EventP>;
}

export class EventService implements EventRepository {
    async getEvents(): Promise<EventP[]> {
        return handleApiCall(() => api.get(dataType));
    }

    async getEventById(id: number): Promise<EventP> {
        return handleApiCall(() => api.get(`${dataType}/${id}`));
    }

    async getEventsByTag(category: string): Promise<EventP[]> {
        return handleApiCall(() => api.get(`${dataType}/${category}`));
    }

    async getEventsMines(): Promise<EventP[]> {
        return handleApiCall(() => api.get(`${dataType}/mines`));
    }

    async getEventsIgo(): Promise<EventP[]> {
        return handleApiCall(() => api.get(`${dataType}/igo`));
    }

    async getEventsValidated(): Promise<EventP[]> {
        return handleApiCall(() => api.get(`${dataType}/validated`));
    }

    async getEventsByUser(id: number): Promise<EventP[]> {
        return handleApiCall(() => api.get(`${dataType}/user/${id}`));
    }

    async getEventsByParticipant(id: number): Promise<EventP[]> {
        return handleApiCall(() => api.get(`${dataType}/participant/${id}`));
    }

    async searchEvents(elementToSearch: string): Promise<EventP[]> {
        return handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));
    }

    async postEvent(event: EventDTO): Promise<EventP> {
        const formData = createFormData(event);
        return handleApiCall(() => api.post(dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async patchEvent(id: number, event: EventDTO): Promise<EventP> {
        const formData = createFormData(event);
        return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async deleteEvent(id: number): Promise<EventP> {
        return handleApiCall(() => api.delete(`${dataType}/${id}`));
    }
}
