import { createFormData, handleApiCall } from "./utilsApi";
import { useApi, Api } from "./UseApi";
import { Service, ServiceDTO } from "../../../domain/entities/Service";

export class ServiceApi {
    private readonly api: Api;
    private readonly dataType: string = 'services';

    constructor() { this.api = useApi() }
    async getServices(page?: number, mine?: boolean, type?: string, step?: string, category?: string): Promise<Service[]> {
        const pageR = page ? `?page=${page}` : '';
        const mineR = mine ? `&mine=${mine}` : '';
        const typeR = type ? `&type=${type}` : '';
        const stepR = step ? `&step=${step}` : '';
        const categoryR = category ? `&category=${category}` : '';
        console.log('pageR', pageR, 'mineR', mineR, 'typeR', typeR, 'stepR', stepR, 'categoryR', categoryR)
        const result = await handleApiCall(() => this.api.get(`${this.dataType}${pageR}${mineR}${typeR}${stepR}${categoryR}`));
        console.log('result', result)
        return result;
    }



    async getServiceById(id: number): Promise<Service> {
        return handleApiCall(() => this.api.get(`${this.dataType}/${id}`));
    }

    async postService(data: ServiceDTO): Promise<Service> {
        const formData = createFormData(data);
        return handleApiCall(() => this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }

    async updateService(id: number, data: ServiceDTO): Promise<Event> {
        const formData = createFormData(data);
        return handleApiCall(() => this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }


    async deleteService(id: number): Promise<void> {
        return handleApiCall(() => this.api.delete(`${this.dataType}/${id}`));
    }
    ;
    putService = async (id: number, userIdResp: number): Promise<Service> => handleApiCall(() => this.api.put(`${this.dataType}/userResp/${id}`, { userIdResp }));
    putServiceValidation = async (id: number, userIdResp: number): Promise<Service> => handleApiCall(() => this.api.put(`${this.dataType}/validUserResp/${id}`, { userIdResp }));
    putServiceFinish = async (id: number): Promise<Service> => handleApiCall(() => this.api.put(`${this.dataType}/finish/${id}`));


}