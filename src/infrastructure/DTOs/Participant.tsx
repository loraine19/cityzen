import { User } from "../../domain/entities/User";


export class Participant {
    User: User = {} as User;;
    event: Event = {} as Event;
    eventId: number = 0;
    userId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class ParticipantDTO {
    eventId: number = 0;
    userId?: number = 0;
}
export class ParticipantUpdateDTO implements Partial<ParticipantDTO> { }