// src/data/repositories/UserRepository.tsx
import { MessageBack } from "../../infrastructure/DTOs/frontEntities";
import { GroupUserDTO } from "../../infrastructure/DTOs/GroupUserDTO";
import { Group, GroupPage } from "../entities/Group";
import { GroupUser } from "../entities/GroupUser";

export abstract class GroupRepositoryBase {
    abstract getNearestGroups(page?: number, filter?: string, category?: string): Promise<GroupPage>;
    abstract getGroupById(id: number): Promise<Group>
    abstract postGroupUser(dataDTO: GroupUserDTO): Promise<GroupUser>;
    abstract updateGroupUser(dataDTO: GroupUserDTO): Promise<GroupUser>;
    abstract deleteGroupUser(groupId: number): Promise<MessageBack>;
}
