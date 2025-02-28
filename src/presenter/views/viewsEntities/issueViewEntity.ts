//src/infrastructure/services/serviceService.ts
import { Issue } from "../../../domain/entities/Issue";


export class IssueView extends Issue {
    mine: boolean = false;
    ImIn: boolean = false;

    constructor(issue: Issue, userId: number) {
        super(issue);
        this.mine = issue.userId === userId
        this.ImIn = !this.mine && (issue.Service.userId === userId || issue.Service.userIdResp === userId)


    }


}