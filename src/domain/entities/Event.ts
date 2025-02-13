//import { getEnumLabel } from "../../infrastructure/services/utilsService";
import { EventView } from "../../presenter/views/viewsEntities/eventViewEntities";
import { Address } from "./Address";
import { Flag } from "./Flag";
import { Participant } from "./Participant";
import { User } from "./User";

export enum EventCategory {
    CATEGORY_1 = 'sport',
    CATEGORY_2 = 'social',
    CATEGORY_3 = 'culturelle',
    CATEGORY_4 = 'blob',
    CATEGORY_5 = 'autre',
}


export class Event {
    Address: Address = {} as Address;
    Flags?: Flag[] = [];
    Participants: Participant[] = [];
    User: User = {} as User;
    addressId: number = 0;
    category: EventCategory | string = EventCategory.CATEGORY_1;
    createdAt: Date = new Date();
    description: string = '';
    end: Date | string = new Date();
    id: number = 0;
    image: string | File = '';
    participantsMin: number = 0;
    start: Date | string = new Date();
    title: string = '';
    updatedAt: Date = new Date();
    userId: number = 0;
    constructor(data?: Partial<Event>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export type EventPage = { events: Event[], count: number };

export type EventViewPage = { events: EventView[], count: number };

export enum EventFilter {
    MINE = 'MINE',
    IGO = 'IGO',
    VALIDATED = 'VALIDATE'
}