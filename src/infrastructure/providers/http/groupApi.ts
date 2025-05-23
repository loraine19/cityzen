import { Group } from "../../../domain/entities/Group";
import { ApiServiceI, ApiService } from "./apiService";


export class GroupApi {
    private readonly dataType: string = 'Groups';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getNearestGroups(page?: number): Promise<{ groups: Group[], count: number }> {
        const pageR = page ? `?page=${page}` : `?page=${0}`;
        return this.api.get(`${this.dataType}/nearest${pageR}`);
    }

}