import { Issue, IssuePage, IssueStep } from "../../../domain/entities/Issue";
import { IssueDTO } from "../../DTOs/IssueDTO";
import { ApiService } from "./apiService";

export class IssueApi {
    ;
    private readonly dataType: string = 'issues';
    private readonly api: ApiService;

    constructor() { this.api = new ApiService(); }

    async getIssues(page?: number, filter?: string): Promise<IssuePage> {
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        return this.api.get(`${this.dataType}${pageR}${filterR}`)
    }

    async getIssueById(serviceId: number): Promise<Issue> {
        return this.api.get(`${this.dataType}/${serviceId}`)
    }

    async postIssue(data: IssueDTO): Promise<Issue> {
        const formData = this.api.createFormData(data);
        return this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async updateIssue(serviceId: number, data: IssueDTO): Promise<Event> {
        const formData = this.api.createFormData(data);
        return this.api.patch(`${this.dataType}/${serviceId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async deleteIssue(id: number): Promise<void> {
        return this.api.delete(`${this.dataType}/${id}`)
    }

    async updateIssueResp(id: number, update?: IssueStep): Promise<Issue> {
        const updateR = update ? `?update=${update}` : '';
        return this.api.put(`${this.dataType}/${id}${updateR}`)
    }

    async updateIssueFinish(id: number, pourcent: number): Promise<Issue> {
        const data: { pourcent: number } = { pourcent }
        return this.api.put(`${this.dataType}/${id}`, data)
    }

}