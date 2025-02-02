//src/infrastructure/repositoriesImpl/ProfileRepositoryImpl.tsx
import { AddressDTO } from "../../domain/entities/Address";
import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { ProfileRepositoryBase } from "../../domain/repositoriesBase/ProfileRepositoryBase";


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

    async postProfile(data: ProfileDTO, address: AddressDTO): Promise<Profile> {
        return this.profileData.postProfile(data, address);
    }

    async updateProfile(data: ProfileDTO, address: AddressDTO): Promise<Profile> {
        return this.profileData.updateProfile(data, address);
    }
}

