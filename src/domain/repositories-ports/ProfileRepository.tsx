import { Profile, ProfileDTO } from "../entities/Profile";

// PROFILES
export interface ProfileRepository {
    getProfiles(): Promise<Profile[]>;
    getProfileMe(id: number): Promise<Profile>;
    deleteProfile(id: number): Promise<void>;
    updateProfile(data: ProfileDTO): Promise<Profile>;
    postProfile(data: ProfileDTO): Promise<Profile>;
}

