import { EventP, EventDTO } from "../entities/Events";
import { useApi, handleApiCall, createFormData } from "../api/useApi";



const api = useApi();
const dataType = "events";


export const getEvents = async (): Promise<EventP[]> => handleApiCall(() => api.get(dataType));

export const getEventsMore = async (): Promise<EventP[]> => handleApiCall(() => api.get(dataType));

export const getEventsByTag = async (category: string): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/${category}`));

export const getEventById = async (id: number): Promise<EventP> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getEventsMines = async (): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/mines`));
export const getEventsIgo = async (): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/igo`));

export const getEventsValidated = async (): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/validated`));

export const getEventsByUser = async (id: number): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));


export const getEventsByParticipant = async (id: number): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/participant/${id}`));


export const searchEvents = async (elementToSearch: string): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));

//// ACTIONS
export const deleteEvent = async (id: number): Promise<EventP> => handleApiCall(() => api.delete(`${dataType}/${id}`));

export const patchEvent = async (id: number, element: EventDTO): Promise<EventP> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

export const postEvent = async (element: EventDTO): Promise<EventP> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.post(dataType, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};
