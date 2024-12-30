import { Participant, ParticipantDTO } from "../../types/class";
import { handleApiCall, useApi } from "./useApi";

const api = useApi();
const dataType = "participants";


export const getParticipants = async (): Promise<Participant[]> => handleApiCall(() => api.get(dataType));

export const getParticipantsByEvent = async (eventId: number): Promise<Participant[]> => handleApiCall(() => api.get(`${dataType}/event/${eventId}`));


//// ACTIONS
export const postParticipant = async (participant: ParticipantDTO): Promise<Participant> => handleApiCall(() => api.post(dataType, participant));

export const patchParticipant = async (id: number, participant: ParticipantDTO): Promise<Participant> => handleApiCall(() => api.patch(`${dataType}/${id}`, participant));

export const deleteParticipantWoReq = async (userId: number, eventId: number): Promise<Participant> => handleApiCall(() => api.delete(`${dataType}/user${userId}/event${eventId}`));

export const deleteParticipant = async (eventId: number): Promise<Participant> => handleApiCall(() => api.delete(`${dataType}/event${eventId}`));


