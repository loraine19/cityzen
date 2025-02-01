import { ApiService } from "../../infrastructure/providers/http/apiService";
import { Issue, IssueDTO } from "../entities/Issue";

const api: ApiService = new ApiService();
const dataType = "issues";

// ISSUES
export interface IssueRepository {
    getIssues: () => Promise<Issue[]>;
    getIssueById: (id: number) => Promise<Issue>;
    getIssuesMines: () => Promise<Issue[]>;
    getIssuesByResp: (id: number) => Promise<Issue[]>;
    deleteIssue: (id: number) => Promise<Issue>;
    putIssueFinish: (id: number) => Promise<Issue>;
    patchIssue: (id: number, element: IssueDTO) => Promise<Issue>;
    postIssue: (element: IssueDTO) => Promise<Issue>;
}

export class IssueService implements IssueRepository {
    async getIssues(): Promise<Issue[]> {
        return api.get(dataType)
    }

    async getIssueById(id: number): Promise<Issue> {
        return api.get(`${dataType}/${id}`)
    }

    async getIssuesMines(): Promise<Issue[]> {
        return api.get(`${dataType}/mines`)
    }

    async getIssuesByResp(id: number): Promise<Issue[]> {
        return api.get(`${dataType}/resp/${id}`)
    }

    async deleteIssue(id: number): Promise<Issue> {
        return api.delete(`${dataType}/${id}`)
    }

    async putIssueFinish(id: number): Promise<Issue> {
        return api.put(`${dataType}/finish/${id}`)
    }

    async patchIssue(id: number, element: IssueDTO): Promise<Issue> {
        const formData = api.createFormData(element);
        return api.patch(`${dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async postIssue(element: IssueDTO): Promise<Issue> {
        const formData = api.createFormData(element);
        return api.post(dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}
