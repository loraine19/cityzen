import { Service } from "./Service";
import { User } from "./User";


export class Issue {
    serviceId: number = 0;
    Service: Service = new Service();
    userId: number = 0;
    User: User = new User();
    userIdModo: number = 0;
    UserModo: User = new User();
    userIdModoOn: number = 0;
    UserModoOn: User = new User();
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

export type IssuePage = {
    issues: Issue[],
    count: number
}

export enum IssueUpdate {
    POST_MODO2 = 'POST_MODO2',
    VALID_MODO = 'VALID_MODO',
    VALID_MODO2 = 'VALID_MODO2',
    FINISH = 'FINISH',
    FINISH2 = 'FINISH2',
}

export enum IssueStep {
    STEP_0 = 'attente choix du 2eme conciliateur',
    STEP_1 = 'attente validation conciliateur',
    STEP_2 = 'attente validation 2em conciliateur',
    STEP_3 = 'attente decision conciliateur',
    STEP_4 = 'attente decision 2em conciliateur',
    STEP_5 = 'terminé',
}

export enum IssueFilter {
    WAITING = 'WAITING',
    PENDING = 'PENDING',
    FINISH = 'FINISH',
}
