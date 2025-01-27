import { getCategories } from "../../infrastructure/services/utilsService";
import { Address } from "./Address";
import { Flag } from "./Flag";
import { Group } from "./Group";
import { Participant } from "./Participant";
import { User } from "./User";

export enum EventCategory {
    CATEGORY_1 = 'sport',
    CATEGORY_2 = 'social',
    CATEGORY_3 = 'culturelle',
    CATEGORY_4 = 'blob',
    CATEGORY_5 = 'autre',
}

export const eventCategoriesS = getCategories(EventCategory, true);
export const eventCategories = getCategories(EventCategory);

export class Event {
    Address: Address = new Address();
    addressId: number = 0;
    category: EventCategory | string = EventCategory.CATEGORY_1;
    createdAt: Date = new Date();
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

export class EventDTO {
    Address: Address = new Address();
    addressId: number = 0;
    category: EventCategory | string = EventCategory.CATEGORY_1;
    description: string = '';
    end: Date | string = new Date();
    image: string | File = '';
    participantsMin: number = 0;
    start: Date | string = new Date();
    title: string = '';
    userId?: number = 0;
    Participants?: Participant[];

    constructor(init?: Partial<EventDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof EventDTO];
                }
            });
        }
    }
}

export class EventUpdateDTO implements Partial<EventDTO> { }

export interface EventView extends Event {
    actif?: boolean;
    days: Date[] | string[];
    Igo: boolean;
    label: string;
    pourcent: number;
    flagged: boolean;
    mine: boolean;
    isValidate: boolean;
    agendaLink: string;
    eventDateInfo: string;
    toogleParticipate: () => Promise<EventView>;

}

export type EventPage = { events: Event[], count: number };

export type EventViewPage = { events: EventView[], count: number };

export enum EventFilter {
    MINE = 'MINE',
    IGO = 'IGO',
    VALIDATED = 'VALIDATE'
}