import { Service, ServicePage, ServiceUpdate } from "../../../domain/entities/Service";
import { ServiceDTO } from "../../DTOs/ServiceDTO";
import { ApiService } from "./apiService";

export class ServiceApi {
    ;
    private readonly dataType: string = 'services';
    private readonly api: ApiService;

    constructor() { this.api = new ApiService(); }

    async getServices(page?: number, mine?: boolean, type?: string, step?: string, category?: string): Promise<ServicePage> {
        const pageR = page ? `?page=${page}` : '';
        const mineR = mine ? `&mine=${mine}` : '';
        const typeR = type ? `&type=${type}` : '';
        const stepR = step ? `&step=${step}` : '';
        const categoryR = category ? `&category=${category}` : '';
        return this.api.get(`${this.dataType}${pageR}${mineR}${typeR}${stepR}${categoryR}`)
    }

    async getServiceById(id: number): Promise<Service> {
        return this.api.get(`${this.dataType}/${id}`)
    }

    async postService(data: ServiceDTO): Promise<Service> {
        const formData = this.api.createFormData(data);
        return this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async updateService(id: number, data: ServiceDTO): Promise<Event> {
        const formData = this.api.createFormData(data);
        return this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async deleteService(id: number): Promise<void> {
        return this.api.delete(`${this.dataType}/${id}`)
    }

    async updateServiceStep(id: number, update?: ServiceUpdate): Promise<Service> {
        const updateR = update ? `?update=${update}` : '';
        return this.api.put(`${this.dataType}/${id}${updateR}`)
    }

}