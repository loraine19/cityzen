export interface Notif {
    title: string;
    id: number;
    element: ElementNotif;
    updatedAt: Date;
    [key: string]: any;
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