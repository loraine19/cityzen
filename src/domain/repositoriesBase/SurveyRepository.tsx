import { ApiService } from "../../infrastructure/providers/http/apiService";
import { Survey, SurveyDTO } from "../entities/Survey";

const api: ApiService = new ApiService();
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
    getSurveys = async (): Promise<Survey[]> => api.get(dataType)
    getSurveyById = async (id: number): Promise<Survey> => api.get(`${dataType}/${id}`)
    getSurveysMines = async (): Promise<Survey[]> => api.get(`${dataType}/mines`)
    deleteSurvey = async (id: number): Promise<Survey> => api.delete(`${dataType}/${id}`)
    patchSurvey = async (id: number, profile: SurveyDTO): Promise<Survey> => {
        const formData = api.createFormData(profile);
        return api.patch(`${dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    };
    postSurvey = async (profile: SurveyDTO): Promise<Survey> => {
        const formData = api.createFormData(profile);
        return api.post(dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    };
}
