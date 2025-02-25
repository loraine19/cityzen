import { Profile, AssistanceLevel, MailSubscriptions } from "../../domain/entities/Profile";




export class ProfileDTO implements Partial<Profile> {
    userIdSp: number = 0;
    addressId: number = 0;
    profile?: ProfileDTO;
    firstName: string = '';
    lastName: string = '';
    image: string | File = '';
    addressShared: boolean = false;
    assistance?: AssistanceLevel | string = AssistanceLevel.LEVEL_0;
    phone?: string;
    points?: number;
    skills?: string = '';
    mailSub?: MailSubscriptions | string = MailSubscriptions.SUB_1
    constructor(data?: Partial<ProfileDTO>) {
        if (data) {
            Object.assign(this, data);
        }
    }

}

