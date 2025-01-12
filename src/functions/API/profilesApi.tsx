import { Profile, ProfileDTO } from "../../types/class";
import { createFormData, handleApiCall, useApi } from "./useApi";


const api = useApi();
const dataType = "profiles";


// PROFILES
export const getProfiles = async (): Promise<Profile[]> => handleApiCall(() => api.get(dataType));

export const getProfileById = async (id: number): Promise<Profile> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const putProfile = async (id: number, profile: ProfileDTO): Promise<Profile> => handleApiCall(() => api.put(`${dataType}/${id}`, profile));

export const deleteProfile = async (id: number): Promise<Profile> => handleApiCall(() => api.delete(`${dataType}/${id}`));


export const patchProfile = async (element: ProfileDTO): Promise<Profile> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.patch(`${dataType}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

export const postProfile = async (element: ProfileDTO): Promise<Profile> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.post(`${dataType}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};
