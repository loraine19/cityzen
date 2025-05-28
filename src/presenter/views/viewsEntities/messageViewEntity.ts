//src/infrastructure/services/notifService.ts
import { Message } from '../../../domain/entities/Message';
import { Notif } from '../../../domain/entities/Notif';
import { User } from '../../../domain/entities/User';


export class MessageView extends Message {
    IWrite: boolean;
    formatedDate: string = ''
    isWith: User = {} as User
    isDeleted: boolean = false;
    constructor(message: Message, userId: number) {
        super(message);
        this.IWrite = userId === message.userId
        this.isWith = userId === message.userId ? message.UserRec : message.User

        this.formatedDate = this.formatDate(message.createdAt)
        this.isDeleted = message.message === 'Ce message a été supprimé'
    }


    public readNotif(notif: Notif): void {
        notif.read = true;
    }

    private formatDate = (date: any): string => new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
        ?
        new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) :
        `${new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} ${new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`

}






