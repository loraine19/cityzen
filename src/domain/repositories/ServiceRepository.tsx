import { Service, ServiceDTO } from "../../domain/entities/Service";
import { createFormData } from "../../infrastructure/api/apiUtils";
import { useApi, handleApiCall } from "../../infrastructure/api/useApi";

const api = useApi();
const dataType = "services";

export interface ServiceRepository {
    getServices: () => Promise<Service[]>
    getServicesByTag: (category: string) => Promise<Service[]>
    getServiceById: (id: number) => Promise<Service>
    getServicesMines: () => Promise<Service[]>
    getServicesImIn: () => Promise<Service[]>
    getServicesImInStatus: (status: any) => Promise<Service[]>
    getServicesImInGet: () => Promise<Service[]>
    getServicesImInDo: () => Promise<Service[]>
    getServicesIResp: () => Promise<Service[]>
    getServicesGet: () => Promise<Service[]>
    getServicesDo: () => Promise<Service[]>
    getServicesValidated: () => Promise<Service[]>
    getServicesByUser: (id: number) => Promise<Service[]>
    getServicesByResp: (id: number) => Promise<Service[]>
    deleteService: (id: number) => Promise<Service>
    putService: (id: number, userIdResp: number) => Promise<Service>
    putServiceValidation: (id: number, userIdResp: number) => Promise<Service>
    putServiceFinish: (id: number) => Promise<Service>
    patchService: (id: number, element: ServiceDTO) => Promise<Service>
    postService: (element: ServiceDTO) => Promise<Service>
}

export class ServiceService implements ServiceRepository {
    getServices = async (): Promise<Service[]> => handleApiCall(() => api.get(dataType));
    getServicesByTag = async (category: string): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/${category}`));
    getServiceById = async (id: number): Promise<Service> => handleApiCall(() => api.get(`${dataType}/${id}`));
    getServicesMines = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/mines`));
    getServicesImIn = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/imin`));
    getServicesImInStatus = async (status: any): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/iminStatus?status=${status}`));
    getServicesImInGet = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/imin/get`));
    getServicesImInDo = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/imin/do`));
    getServicesIResp = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/iresp`));
    getServicesGet = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/get`));
    getServicesDo = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/do`));
    getServicesValidated = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/validated`));
    getServicesByUser = async (id: number): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));
    getServicesByResp = async (id: number): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/resp/${id}`));
    deleteService = async (id: number): Promise<Service> => handleApiCall(() => api.delete(`${dataType}/${id}`));
    putService = async (id: number, userIdResp: number): Promise<Service> => handleApiCall(() => api.put(`${dataType}/userResp/${id}`, { userIdResp }));
    putServiceValidation = async (id: number, userIdResp: number): Promise<Service> => handleApiCall(() => api.put(`${dataType}/validUserResp/${id}`, { userIdResp }));
    putServiceFinish = async (id: number): Promise<Service> => handleApiCall(() => api.put(`${dataType}/finish/${id}`));
    patchService = async (id: number, element: ServiceDTO): Promise<Service> => {
        const formData = createFormData(element);
        return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    };
    postService = async (element: ServiceDTO): Promise<Service> => {
        const formData = createFormData(element);
        return handleApiCall(() => api.post(dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    };
}