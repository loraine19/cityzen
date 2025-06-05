import { ServiceDTO } from "../../infrastructure/DTOs/ServiceDTO";
import { Service, ServiceFindParams, ServicePage, ServiceUpdate } from "../entities/Service";


export abstract class ServiceRepositoryBase {
    abstract getServices(page?: number, params?: ServiceFindParams): Promise<ServicePage>;
    abstract getServiceById(id: number): Promise<Service>;
    abstract postService(data: ServiceDTO): Promise<Service>;
    abstract updateService(id: number, data: ServiceDTO): Promise<Service>;
    abstract updateServiceStep(id: number, update: ServiceUpdate): Promise<Service>;
    abstract deleteService(id: number): Promise<void>;
}
