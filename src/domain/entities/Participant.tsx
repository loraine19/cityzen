import { EventP } from "./Events";
import { User } from "./User";

export class Participant {
    User: User = new User();
    event: EventP = new EventP();
    eventId: number = 0;
    user: User = new User();
    userId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class ParticipantDTO {
    eventId: number = 0;
    userId?: number = 0;
}
export class ParticipantUpdateDTO implements Partial<ParticipantDTO> { }