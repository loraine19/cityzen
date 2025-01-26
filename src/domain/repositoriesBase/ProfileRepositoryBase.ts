import { Profile, ProfileDTO } from "../entities/Profile";

// PROFILES
export interface ProfileRepositoryBase {
    getProfileMe(): Promise<Profile>;
    updateProfile(data: ProfileDTO): Promise<Profile>;
    postProfile(data: ProfileDTO): Promise<Profile>;
}

