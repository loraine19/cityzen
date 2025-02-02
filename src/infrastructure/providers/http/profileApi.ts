//src/infrastructure/api/profileApi.tsx
import { AddressDTO } from "../../../domain/entities/Address";
import { Profile, ProfileDTO } from "../../../domain/entities/Profile";
import { ApiService, ApiServiceI } from "./apiService";


export class ProfileApi {
    private readonly dataType: string = 'profiles';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getProfiles(): Promise<Profile[]> {
        return this.api.get(this.dataType)
    }

    async getProfileMe(): Promise<Profile> {
        return this.api.get(`${this.dataType}/me`)
    }

    async getProfileById(id: number): Promise<Profile> {
        return this.api.get(`${this.dataType}/${id}`)
    }

    async putProfile(id: number, profile: ProfileDTO): Promise<Profile> {
        return this.api.put(`${this.dataType}/${id}`, profile)
    }

    async updateProfile(element: ProfileDTO, address: AddressDTO): Promise<Profile> {
        const formData = this.api.createFormData(element, address);
        return this.api.patch(`${this.dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async postProfile(element: ProfileDTO, address: AddressDTO): Promise<Profile> {
        const formData = this.api.createFormData(element, address);
        return this.api.post(`${this.dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}

