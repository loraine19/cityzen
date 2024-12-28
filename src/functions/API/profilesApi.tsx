import { Profile, Auth } from "../../types/class";
import { useApi } from "./useApi";

type ProfileDto = Partial<Profile>;

const api = useApi();
const dataType = "profiles";

const handleApiCall = async (apiCall: () => Promise<any>): Promise<any> => {
    try {
        const { data } = await apiCall();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// PROFILES
export const getProfiles = async (): Promise<Profile[]> => handleApiCall(() => api.get(dataType));

export const getProfileById = async (id: number): Promise<Profile> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const postProfile = async (profile: ProfileDto): Promise<Profile> => handleApiCall(() => api.post(dataType, profile));

export const putProfile = async (id: number, profile: ProfileDto): Promise<Profile> => handleApiCall(() => api.put(`${dataType}/${id}`, profile));

export const deleteProfile = async (id: number): Promise<Profile> => handleApiCall(() => api.delete(`${dataType}/${id}`));

// export const patchProfile = async (id: number, profile: ProfileDto): Promise<Profile> => handleApiCall(() => api.patch(`${dataType}/${id}`, profile));
// export const patchProfile = async (id: number, profile: ProfileDto): Promise<Profile> => {
//     console.log("profile", profile);
//     const formData = new FormData();
//     Object.entries(profile).forEach(([key, value]) => {
//         if (value instanceof File) {
//             formData.append(key, value);
//         } else if (value !== undefined && value !== null) {
//             if (typeof value === 'object') {
//                 formData.append(key, JSON.stringify(value));
//             } else {
//                 formData.append(key, value.toString());
//             }
//         }
//     });
//     console.log("formData entries", Array.from(formData.entries()));
//     return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     }));
// };

export const patchProfile = async (id: number, profile: ProfileDto): Promise<Profile> => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(profile)) {
        if (value instanceof File) {
            formData.append(key, value);
        } else if (value !== undefined && value !== null) {
            if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value.toString());
            }
        }
    }
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

