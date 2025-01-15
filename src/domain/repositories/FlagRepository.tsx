import { Flag, FlagDTO } from "../../domain/entities/Flag";
import { useApi, handleApiCall } from "../../infrastructure/api/useApi";


const api = useApi();
const dataType = "flags";

export interface FlagRepository {
    getFlags(): Promise<Flag[]>;
    getFlagsByUserId(): Promise<Flag[]>;
    getFlagsEvent(): Promise<Flag[]>;
    getFlagsService(): Promise<Flag[]>;
    getFlagsPost(): Promise<Flag[]>;
    getFlagsByEventId(eventId: number): Promise<Flag[]>;
    getFlagsSurvey(): Promise<Flag[]>;
    getMyFlag(target: string, targetId: number): Promise<Flag>;
    postFlag(flag: FlagDTO): Promise<Flag>;
    patchFlag(id: number, flag: FlagDTO): Promise<Flag>;
    deleteFlag(target: string, targetId: number): Promise<Flag>;
}

export class FlagService implements FlagRepository {
    async getFlags(): Promise<Flag[]> {
        return handleApiCall(() => api.get(dataType));
    }

    async getFlagsByUserId(): Promise<Flag[]> {
        return handleApiCall(() => api.get(`${dataType}/mines`));
    }

    async getFlagsEvent(): Promise<Flag[]> {
        return handleApiCall(() => api.get(`${dataType}/event`));
    }

    async getFlagsService(): Promise<Flag[]> {
        return handleApiCall(() => api.get(`${dataType}/service`));
    }

    async getFlagsPost(): Promise<Flag[]> {
        return handleApiCall(() => api.get(`${dataType}/post`));
    }

    async getFlagsByEventId(eventId: number): Promise<Flag[]> {
        return handleApiCall(() => api.get(`${dataType}/event/${eventId}`));
    }

    async getFlagsSurvey(): Promise<Flag[]> {
        return handleApiCall(() => api.get(`${dataType}/survey`));
    }

    async getMyFlag(target: string, targetId: number): Promise<Flag> {
        return handleApiCall(() => api.get(`${dataType}/mine/${target.toUpperCase()}/${targetId}`));
    }

    async postFlag(flag: FlagDTO): Promise<Flag> {
        return handleApiCall(() => api.post(dataType, flag));
    }

    async patchFlag(id: number, flag: FlagDTO): Promise<Flag> {
        return handleApiCall(() => api.patch(`${dataType}/${id}`, flag));
    }

    async deleteFlag(target: string, targetId: number): Promise<Flag> {
        return handleApiCall(() => api.delete(`${dataType}/mine/${target.toUpperCase()}/${targetId}`));
    }
}
