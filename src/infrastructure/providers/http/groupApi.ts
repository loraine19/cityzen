import { GroupPage } from "../../../domain/entities/Group";
import { GroupUser } from "../../../domain/entities/GroupUser";
import { MessageBack } from "../../DTOs/frontEntities";
import { GroupUserDTO } from "../../DTOs/GroupUserDTO";
import { ApiServiceI, ApiService } from "./apiService";


export class GroupApi {
    private readonly dataType: string = 'groups';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getNearestGroups(page?: number, filter?: string, category?: string): Promise<GroupPage> {
        const pageR = page ? `?page=${page}` : `?page=${0}`;
        const filterR = filter ? `&filter=${filter}` : '';
        const categoryR = category ? `&category=${category}` : '';
        return this.api.get(`${this.dataType}/nearest${pageR}${filterR}${categoryR}`);
    }

    async getGroupById(id: number): Promise<GroupPage> {
        return this.api.get(`${this.dataType}/${id}`);
    }

    async postGroupUser(dataDTO: GroupUserDTO): Promise<GroupUser> {
        return this.api.post(`${this.dataType}-users`, dataDTO)
    }

    async updateGroupUser(dataDTO: GroupUserDTO): Promise<GroupUser> {
        return this.api.put(`${this.dataType}-users`, dataDTO);
    }

    async deleteGroupUser(groupId: number): Promise<MessageBack> {
        console.log('deleteGroupUser', groupId);
        return this.api.delete(`${this.dataType}-users/${groupId}`);
    }



}