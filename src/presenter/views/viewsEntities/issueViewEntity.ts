//src/infrastructure/services/serviceService.ts
import { Issue, IssueStep } from "../../../domain/entities/Issue";
import { User } from "../../../domain/entities/User";


export class IssueView extends Issue {
    mine: boolean = false;
    onMe: boolean = false;
    ImModo: boolean = false;
    ImModoResp: boolean = false;
    statusS: string = IssueStep[this.status as keyof typeof IssueStep]
    stepValue: number = parseInt(this.status.toString().replace('STEP_', ''))
    UserOn: User = {} as User

    constructor(issue: Issue, userId: number) {
        super(issue);
        this.mine = issue?.userId === userId
        this.ImModo = this.userIdModo === userId
        this.ImModoResp = this.userIdModoResp === userId
        this.UserOn = issue.userId === issue.Service.userId ? issue.Service.UserResp : issue.Service.User
        this.onMe = this.UserOn.id === userId
    }
}