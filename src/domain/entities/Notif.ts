export class Notif {
    title: string = '';
    id: number = 0;
    element: ElementNotif = {} as ElementNotif;
    updatedAt: Date = new Date();
    read: boolean = false;
    userId: number = 0;
    constructor(data?: Partial<Notif>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}


export enum ElementNotif {
    POST,
    EVENT,
    SERVICE,
    ISSUE,
    SURVEY,
    POOL,
    FLAG,
}


export const notifCategory = Object.values(ElementNotif).filter(category => typeof category === 'string');