export interface Notif {
    title: string;
    id: number;
    element: ElementNotif;
    updatedAt: Date;
    read: boolean;
    userId: number;
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

export interface NotifView extends Notif {
    elementType: string;
    relation: string;
    update: string;
}
export const notifCategory = Object.values(ElementNotif).filter(category => typeof category === 'string');