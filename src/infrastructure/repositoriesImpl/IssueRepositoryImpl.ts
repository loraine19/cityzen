import { Issue, IssuePage, IssueUpdate } from "../../domain/entities/Issue";
import { IssueRepositoryBase } from "../../domain/repositoriesBase/IssueRepositoryBase";
import { IssueDTO } from "../DTOs/IssueDTO";
import { ApiServiceI } from "../providers/http/apiService";

interface IData extends IssueRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class IssueRepositoryImpl implements IssueRepositoryBase {

    private issueData: IData;
    constructor({ issueData }: { issueData: IData }) { this.issueData = issueData }

    public async getIssues(page: number, filter?: string): Promise<IssuePage> {
        return this.issueData.getIssues(page, filter);
    }

    async getIssueById(id: number): Promise<Issue> {
        return this.issueData.getIssueById(id)
    }

    async deleteIssue(id: number): Promise<void> {
        return this.issueData.deleteIssue(id)
    }

    async updateIssue(id: number, data: IssueDTO): Promise<Issue> {
        return this.issueData.updateIssue(id, data)
    }

    async updateIssueResp(id: number, step: IssueUpdate): Promise<Issue> {
        return this.issueData.updateIssueResp(id, step)
    }

    async updateIssueFinish(id: number, pourcent: number): Promise<Issue> {
        return this.issueData.updateIssueFinish(id, pourcent)
    }

    async postIssue(data: IssueDTO): Promise<Issue> {
        return this.issueData.postIssue(data)
    }
}
