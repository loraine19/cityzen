import { AssistanceLevel, MailSubscriptions } from "../../domain/entities/Profile";
import { AddressDTO } from "./AddressDTO";




export class ProfileDTO {
    Address?: AddressDTO = {} as AddressDTO;
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
    constructor(init?: Partial<ProfileDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof ProfileDTO];
                }
            });
        }
    }

}

