import { Group } from "../../../domain/entities/Group";
import { ApiServiceI, ApiService } from "./apiService";


export class GroupApi {
    private readonly dataType: string = 'Groups';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getNearestGroups(): Promise<Group[]> {
        return this.api.get(this.dataType)
    }

}