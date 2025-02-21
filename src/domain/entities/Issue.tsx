import { Service } from "./Service";
import { User } from "./User";

export enum IssueStep {
    STEP_0,
    STEP_1,
    STEP_2
}
export const issueStep = Object.values(IssueStep).filter(step => typeof step === 'string');

export class Issue {
    id: number = 0;
    serviceId: number = 0;
    Service: Service = new Service();
    userId: number = 0;
    User: User = new User();
    userIdModo: number = 0;
    UserModo: User = new User();
    userIdModoResp: number = 0;
    UserModoResp: User = new User();
    description: string = '';
    image: string | File = '';
    date: Date | string = new Date();
    status: IssueStep | string = IssueStep.STEP_0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    constructor(data?: Partial<Issue>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

