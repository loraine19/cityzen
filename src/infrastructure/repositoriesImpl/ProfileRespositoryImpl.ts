//src/infrastructure/repositoriesImpl/ProfileRepositoryImpl.tsx
import { GroupUser } from "../../domain/entities/GroupUser";
import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { ProfileRepositoryBase } from "../../domain/repositoriesBase/ProfileRepositoryBase";
import { GroupUserDTO } from "../DTOs/GroupUserDTO";
import { ApiServiceI } from "../providers/http/apiService";

interface IData extends ProfileRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class ProfileRepositoryImpl implements ProfileRepositoryBase {
    private profileData: IData;
    constructor({ profileData }: { profileData: IData }) { this.profileData = profileData }

    async getProfileMe(): Promise<Profile> {
        return this.profileData.getProfileMe();
    }

    async postProfile(data: ProfileDTO): Promise<Profile> {
        return this.profileData.postProfile(data);
    }

    async updateProfile(data: ProfileDTO): Promise<Profile> {
        return this.profileData.updateProfile(data);
    }

    async updateAllRole(data: GroupUserDTO[]): Promise<GroupUser> {
        return this.profileData.updateAllRole(data);
    }

    async updateRole(modo: boolean, groupId: number): Promise<GroupUser> {
        return this.profileData.updateRole(modo, groupId);
    }
}

