import { Event } from "./Event";
import { Post } from "./Post";
import { Service } from "./Service";
import { Survey } from "./Survey";
import { User } from "./User";

export enum FlagReason {
    REASON_1,
    REASON_2,
    REASON_3,
    REASON_4,
    REASON_5
}
export const flagReason = Object.values(FlagReason).filter(reason => typeof reason === 'string');

export enum FlagTarget {
    EVENT,
    POST,
    SURVEY,
    SERVICE
}
export const flagTarget = Object.values(FlagTarget).filter(target => typeof target === 'string');

export class Flag {
    user: User = new User();
    userId: number = 0;
    targetId: number = 0;
    target: FlagTarget = FlagTarget.EVENT;
    reason: FlagReason = FlagReason.REASON_1;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Service?: Service = new Service();
    Post?: Post = new Post();
    Event?: Event = new Event();
    Survey?: Survey = new Survey();
}

export class FlagDTO {
    userId?: number;
    targetId?: number;
    target?: FlagTarget;
    reason?: FlagReason;
}