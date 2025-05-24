import { GroupPage } from "../../../domain/entities/Group";
import { ApiServiceI, ApiService } from "./apiService";


export class GroupApi {
    private readonly dataType: string = 'Groups';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getNearestGroups(page?: number, filter?: string, category?: string): Promise<GroupPage> {
        const pageR = page ? `?page=${page}` : `?page=${0}`;
        const filterR = filter ? `&filter=${filter}` : '';
        const categoryR = category ? `&category=${category}` : '';
        return this.api.get(`${this.dataType}/nearest${pageR}${filterR}${categoryR}`);
    }

}