// src/data/repositories/UserRepository.tsx
import { Group } from "../entities/Group";

export abstract class GroupRepositoryBase {
    abstract getNearestGroups(): Promise<Group[]>;
}