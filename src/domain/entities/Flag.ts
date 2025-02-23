import { Event } from "./Event";
import { Survey } from "./PoolSurvey";
import { Post } from "./Post";
import { Service } from "./Service";
import { User } from "./User";

export enum FlagReason {
    REASON_1 = "illicite",
    REASON_2 = "haineux",
    REASON_3 = "dangereux",
    REASON_4 = "irrespecteux",
    REASON_5 = "atteinte à la vie privé"
}


export enum FlagTarget {
    EVENT = 'evenement',
    POST = 'annonce',
    SURVEY = 'sondage',
    SERVICE = 'service',
}

export class Flag {
    user: User = {} as User;
    userId: number = 0;
    targetId: number = 0;
    target: FlagTarget = FlagTarget.EVENT;
    reason: FlagReason = FlagReason.REASON_1;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    title?: string = '';
    element: Event | Post | Survey | Service = {} as Event | Post | Survey | Service;
    constructor(data?: Partial<Flag>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}