// src/data/repositories/UserRepository.tsx
import { GroupPage } from "../entities/Group";

export abstract class GroupRepositoryBase {
    abstract getNearestGroups(page?: number, filter?: string, category?: string): Promise<GroupPage>;
}