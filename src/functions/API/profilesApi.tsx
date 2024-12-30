import { Profile, ProfileDTO } from "../../types/class";
import { createFormData, handleApiCall, useApi } from "./useApi";


const api = useApi();
const dataType = "profiles";


// PROFILES
export const getProfiles = async (): Promise<Profile[]> => handleApiCall(() => api.get(dataType));

export const getProfileById = async (id: number): Promise<Profile> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const postProfile = async (profile: ProfileDTO): Promise<Profile> => handleApiCall(() => api.post(dataType, profile));

export const putProfile = async (id: number, profile: ProfileDTO): Promise<Profile> => handleApiCall(() => api.put(`${dataType}/${id}`, profile));

export const deleteProfile = async (id: number): Promise<Profile> => handleApiCall(() => api.delete(`${dataType}/${id}`));


export const patchProfile = async (id: number, element: ProfileDTO): Promise<Profile> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

