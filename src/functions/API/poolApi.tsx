import { Pool, PoolDTO, Survey } from "../../types/class";
import { createFormData, handleApiCall, useApi } from "./useApi";

const api = useApi();
const dataType = "pools";

//// GETTERS

export const getPoolsSurveys = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(`pools-surveys`));
export const getPoolsSurveysMines = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(`pools-surveys/mines`));
export const getPoolsSurveysNew = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(`pools-surveys/new`));

export const getPools = async (): Promise<Pool[]> => handleApiCall(() => api.get(dataType));

export const getPoolsMore = async (): Promise<Pool[]> => handleApiCall(() => api.get(dataType));

export const getPoolsByTag = async (category: string): Promise<Pool[]> => handleApiCall(() => api.get(`${dataType}/${category}`));

export const getPoolById = async (id: number): Promise<Pool> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getPoolsMines = async (): Promise<Pool[]> => handleApiCall(() => api.get(`${dataType}/mines`));
export const getPoolsIlike = async (): Promise<Pool[]> => handleApiCall(() => api.get(`${dataType}/ilike`));
export const getPoolByLikeId = async (id: number): Promise<Pool> => handleApiCall(() => api.get(`${dataType}/like/${id}`));

export const getPoolsByUser = async (id: number): Promise<Pool[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));

export const searchPools = async (elementToSearch: string): Promise<Pool[]> => handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));

//// ACTIONS
export const deletePool = async (id: number): Promise<Pool> => handleApiCall(() => api.delete(`${dataType}/${id}`));

export const patchPool = async (id: number, profile: PoolDTO): Promise<Pool> => {
    const formData = createFormData(profile);
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

export const postPool = async (profile: PoolDTO): Promise<Pool> => {
    const formData = createFormData(profile);
    return handleApiCall(() => api.post(dataType, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

