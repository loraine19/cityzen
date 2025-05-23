//src/application/useCases/notif/getNotifs.usecase.ts
import { FlagTarget } from "../../domain/entities/Flag";
import { FlagRepositoryBase } from "../../domain/repositoriesBase/FlagRepositoryBase";
import { FlagDTO } from "../../infrastructure/DTOs/FlagDTO";



export class GetFlagsUseCase {
    private flagRepository: FlagRepositoryBase;

    constructor({ flagRepository }: { flagRepository: FlagRepositoryBase }) {
        this.flagRepository = flagRepository;
    }
    public async execute(page: number, filter: FlagTarget): Promise<any> {
        return this.flagRepository.getFlags(page, filter);
    }

}

export class GetFlagByIdUseCase {
    private flagRepository: FlagRepositoryBase;

    constructor({ flagRepository }: { flagRepository: FlagRepositoryBase }) {
        this.flagRepository = flagRepository;
    }
    public async execute(id: number, target: FlagTarget): Promise<any> {
        return this.flagRepository.getFlagById(id, target);
    }

}

export class PostFlagUseCase {
    private flagRepository: FlagRepositoryBase;

    constructor({ flagRepository }: { flagRepository: FlagRepositoryBase }) {
        this.flagRepository = flagRepository;
    }
    public async execute(data: FlagDTO): Promise<any> {
        return this.flagRepository.postFlag(data);
    }

}

export class DeleteFlagUseCase {
    private flagRepository: FlagRepositoryBase;

    constructor({ flagRepository }: { flagRepository: FlagRepositoryBase }) {
        this.flagRepository = flagRepository;
    }
    public async execute(id: number, target: FlagTarget): Promise<any> {
        return this.flagRepository.deleteFlag(id, target);
    }
}

