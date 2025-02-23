import { Pool, PoolDTO, PoolSurveyPage } from "../../../domain/entities/PoolSurvey";
import { ApiServiceI, ApiService } from "./apiService";

export class PoolSurveyApi {
    private readonly dataType: string = 'poolsSurveys';
    private readonly api: ApiServiceI;

    constructor() {
        this.api = new ApiService();
        this.getPoolsSurveys = this.getPoolsSurveys.bind(this);
    }

    async getPoolsSurveys(page?: number, filter?: string, step?: string): Promise<PoolSurveyPage> {
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        const stepR = step ? `&step=${step}` : '';
        console.log(pageR, filterR, stepR);
        return this.api.get(`${this.dataType}${pageR}${filterR}${stepR}`);

    }

    async getPoolById(id: number): Promise<Pool> {
        return this.api.get(`pools/${id}`)
    }

    async getSurveyById(id: number): Promise<Pool> {
        return this.api.get(`surveys/${id}`)
    }

    async postPool(data: PoolDTO): Promise<Pool> {
        return this.api.post('pools', data);
    }
}
