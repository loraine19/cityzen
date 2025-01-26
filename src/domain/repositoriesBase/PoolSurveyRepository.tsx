import { Pool } from "../entities/Pool";
import { Survey } from "../entities/Survey";
import { useApi, } from "../../infrastructure/providers/http/UseApi";
import { handleApiCall } from "../../infrastructure/providers/http/utilsApi";

const api = useApi();
const dataType = "pools";

export interface PoolSurveyRepository {
    getPoolsSurveys: () => Promise<(Pool | Survey)[]>,
    getPoolsSurveysMines: () => Promise<(Pool | Survey)[]>,
    getPoolsSurveysNew: () => Promise<(Pool | Survey)[]>,
}

export class PoolSurveyService implements PoolSurveyRepository {
    getPoolsSurveys = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(dataType));
    getPoolsSurveysMines = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(`${dataType}/mines`));
    getPoolsSurveysNew = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(`${dataType}/new`));
}