import { Event } from "./Event";
import { User } from "./User";

export class Participant {
    User: User = {} as User;
    event: Event = {} as Event;
    eventId: number = 0;
    userId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    constructor(data?: Partial<Participant>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
