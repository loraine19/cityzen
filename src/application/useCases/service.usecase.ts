import { Service, ServicePage, ServiceUpdate } from "../../domain/entities/Service";
import { ServiceRepositoryBase } from "../../domain/repositoriesBase/ServiceRepositoryBase";
import { ServiceDTO } from "../../infrastructure/DTOs/ServiceDTO";

export class GetServicesUseCase {
    private serviceRepository: ServiceRepositoryBase;
    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }
    public async execute(page?: number, mine?: boolean, type?: string, step?: string, category?: string): Promise<ServicePage> {
        return await this.serviceRepository.getServices(page, mine, type, step, category);
    }
}

export class GetServiceByIdUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }

    public async execute(id: number): Promise<Service> {
        return await this.serviceRepository.getServiceById(id);
    }
}

export class PostServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }

    public async execute(data: ServiceDTO): Promise<Service> {
        return await this.serviceRepository.postService(data);
    }
}

export class UpdateServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }

    public async execute(id: number, data: ServiceDTO): Promise<Service> {
        return await this.serviceRepository.updateService(id, data);
    }
}

export class UpdateServiceStepUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }

    public async execute(id: number, update: ServiceUpdate): Promise<Service> {
        return await this.serviceRepository.updateServiceStep(id, update);
    }
}


export class RespServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }
    public async execute(id: number): Promise<Service> {
        return await this.serviceRepository.updateServiceStep(id, ServiceUpdate.POST_RESP);
    }
}

export class CancelRespServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }
    public async execute(id: number): Promise<Service> {
        return await this.serviceRepository.updateServiceStep(id, ServiceUpdate.CANCEL_RESP);
    }
}

export class ValidRespServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }
    public async execute(id: number): Promise<Service> {
        return await this.serviceRepository.updateServiceStep(id, ServiceUpdate.VALID_RESP);
    }
}

export class FinishServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }
    public async execute(id: number): Promise<Service> {
        return await this.serviceRepository.updateServiceStep(id, ServiceUpdate.FINISH);
    }
}

export class DeleteServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }

    public async execute(id: number): Promise<void> {
        return await this.serviceRepository.deleteService(id);
    }
}

