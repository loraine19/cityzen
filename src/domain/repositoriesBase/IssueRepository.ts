import { IssueDTO } from "../../infrastructure/DTOs/IssueDTO";
import { Issue } from "../entities/Issue";

// ISSUES
export interface IssueRepositoryBase {
    getIssues: () => Promise<Issue[]>;
    getIssueById: (id: number) => Promise<Issue>;
    deleteIssue: (id: number) => Promise<Issue>;
    putIssueFinish: (id: number) => Promise<Issue>;
    patchIssue: (id: number, element: IssueDTO) => Promise<Issue>;
    postIssue: (element: IssueDTO) => Promise<Issue>;
}


