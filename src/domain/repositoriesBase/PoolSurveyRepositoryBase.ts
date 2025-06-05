import { PoolDTO, SurveyDTO } from "../../infrastructure/DTOs/PoolSurveyDTO";
import { Pool, PoolSurveyPage, PoolSurveysFindParams, Survey } from "../entities/PoolSurvey";




export abstract class PoolSurveyRepositoryBase {
    abstract getPoolsSurveys(page?: number, params?: PoolSurveysFindParams): Promise<PoolSurveyPage>;
    abstract getPoolById(id: number): Promise<Pool>;
    abstract getSurveyById(id: number): Promise<Survey>

    abstract postPool(data: PoolDTO): Promise<Pool>;
    abstract postSurvey(data: SurveyDTO): Promise<Survey>;

    abstract updatePool(id: number, data: PoolDTO): Promise<Pool>;
    abstract updateSurvey(id: number, data: SurveyDTO): Promise<Survey>;

    abstract deletePool(id: number): Promise<Pool>;
    abstract deleteSurvey(id: number): Promise<Survey>;

}