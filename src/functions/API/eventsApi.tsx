import { Participant, EventP } from "../../types/class";
import { useApi } from "./useApi";
type EventDto = Partial<EventP>;
type ParticipantDto = Partial<Participant>;


const api = useApi();
const dataType = "events";


const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
        const { data } = await apiCall();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getEvents = async (): Promise<EventP[]> => handleApiCall(() => api.get(dataType));

export const getEventsMore = async (): Promise<EventP[]> => handleApiCall(() => api.get(dataType));

export const getEventsByTag = async (category: string): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/${category}`));

export const getEventById = async (id: number): Promise<EventP> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getEventsByUser = async (id: number): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));

export const searchEvents = async (elementToSearch: string): Promise<EventP[]> => handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));

//// ACTIONS
export const postEvents = async (event: EventDto): Promise<EventP> => handleApiCall(() => api.post(dataType, event));

export const putEvents = async (id: number, event: EventDto): Promise<EventP> => handleApiCall(() => api.put(`${dataType}/${id}`, event));

export const deleteEvents = async (id: number): Promise<EventP> => handleApiCall(() => api.delete(`${dataType}/${id}`));

export const postParticipants = async (participant: ParticipantDto): Promise<Participant> => handleApiCall(() => api.post(dataType, participant));

export const deleteParticipants = async (userId: number, eventId: number): Promise<Participant> => handleApiCall(() => api.delete(`participants/user${userId}/event${eventId}`));


