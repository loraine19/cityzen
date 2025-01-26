
import { Service, ServiceDTO, ServiceUpdate } from "../../domain/entities/Service";
import { ServiceRepositoryBase } from "../../domain/repositoriesBase/ServiceRepositoryBase";

export class ServiceUseCase {
    private serviceRepository: ServiceRepositoryBase;

    constructor({ serviceRepository }: { serviceRepository: ServiceRepositoryBase }) {
        this.serviceRepository = serviceRepository;
    }

    public async getServices(page?: number, mine?: boolean, type?: string, step?: string, category?: string): Promise<Service[]> {
        const events = await this.serviceRepository.getServices(page, mine, type, step, category);
        return events;
    }

    public async getServiceById(id: number): Promise<Service> {
        return await this.serviceRepository.getServiceById(id)
    }

    public async createService(data: ServiceDTO): Promise<Service> {
        return await this.serviceRepository.createService(data)
    }

    public async updateService(id: number, data: ServiceDTO): Promise<Service> {
        return await this.serviceRepository.updateService(id, data)
    }

    public async updateServiceStep(id: number, update: ServiceUpdate): Promise<Service> {
        return await this.serviceRepository.updateServiceStep(id, update)
    }

    public async deleteService(id: number): Promise<void> {
        return await this.serviceRepository.deleteService(id)
    }

}

