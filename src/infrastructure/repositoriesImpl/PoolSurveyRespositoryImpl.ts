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

    public async postSurvey(data: Survey): Promise<Survey> {
        return this.poolSurveyData.postSurvey(data);
    }

    public async updatePool(id: number, data: Pool): Promise<Pool> {
        return this.poolSurveyData.updatePool(id, data);
    }

    public async updateSurvey(id: number, data: Survey): Promise<Survey> {
        return this.poolSurveyData.updateSurvey(id, data);
    }

    public async deletePool(id: number): Promise<Pool> {
        return this.poolSurveyData.deletePool(id);
    }

    public async deleteSurvey(id: number): Promise<Survey> {
        return this.poolSurveyData.deleteSurvey(id);
    }

}
