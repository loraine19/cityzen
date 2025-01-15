//src/infrastructure/api/profileApi.tsx
import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { createFormData } from "./apiUtils";
import { Api, useApi } from "./useApi";
import { handleApiCall } from "./useApi";


export class ProfileApi {
    private readonly api: Api;
    private readonly dataType: string = 'profiles';

    constructor() { this.api = useApi(); }

    async getProfiles(): Promise<Profile[]> {
        return handleApiCall(() => this.api.get(this.dataType));
    }

    async getProfileMe(): Promise<Profile> {
        return handleApiCall(() => this.api.get(`${this.dataType}/me`))
    }

    async getProfileById(id: number): Promise<Profile> {
        return handleApiCall(() => this.api.get(`${this.dataType}/${id}`))
    }

    async putProfile(id: number, profile: ProfileDTO): Promise<Profile> {
        return handleApiCall(() => this.api.put(`${this.dataType}/${id}`, profile))
    }

    async deleteProfile(id: number): Promise<void> {
        return handleApiCall(() => this.api.delete(`${this.dataType}/${id}`))
    }

    async patchProfile(element: ProfileDTO): Promise<Profile> {
        const formData = createFormData(element);
        return handleApiCall(() => this.api.patch(`${this.dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async postProfile(element: ProfileDTO): Promise<Profile> {
        const formData = createFormData(element);
        return handleApiCall(() => this.api.post(`${this.dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
}

