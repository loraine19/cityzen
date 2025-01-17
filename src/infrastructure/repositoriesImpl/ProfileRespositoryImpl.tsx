//src/infrastructure/repositoriesImpl/ProfileRepositoryImpl.tsx
import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { ProfileRepository } from "../../domain/repositories-ports/ProfileRepository";
import { ProfileApi } from "../providers/http/profileApi";

export class ProfileRepositoryImpl implements ProfileRepository {
    constructor(private profileApi: ProfileApi) { }

    async getProfiles(): Promise<Profile[]> {
        return this.profileApi.getProfiles();
    }

    async getProfileMe(): Promise<Profile> {
        return this.profileApi.getProfileMe();
    }


    async postProfile(data: ProfileDTO): Promise<Profile> {
        return this.profileApi.postProfile(data);
    }

    async updateProfile(data: ProfileDTO): Promise<Profile> {
        return this.profileApi.patchProfile(data);
    }

    async deleteProfile(id: number): Promise<void> {
        return this.profileApi.deleteProfile(id);
    }
}

// Example usage
//const profileRepository = new ProfileRepositoryImpl();
//profileRepository.getProfileMe().then(profile => console.log(profile));
