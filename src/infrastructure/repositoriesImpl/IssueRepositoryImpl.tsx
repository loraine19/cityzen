import { Issue } from "../../domain/entities/Issue";
import { IssueRepositoryBase } from "../../domain/repositoriesBase/IssueRepository";
import { IssueDTO } from "../DTOs/IssueDTO";
import { ApiServiceI } from "../providers/http/apiService";



interface IData extends IssueRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class IssueRepositoryImpl implements IssueRepositoryBase {

    private issueData: IData;
    constructor({ issueData }: { issueData: IData }) { this.issueData = issueData }

    public async getIssues(): Promise<Issue[]> {
        return this.issueData.getIssues();
    }

    async getIssueById(id: number): Promise<Issue> {
        return this.issueData.getIssueById(id)
    }

    async deleteIssue(id: number): Promise<Issue> {
        return this.issueData.deleteIssue(id)
    }

    async putIssueFinish(id: number): Promise<Issue> {
        return this.issueData.putIssueFinish(id)
    }

    async patchIssue(id: number, data: IssueDTO): Promise<Issue> {
        return this.issueData.patchIssue(id, data)
    }

    async postIssue(data: IssueDTO): Promise<Issue> {
        return this.issueData.postIssue(data)
    }
}
