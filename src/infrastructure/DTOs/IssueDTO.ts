import { IssueStep } from "../../domain/entities/Issue";


export class IssueDTO {
    serviceId?: number;
    userId?: number;
    description?: string;
    image?: string | File;
    status?: IssueStep | string;
    userIdModo?: number;
    userIdModoResp?: number;
    date?: Date | string;

    constructor(init?: Partial<IssueDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof IssueDTO];
                }
            });
        }
    }
}


