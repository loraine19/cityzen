import { Address } from "./Address";
import { Label } from "./frontEntities";
import { getEnumLabel } from "./utilsEntity";

export enum AssistanceLevel {
    LEVEL_0 = '0',
    LEVEL_1 = '1',
    LEVEL_2 = '2',
    LEVEL_3 = '3',
    LEVEL_4 = '4'
}
export const assistanceLevel = getEnumLabel(AssistanceLevel);

export class Profile {
    userId: number = 0;
    userIdSp: number = 0;
    addressId: number = 0;
    Address: Address = {} as Address;
    firstName: string = '';
    lastName: string = '';
    image: string | File = '';
    phone: string = '';
    addressShared: boolean = false;
    assistance: AssistanceLevel | string = AssistanceLevel.LEVEL_0;
    points: number = 0;
    skills?: string = '';
    createdAt?: Date = new Date();
    updatedAt: Date = new Date();
    mailSub: MailSubscriptions | string = MailSubscriptions.SUB_1;
    constructor(data?: Partial<Profile>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export class ProfileDTO implements Partial<Profile> {
    Address = {} as Address;
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

export enum MailSubscriptions {
    SUB_1 = 'seulement les messages obligatoires',
    SUB_2 = 'les messages importants',
    SUB_3 = 'les messages importants et les mise à jour',
    SUB_4 = 'les messages importants, les mise à jour et les nouveautés ',
}
export const mailSubscriptions: Label[] = getEnumLabel(MailSubscriptions);