import { ServiceDTO, Service, ServiceStep } from "../../types/class";
import { useApi, createFormData, handleApiCall, } from "./useApi";


const api = useApi();
const dataType = "services";

export const getServices = async (): Promise<Service[]> => handleApiCall(() => api.get(dataType));


export const getServicesMore = async (): Promise<Service[]> => handleApiCall(() => api.get(dataType));

export const getServicesByTag = async (category: string): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/${category}`));

export const getServiceById = async (id: number): Promise<Service> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getServicesMines = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/mines`));
export const getServicesImIn = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/imin`));
export const getServicesImInStatus = async (status: any): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/iminStatus?status=${status}`));
export const getServicesImInGet = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/imin/get`));
export const getServicesImInDo = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/imin/do`));
export const getServicesIResp = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/iresp`));
export const getServicesGet = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/get`));
export const getServicesDo = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/do`));
export const getServicesValidated = async (): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/validated`));
export const getServicesByUser = async (id: number): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));
export const getServicesByResp = async (id: number): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/resp/${id}`));

export const searchServices = async (elementToSearch: string): Promise<Service[]> => handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));

//// ACTIONS
export const deleteService = async (id: number): Promise<Service> => handleApiCall(() => api.delete(`${dataType}/${id}`));

export const putService = async (id: number, userIdResp: number): Promise<Service> => handleApiCall(() => api.put(`${dataType}/userResp/${id}`, { userIdResp }))

export const putServiceValidation = async (id: number, userIdResp: number): Promise<Service> => handleApiCall(() => api.put(`${dataType}/validUserResp/${id}`, { userIdResp }))

export const putServiceFinish = async (id: number): Promise<Service> => handleApiCall(() => api.put(`${dataType}/finish/${id}`));

export const patchService = async (id: number, element: ServiceDTO): Promise<Service> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

export const postService = async (element: ServiceDTO): Promise<Service> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.post(dataType, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};
