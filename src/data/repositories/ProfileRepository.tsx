import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { useApi, handleApiCall, createFormData } from "../api/useApi";

const api = useApi();
const dataType = "profiles";

// PROFILES
export interface ProfileRepository {
    getProfiles(): Promise<Profile[]>;
    getProfileById(id: number): Promise<Profile>;
    putProfile(id: number, profile: ProfileDTO): Promise<Profile>;
    deleteProfile(id: number): Promise<Profile>;
    patchProfile(element: ProfileDTO): Promise<Profile>;
    postProfile(element: ProfileDTO): Promise<Profile>;
}

export class ProfileService implements ProfileRepository {
    getProfiles = async (): Promise<Profile[]> => handleApiCall(() => api.get(dataType));
    getProfileById = async (id: number): Promise<Profile> => handleApiCall(() => api.get(`${dataType}/${id}`));
    putProfile = async (id: number, profile: ProfileDTO): Promise<Profile> => handleApiCall(() => api.put(`${dataType}/${id}`, profile));
    deleteProfile = async (id: number): Promise<Profile> => handleApiCall(() => api.delete(`${dataType}/${id}`));
    patchProfile = async (element: ProfileDTO): Promise<Profile> => {
        const formData = createFormData(element);
        return handleApiCall(() => api.patch(`${dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
    postProfile = async (element: ProfileDTO): Promise<Profile> => {
        const formData = createFormData(element);
        return handleApiCall(() => api.post(`${dataType}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
}
