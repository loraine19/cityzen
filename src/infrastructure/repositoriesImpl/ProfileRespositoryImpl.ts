//src/infrastructure/repositoriesImpl/ProfileRepositoryImpl.tsx
import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { ProfileRepositoryBase } from "../../domain/repositoriesBase/ProfileRepositoryBase";
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
}

