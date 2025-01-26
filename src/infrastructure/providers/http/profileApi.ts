//src/infrastructure/api/profileApi.tsx
import { Profile, ProfileDTO } from "../../../domain/entities/Profile";
import { createFormData, handleApiCall } from "./utilsApi";
import { Api, useApi } from "./UseApi";


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

    async updateProfile(element: ProfileDTO): Promise<Profile> {
        console.log('element', element);
        const formData = createFormData(element);
        return handleApiCall(() => this.api.patch(`${this.dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async postProfile(element: ProfileDTO): Promise<Profile> {
        console.log('element', element);
        const formData = createFormData(element);
        return handleApiCall(() => this.api.post(`${this.dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
}

