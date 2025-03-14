//src/infrastructure/services/notifService.ts
import { Notif } from '../../../domain/entities/Notif';
import { PathElement } from '../../constants';


export class NotifView extends Notif {
    update: string;
    typeS: string = ''
    link: string = ''
    constructor(notif: Notif) {
        super(notif);
        this.link = this.baseURL + notif.link
        this.typeS = PathElement[notif.type as unknown as keyof typeof PathElement]
        this.update = ` le ${new Date(notif.updatedAt).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })} à ${new Date(notif.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`



    }

    private readonly baseURL = '';

    public readNotif(notif: Notif): void {
        notif.read = true;
    }



}


