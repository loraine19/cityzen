//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { ServiceRepositoryBase } from "../../domain/repositoriesBase/ServiceRepositoryBase";
import { Service, ServiceDTO, ServiceUpdate } from "../../domain/entities/Service";
import { Api } from "../providers/http/UseApi";

interface IData extends ServiceRepositoryBase {
    api: Api;
    dataType: string;
}

export class ServiceRepositoryImpl implements ServiceRepositoryBase {
    private serviceData: IData;
    constructor({ serviceData }: { serviceData: IData }) { this.serviceData = serviceData }

    public async getServices(page?: number, mine?: boolean, type?: string, step?: string, category?: string): Promise<Service[]> {
        return await this.serviceData.getServices(page, mine, type, step, category);
    }

    public async getServiceById(id: number): Promise<Service> {
        return this.serviceData.getServiceById(id);
    }

    public async createService(data: ServiceDTO): Promise<Service> {
        return this.serviceData.createService(data);
    }

    public async updateService(id: number, data: ServiceDTO): Promise<Service> {
        return this.serviceData.updateService(id, data);
    }

    public async updateServiceStep(id: number, update: ServiceUpdate): Promise<Service> {
        return this.serviceData.updateServiceStep(id, update);
    }

    public async deleteService(id: number): Promise<void> {
        return this.serviceData.deleteService(id);
    }
}
