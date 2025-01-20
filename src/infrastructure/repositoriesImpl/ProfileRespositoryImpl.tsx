//src/infrastructure/repositoriesImpl/ProfileRepositoryImpl.tsx
import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { ProfileRepositoryBase } from "../../domain/repositories-ports/ProfileRepositoryBase";


interface IData extends ProfileRepositoryBase {
    api: any;
    dataType: any;
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
        console.log('updateProfile', data)
        return this.profileData.updateProfile(data);
    }
}

