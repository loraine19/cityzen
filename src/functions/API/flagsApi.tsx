import { Flag, FlagDTO } from "../../types/class";
import { handleApiCall, useApi } from "./useApi";

const api = useApi();
const dataType = "flags";


export const getFlags = async (): Promise<Flag[]> => handleApiCall(() => api.get(dataType));
export const getFlagsByUserId = async (): Promise<Flag[]> => handleApiCall(() => api.get(`${dataType}/mines`));
export const getFlagsEvent = async (): Promise<Flag[]> => handleApiCall(() => api.get(`${dataType}/event`));
export const getFlagsService = async (): Promise<Flag[]> => handleApiCall(() => api.get(`${dataType}/service`));
export const getFlagsPost = async (): Promise<Flag[]> => handleApiCall(() => api.get(`${dataType}/post`));
export const getFlagsByEventId = async (eventId: number): Promise<Flag[]> => handleApiCall(() => api.get(`${dataType}/event/${eventId}`));
export const getFlagsSurvey = async (): Promise<Flag[]> => handleApiCall(() => api.get(`${dataType}/survey`));
export const getMyFlag = async (target: string, targetId: number): Promise<Flag> => handleApiCall(() => api.get(`${dataType}/mine/${target.toUpperCase()}/${targetId}`));


//// ACTIONS
export const postFlag = async (flag: FlagDTO): Promise<Flag> => handleApiCall(() => api.post(dataType, flag));

export const patchFlag = async (id: number, flag: FlagDTO): Promise<Flag> => handleApiCall(() => api.patch(`${dataType}/${id}`, flag));

export const deleteFlag = async (target: string, targetId: number): Promise<Flag> => handleApiCall(() => api.delete(`${dataType}/mine/${target.toUpperCase()}/${targetId}`));
