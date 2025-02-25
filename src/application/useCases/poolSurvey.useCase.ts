import { Pool, PoolSurveyPage, Survey } from "../../domain/entities/PoolSurvey";
import { PoolSurveyRepositoryBase } from "../../domain/repositoriesBase/PoolSurveyRepositoryBase";
import { PoolDTO } from "../../infrastructure/DTOs/PoolSurveyDTO";

export class GetPoolsSurveysUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(page?: number, filter?: string, step?: string,): Promise<PoolSurveyPage> {
        return await this.poolSurveyRepository.getPoolsSurveys(page, filter, step,);
    }
}

////POOLS

export class GetPoolByIdUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number): Promise<Pool> {
        return await this.poolSurveyRepository.getPoolById(id);
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

export class UpdatePoolUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number, data: PoolDTO): Promise<Pool> {
        return await this.poolSurveyRepository.updatePool(id, data);
    }
}

export class DeletePoolUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number): Promise<Pool> {
        return await this.poolSurveyRepository.deletePool(id);
    }
}

////SURVEYS

export class GetSurveyByIdUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number): Promise<Survey> {
        return await this.poolSurveyRepository.getSurveyById(id);
    }
}

export class PostSurveyUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(data: PoolDTO): Promise<Survey> {
        return await this.poolSurveyRepository.postSurvey(data);
    }
}

export class UpdateSurveyUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number, data: PoolDTO): Promise<Survey> {
        return await this.poolSurveyRepository.updateSurvey(id, data);
    }
}

export class DeleteSurveyUseCase {
    private poolSurveyRepository: PoolSurveyRepositoryBase;
    constructor({ poolSurveyRepository }: { poolSurveyRepository: PoolSurveyRepositoryBase }) {
        this.poolSurveyRepository = poolSurveyRepository;
    }
    public async execute(id: number): Promise<Survey> {
        return await this.poolSurveyRepository.deleteSurvey(id);
    }
}






