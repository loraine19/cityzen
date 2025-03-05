//src/infrastructure/services/notifService.ts
import { ElementNotif, Notif } from '../../../domain/entities/Notif';
import { PathElement } from '../../constants';


export class NotifView extends Notif {
    elementType: string = '';
    relation: string = '';
    update: string;
    constructor(notif: Notif, userId: number) {
        super(notif);
        this.elementType = this.getElementPath(notif.element);
        this.relation = notif.userId === userId ? "J'ai ecris " : "J'y participes";
        this.update = ` le ${new Date(notif.updatedAt).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })} à ${new Date(notif.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`


    }

    public readNotif(notif: Notif): void {
        notif.read = true;
    }

    private getElementPath(element: ElementNotif): string {
        switch (element) {
            case ElementNotif.POST:
                return PathElement.POST;
            case ElementNotif.EVENT:
                return PathElement.EVENT;
            case ElementNotif.SERVICE:
                return PathElement.SERVICE;
            case ElementNotif.ISSUE:
                return PathElement.ISSUE;
            case ElementNotif.SURVEY:
                return PathElement.SURVEY;
            case ElementNotif.POOL:
                return PathElement.POOL;
            case ElementNotif.FLAG:
                return PathElement.FLAG;
            default:
                return '';
        }
    }



}


