import { Pool, PoolSurveyPage, Survey } from "../../domain/entities/PoolSurvey";
import { PoolSurveyRepositoryBase } from "../../domain/repositoriesBase/PoolSurveyRepositoryBase";
import { PoolDTO } from "../../infrastructure/DTOs/Pool";

export class GetPoolsSurveysUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(page?: number, filter?: string, step?: string,): Promise<PoolSurveyPage> {
        return await this.poolSurveyRepository.getPoolsSurveys(page, filter, step,);
    }
}

export class GetPoolByIdUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number): Promise<Pool> {
        return await this.poolSurveyRepository.getPoolById(id);
    }


}

export class GetSurveyByIdUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number): Promise<Survey> {
        return await this.poolSurveyRepository.getSurveyById(id);
    }
}

export class PostPoolUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(data: PoolDTO): Promise<Pool> {
        return await this.poolSurveyRepository.postPool(data);
    }
}





