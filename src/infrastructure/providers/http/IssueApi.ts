import { Issue, IssuePage, IssueStep } from "../../../domain/entities/Issue";
import { IssueDTO } from "../../DTOs/IssueDTO";
import { ApiService } from "./apiService";

export class IssueApi {
    ;
    private readonly dataType: string = 'issues';
    private readonly api: ApiService;

    constructor() { this.api = new ApiService(); }

    async getIssues(page?: number, step?: string,): Promise<IssuePage> {
        const pageR = page ? `?page=${page}` : '';
        const stepR = step ? `&step=${step}` : '';
        return this.api.get(`${this.dataType}${pageR}${stepR}`)
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

    async updateIssueStep(id: number, update?: IssueStep): Promise<Issue> {
        const updateR = update ? `?update=${update}` : '';
        return this.api.put(`${this.dataType}/${id}${updateR}`)
    }

}