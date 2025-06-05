import { ApiServiceI } from "../providers/http/apiService";
import { PoolSurveyRepositoryBase } from "../../domain/repositoriesBase/PoolSurveyRepositoryBase";
import { Pool, PoolSurveyPage, PoolSurveysFindParams, Survey } from "../../domain/entities/PoolSurvey";
import { PoolDTO, SurveyDTO } from "../DTOs/PoolSurveyDTO";

interface IData extends PoolSurveyRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class PoolSurveyRepositoryImpl implements PoolSurveyRepositoryBase {
    private poolSurveyData: IData;
    constructor({ poolSurveyData }: { poolSurveyData: IData }) { this.poolSurveyData = poolSurveyData }

    public async getPoolsSurveys(page?: number, params?: PoolSurveysFindParams): Promise<PoolSurveyPage> {
        return await this.poolSurveyData.getPoolsSurveys(page, params);
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

    public async updatePool(id: number, data: PoolDTO): Promise<Pool> {
        return this.poolSurveyData.updatePool(id, data);
    }

    public async updateSurvey(id: number, data: SurveyDTO): Promise<Survey> {
        return this.poolSurveyData.updateSurvey(id, data);
    }

    public async deletePool(id: number): Promise<Pool> {
        return this.poolSurveyData.deletePool(id);
    }

    public async deleteSurvey(id: number): Promise<Survey> {
        return this.poolSurveyData.deleteSurvey(id);
    }

}
