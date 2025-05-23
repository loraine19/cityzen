
import { Flag, FlagTarget } from "../../../domain/entities/Flag";
import { MessageBack } from "../../../domain/entities/frontEntities";
import { FlagDTO } from "../../DTOs/FlagDTO";

import { ApiServiceI, ApiService } from "./apiService";

export class FlagApi {
    private readonly dataType: string = 'flags';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getFlags(page?: number, filter?: FlagTarget): Promise<Flag[]> {
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        return this.api.get(`${this.dataType}${pageR}${filterR}`);
    }

    async getFlagById(id: number, target: FlagTarget): Promise<Flag> {
        return this.api.get(`${this.dataType}/${id}/${target}`);
    }

    async postFlag(data: FlagDTO): Promise<Flag> {
        return this.api.post(this.dataType, data);
    }

    async deleteFlag(id: number, target: FlagTarget): Promise<MessageBack> {
        return this.api.delete(`${this.dataType}/${id}/${target}`);
    }
}