import { AddressDTO } from "../entities/Address";
import { Profile, ProfileDTO } from "../entities/Profile";

// PROFILES
export interface ProfileRepositoryBase {
    getProfileMe(): Promise<Profile>;
    updateProfile(data: ProfileDTO, address: AddressDTO): Promise<Profile>;
    postProfile(data: ProfileDTO, address: AddressDTO): Promise<Profile>;
}

