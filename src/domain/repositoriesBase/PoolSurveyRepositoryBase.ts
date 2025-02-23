import { PoolDTO } from "../../infrastructure/DTOs/Pool";
import { Pool, PoolSurveyPage, Survey } from "../entities/PoolSurvey";




export abstract class PoolSurveyRepositoryBase {
    abstract getPoolsSurveys(page?: number, filter?: string, subFilter?: string): Promise<PoolSurveyPage>;
    abstract getPoolById(id: number): Promise<Pool>;
    abstract getSurveyById(id: number): Promise<Survey>

    abstract postPool(data: PoolDTO): Promise<Pool>;

}