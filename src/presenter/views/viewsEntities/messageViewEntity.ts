//src/infrastructure/services/notifService.ts
import { Message } from '../../../domain/entities/Message';
import { Notif } from '../../../domain/entities/Notif';


export class MessageView extends Message {
    IWrite: boolean;
    constructor(message: Message, userId: number) {
        super(message);
        this.IWrite = userId === message.User.id
    }


    public readNotif(notif: Notif): void {
        notif.read = true;
    }



}


