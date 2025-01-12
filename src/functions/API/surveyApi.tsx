import { Survey, SurveyDTO } from "../../types/class";
import { createFormData, handleApiCall, useApi } from "./useApi";

const api = useApi();
const dataType = "surveys";

//// GETTERS


export const getSurveys = async (): Promise<Survey[]> => handleApiCall(() => api.get(dataType));

export const getSurveysMore = async (): Promise<Survey[]> => handleApiCall(() => api.get(dataType));

export const getSurveysByTag = async (category: string): Promise<Survey[]> => handleApiCall(() => api.get(`${dataType}/${category}`));

export const getSurveyById = async (id: number): Promise<Survey> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getSurveysMines = async (): Promise<Survey[]> => handleApiCall(() => api.get(`${dataType}/mines`));
export const getSurveysIlike = async (): Promise<Survey[]> => handleApiCall(() => api.get(`${dataType}/ilike`));
export const getSurveyByLikeId = async (id: number): Promise<Survey> => handleApiCall(() => api.get(`${dataType}/like/${id}`));

export const getSurveysByUser = async (id: number): Promise<Survey[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));

export const searchSurveys = async (elementToSearch: string): Promise<Survey[]> => handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));

//// ACTIONS
export const deleteSurvey = async (id: number): Promise<Survey> => handleApiCall(() => api.delete(`${dataType}/${id}`));

export const patchSurvey = async (id: number, profile: SurveyDTO): Promise<Survey> => {
    const formData = createFormData(profile);
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

export const postSurvey = async (profile: SurveyDTO): Promise<Survey> => {
    const formData = createFormData(profile);
    return handleApiCall(() => api.post(dataType, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

