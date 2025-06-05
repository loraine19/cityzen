//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { ServiceRepositoryBase } from "../../domain/repositoriesBase/ServiceRepositoryBase";
import { Service, ServiceFindParams, ServicePage, ServiceUpdate } from "../../domain/entities/Service";
import { ApiServiceI } from "../providers/http/apiService";
import { ServiceDTO } from "../DTOs/ServiceDTO";


interface IData extends ServiceRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class ServiceRepositoryImpl implements ServiceRepositoryBase {
    private serviceData: IData;
    constructor({ serviceData }: { serviceData: IData }) { this.serviceData = serviceData }

    public async getServices(page?: number, params?: ServiceFindParams): Promise<ServicePage> {
        return await this.serviceData.getServices(page, params);
    }

    public async getServiceById(id: number): Promise<Service> {
        return this.serviceData.getServiceById(id);
    }

    public async postService(data: ServiceDTO): Promise<Service> {
        return this.serviceData.postService(data);
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
