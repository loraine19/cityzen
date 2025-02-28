import { ElementNotif, Notif } from "../../domain/entities/Notif";



export class NotifDTO implements Partial<Notif> {
    title: string = '';
    id: number = 0;
    element: ElementNotif = ElementNotif.POST;
    updatedAt: Date = new Date();
    read: boolean = false;
    userId: number = 0;

    constructor(init?: Partial<NotifDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof NotifDTO];
                }
            });
        }
    }
}