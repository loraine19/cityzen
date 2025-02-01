import { ApiService } from "../../infrastructure/providers/http/apiService";
import { Flag, FlagDTO } from "../entities/Flag";


const api: ApiService = new ApiService();
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
        return api.get(dataType)
    }

    async getFlagsByUserId(): Promise<Flag[]> {
        return api.get(`${dataType}/mines`)
    }

    async getFlagsEvent(): Promise<Flag[]> {
        return api.get(`${dataType}/event`)
    }

    async getFlagsService(): Promise<Flag[]> {
        return api.get(`${dataType}/service`)
    }

    async getFlagsPost(): Promise<Flag[]> {
        return api.get(`${dataType}/post`)
    }

    async getFlagsByEventId(eventId: number): Promise<Flag[]> {
        return api.get(`${dataType}/event/${eventId}`)
    }

    async getFlagsSurvey(): Promise<Flag[]> {
        return api.get(`${dataType}/survey`)
    }

    async getMyFlag(target: string, targetId: number): Promise<Flag> {
        return api.get(`${dataType}/mine/${target.toUpperCase()}/${targetId}`)
    }

    async postFlag(flag: FlagDTO): Promise<Flag> {
        return api.post(dataType, flag)
    }

    async patchFlag(id: number, flag: FlagDTO): Promise<Flag> {
        return api.patch(`${dataType}/${id}`, flag)
    }

    async deleteFlag(target: string, targetId: number): Promise<Flag> {
        return api.delete(`${dataType}/mine/${target.toUpperCase()}/${targetId}`)
    }
}
