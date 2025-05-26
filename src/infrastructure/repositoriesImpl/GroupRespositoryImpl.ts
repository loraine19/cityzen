import { Group, GroupPage } from "../../domain/entities/Group";
import { GroupUser } from "../../domain/entities/GroupUser";
import { GroupRepositoryBase } from "../../domain/repositoriesBase/GroupRepositoryBase";
import { MessageBack } from "../DTOs/frontEntities";
import { GroupUserDTO } from "../DTOs/GroupUserDTO";

interface IData extends GroupRepositoryBase {
    api: any;
    dataType: any;
}

export class GroupRepositoryImpl implements GroupRepositoryBase {
    private groupData: IData;
    constructor({ groupData }: { groupData: IData }) { this.groupData = groupData }

    public async getNearestGroups(page?: number, filter?: string, category?: string): Promise<GroupPage> {
        return this.groupData.getNearestGroups(page, filter, category);
    }

    public async getGroupById(id: number): Promise<Group> {
        return this.groupData.getGroupById(id);
    }

    public async postGroupUser(dataDTO: GroupUserDTO): Promise<GroupUser> {
        return this.groupData.postGroupUser(dataDTO);
    }

    public async updateGroupUser(dataDTO: GroupUserDTO): Promise<GroupUser> {
        return this.groupData.updateGroupUser(dataDTO);
    }

    public async deleteGroupUser(groupId: number): Promise<MessageBack> {
        return this.groupData.deleteGroupUser(groupId);
    }
}
