import { Address } from "./Address";

export class Notif {
    title: string = '';
    description: string = '';
    id: number = 0;
    updatedAt: Date = new Date();
    read: boolean = false;
    link?: string = '';
    Address?: Address = {} as Address;
    data: any = {};
    type: ElementNotif = ElementNotif.POST;
    level?: any = '';
    constructor(data?: Partial<Notif>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export type NotifPage = { notifs: Notif[], count: number, countMsg: number, countOther: number };


export enum ElementNotif {
    POST = 'POST',
    EVENT = 'EVENT',
    SERVICE = 'SERVICE',
    ISSUE = 'ISSUE',
    SURVEY = 'SURVEY',
    POOL = 'POOL',
    FLAG = 'FLAG',
    LIKE = 'LIKE',
    PARTICIPANT = 'PARTICIPANT',
    VOTE = 'VOTE',
    MESSAGE = 'MESSAGE'
}


export const notifCategory = Object.values(ElementNotif).filter(category => typeof category === 'string');