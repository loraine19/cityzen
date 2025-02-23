import { ApiServiceI } from "../providers/http/apiService";
import { PoolSurveyRepositoryBase } from "../../domain/repositoriesBase/PoolSurveyRepositoryBase";
import { Pool, PoolSurveyPage, Survey } from "../../domain/entities/PoolSurvey";

interface IData extends PoolSurveyRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class PoolSurveyRepositoryImpl implements PoolSurveyRepositoryBase {
    private poolSurveyData: IData;
    constructor({ poolSurveyData }: { poolSurveyData: IData }) { this.poolSurveyData = poolSurveyData }

    public async getPoolsSurveys(page?: number, filter?: string, subFilter?: string): Promise<PoolSurveyPage> {
        return await this.poolSurveyData.getPoolsSurveys(page, filter, subFilter);
    }

    public async getPoolById(id: number): Promise<Pool> {
        return this.poolSurveyData.getPoolById(id);
    }

    public async getSurveyById(id: number): Promise<Survey> {
        return this.poolSurveyData.getSurveyById(id)
    }

    public async postPool(data: Pool): Promise<Pool> {
        return this.poolSurveyData.postPool(data);
    }

}
