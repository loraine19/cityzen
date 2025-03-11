import { IssueDTO } from "../../infrastructure/DTOs/IssueDTO";
import { Issue, IssuePage, IssueUpdate } from "../entities/Issue";

// ISSUES
export abstract class IssueRepositoryBase {
    abstract getIssues(page?: number, filter?: string): Promise<IssuePage>;
    abstract getIssueById(id: number): Promise<Issue>;
    abstract postIssue(data: IssueDTO): Promise<Issue>;
    abstract updateIssue(id: number, data: IssueDTO): Promise<Issue>;
    abstract updateIssueResp(id: number, update?: IssueUpdate): Promise<Issue>;
    abstract updateIssueFinish(id: number, pourcent: number): Promise<Issue>;
    abstract deleteIssue(id: number): Promise<void>;
}


