import { Survey, SurveyDTO } from "../entities/Survey";
import { createFormData, handleApiCall } from "../../infrastructure/providers/http/utilsApi";
import { useApi } from "../../infrastructure/providers/http/UseApi";

const api = useApi();
const dataType = "surveys";

export interface SurveyRepository {
    getSurveys: () => Promise<Survey[]>;
    getSurveyById: (id: number) => Promise<Survey>;
    getSurveysMines: () => Promise<Survey[]>;
    deleteSurvey: (id: number) => Promise<Survey>;
    patchSurvey: (id: number, profile: SurveyDTO) => Promise<Survey>;
    postSurvey: (profile: SurveyDTO) => Promise<Survey>;
}

export class SurveyService implements SurveyRepository {
    getSurveys = async (): Promise<Survey[]> => handleApiCall(() => api.get(dataType));
    getSurveyById = async (id: number): Promise<Survey> => handleApiCall(() => api.get(`${dataType}/${id}`));
    getSurveysMines = async (): Promise<Survey[]> => handleApiCall(() => api.get(`${dataType}/mines`));
    deleteSurvey = async (id: number): Promise<Survey> => handleApiCall(() => api.delete(`${dataType}/${id}`));
    patchSurvey = async (id: number, profile: SurveyDTO): Promise<Survey> => {
        const formData = createFormData(profile);
        return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    };
    postSurvey = async (profile: SurveyDTO): Promise<Survey> => {
        const formData = createFormData(profile);
        return handleApiCall(() => api.post(dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    };
}
