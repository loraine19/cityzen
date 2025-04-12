import { GroupUserDTO } from "../../infrastructure/DTOs/GroupUserDTO";
import { GroupUser } from "../entities/GroupUser";
import { Profile, ProfileDTO } from "../entities/Profile";

// PROFILES
export interface ProfileRepositoryBase {
    getProfileMe(): Promise<Profile>;
    updateProfile(data: ProfileDTO): Promise<Profile>;
    postProfile(data: ProfileDTO): Promise<Profile>;
    updateAllRole(data: GroupUserDTO[]): Promise<GroupUser>;
    updateRole(modo: boolean, groupId: number): Promise<GroupUser>;
}

