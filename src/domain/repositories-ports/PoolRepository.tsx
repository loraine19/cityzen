import { Pool, PoolDTO } from "../entities/Pool";
import { Survey } from "../entities/Survey";
import { useApi, } from "../../infrastructure/providers/http/UseApi";
import { handleApiCall } from "../../infrastructure/providers/http/utilsApi";

const api = useApi();
const dataTypeComb = "pools-surveys";
const dataType = "pools";

export interface PoolSurveyRepository {
    getPoolsSurveys: () => Promise<(Pool | Survey)[]>,
    getPoolsSurveysMines: () => Promise<(Pool | Survey)[]>,
    getPoolsSurveysNew: () => Promise<(Pool | Survey)[]>,
}

export class PoolSurveyService implements PoolSurveyRepository {
    getPoolsSurveys = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(dataTypeComb));
    getPoolsSurveysMines = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(`${dataType}/mines`));
    getPoolsSurveysNew = async (): Promise<(Pool | Survey)[]> => handleApiCall(() => api.get(`${dataType}/new`));
}

export interface PoolRepository {
    getPools: () => Promise<Pool[]>,
    getPoolById: (id: number) => Promise<Pool>,
    getPoolsMines: () => Promise<Pool[]>,
    deletePool: (id: number) => Promise<Pool>,
    patchPool: (id: number, profile: PoolDTO) => Promise<Pool>,
    postPool: (profile: PoolDTO) => Promise<Pool>,
}

export class PoolService implements PoolRepository {
    getPools = async (): Promise<Pool[]> => handleApiCall(() => api.get(dataType));
    getPoolById = async (id: number): Promise<Pool> => handleApiCall(() => api.get(`${dataType}/${id}`));
    getPoolsMines = async (): Promise<Pool[]> => handleApiCall(() => api.get(`${dataType}/mines`));
    deletePool = async (id: number): Promise<Pool> => handleApiCall(() => api.delete(`${dataType}/${id}`));
    patchPool = async (id: number, data: PoolDTO): Promise<Pool> => handleApiCall(() => api.patch(`${dataType}/${id}`, data));
    postPool = async (data: PoolDTO): Promise<Pool> => handleApiCall(() => api.post(dataType, data));
}
