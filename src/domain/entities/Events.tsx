import { Address } from "./Address";
import { Flag } from "./Flag";
import { Group } from "./Group";
import { Participant } from "./Participant";
import { User } from "./User";

export enum EventCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}

export class EventP {
    actif?: boolean;
    Address: Address = new Address();
    addressId: number = 0;
    category: EventCategory | string = EventCategory.CATEGORY_1;
    createdAt: Date = new Date();
    days: any;
    description: string = '';
    end: Date | string = new Date();
    Flags?: Flag[] = [new Flag()];
    group: Group = new Group();
    groupId: number = 0;
    id: number = 0;
    image: string | File = '';
    name: string = '';
    Participants: Participant[] = [new Participant()];
    participantsMin: number = 0;
    start: Date | string = new Date();
    title: string = '';
    updatedAt: Date = new Date();
    userId: number = 0;
    User: User = new User();
}
export const eventCategory = Object.values(EventCategory).filter(category => typeof category === 'string');

export class EventDTO implements Partial<EventP> {
    addressId: number = 0;
    category: EventCategory | string = EventCategory.CATEGORY_1;
    description: string = '';
    end: Date | string = new Date();
    groupId: number = 0;
    image: string | File = '';
    name: string = '';
    participantsMin: number = 0;
    start: Date | string = new Date();
    title: string = '';
    userId: number = 0;
}

export class EventPUpdateDTO implements Partial<EventDTO> { }
