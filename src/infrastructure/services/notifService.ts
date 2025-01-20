//src/infrastructure/services/notifService.ts
import { Notif, NotifView } from "../../domain/entities/Notif";
import { GetPathElement } from "./utilsService";

interface NotifServiceI {
    loadNotifs(notifs: Notif[], userId: number): NotifView[];
    readNotif(notif: Notif): void;
}

export class NotifService implements NotifServiceI {
    constructor() { }

    loadNotifs(notifs: Notif[], userId: number): NotifView[] {
        if (!notifs) return [] as NotifView[];
        const newNotifs: NotifView[] = notifs.map(notif => {
            return {
                ...notif,
                elementType: GetPathElement(notif.element.toString().toLowerCase()),
                relation: notif.userId === userId ? "J'ai ecris " : "J'y participes",
                update: ` le ${new Date(notif.updatedAt).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })} à ${new Date(notif.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
            };
        });
        return newNotifs;
    }

    readNotif(notif: Notif): void {
        notif.read = true;
    }
}





