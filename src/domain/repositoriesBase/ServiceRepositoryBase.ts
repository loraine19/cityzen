import { Service, ServiceDTO, ServiceUpdate } from "../entities/Service";


export abstract class ServiceRepositoryBase {
    abstract getServices(page?: number, mine?: boolean, type?: string, step?: string, category?: string): Promise<Service[]>;
    abstract getServiceById(id: number): Promise<Service>;
    abstract createService(data: ServiceDTO): Promise<Service>;
    abstract updateService(id: number, data: ServiceDTO): Promise<Service>;
    abstract updateServiceStep(id: number, update: ServiceUpdate): Promise<Service>;
    abstract deleteService(id: number): Promise<void>;
}
