import { Issue } from "../../../domain/entities/Issue";
import { IssueDTO } from "../../DTOs/IssueDTO";
import { ApiServiceI, ApiService } from "./apiService";


export class IssueApi {
    private readonly dataType: string = 'issue';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getIssues(): Promise<Issue[]> {
        return this.api.get(this.dataType)
    }

    async getIssueById(id: number): Promise<Issue> {
        return this.api.get(`${this.dataType}/${id}`)
    }

    async getIssuesMines(): Promise<Issue[]> {
        return this.api.get(`${this.dataType}/mines`)
    }

    async getIssuesByResp(id: number): Promise<Issue[]> {
        return this.api.get(`${this.dataType}/resp/${id}`)
    }

    async deleteIssue(id: number): Promise<Issue> {
        return this.api.delete(`${this.dataType}/${id}`)
    }

    async putIssueFinish(id: number): Promise<Issue> {
        return this.api.put(`${this.dataType}/finish/${id}`)
    }

    async patchIssue(id: number, element: IssueDTO): Promise<Issue> {
        const formData = this.api.createFormData(element);
        return this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async postIssue(element: IssueDTO): Promise<Issue> {
        const formData = this.api.createFormData(element);
        return this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}
