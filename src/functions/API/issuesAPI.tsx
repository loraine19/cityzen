import { IssueDTO, Issue } from "../../types/class";
import { useApi, createFormData, handleApiCall, } from "./useApi";


const api = useApi();
const dataType = "issues";

export const getIssues = async (): Promise<Issue[]> => handleApiCall(() => api.get(dataType));


export const getIssuesMore = async (): Promise<Issue[]> => handleApiCall(() => api.get(dataType));

export const getIssuesByTag = async (category: string): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/${category}`));

export const getIssueById = async (id: number): Promise<Issue> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getIssuesMines = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/mines`));
export const getIssuesImIn = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/imin`));
export const getIssuesImInStatus = async (status: any): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/iminStatus?status=${status}`));
export const getIssuesImInGet = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/imin/get`));
export const getIssuesImInDo = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/imin/do`));
export const getIssuesIResp = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/iresp`));
export const getIssuesGet = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/get`));
export const getIssuesDo = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/do`));
export const getIssuesValidated = async (): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/validated`));
export const getIssuesByUser = async (id: number): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));
export const getIssuesByResp = async (id: number): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/resp/${id}`));

export const searchIssues = async (elementToSearch: string): Promise<Issue[]> => handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));

//// ACTIONS
export const deleteIssue = async (id: number): Promise<Issue> => handleApiCall(() => api.delete(`${dataType}/${id}`));

export const putIssue = async (id: number, userIdResp: number): Promise<Issue> => handleApiCall(() => api.put(`${dataType}/userResp/${id}`, { userIdResp }))

export const putIssueValidation = async (id: number, userIdResp: number): Promise<Issue> => handleApiCall(() => api.put(`${dataType}/validUserResp/${id}`, { userIdResp }))

export const putIssueFinish = async (id: number): Promise<Issue> => handleApiCall(() => api.put(`${dataType}/finish/${id}`));

export const patchIssue = async (id: number, element: IssueDTO): Promise<Issue> => {
    const formData = createFormData(element);
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

export const postIssue = async (element: IssueDTO): Promise<Issue> => {
    console.log("element", element)
    const formData = createFormData(element);
    return handleApiCall(() => api.post(dataType, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};
