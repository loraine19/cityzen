import { Address } from "./Address";
import { User } from "./User";

export enum AssistanceLevel {
    LEVEL_0 = 0,
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    LEVEL_4 = 4
}
export const assistanceLevel = Object.values(AssistanceLevel).map(level => level);

export class Profile {
    user: User = new User();
    userId: number = 0;
    userIdSp: number = 0;
    addressId: number = 0;
    Address: Address = new Address();
    firstName: string = '';
    lastName: string = '';
    image: string | File = '';
    phone: string = '';
    addressShared: boolean = false;
    assistance: AssistanceLevel = AssistanceLevel.LEVEL_0;
    points: number = 0;
    skills: string[] = [''];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class ProfileDTO implements Partial<Profile> {
    userIdSp: number = 0;
    addressId: number = 0;
    profile?: ProfileDTO;
    firstName: string = '';
    lastName: string = '';
    image: string | File = '';
    addressShared: boolean = false;
    assistance: AssistanceLevel = AssistanceLevel.LEVEL_0;
    phone?: string;
    points?: number;
    skills?: string[];
}

export class ProfileUpdateDTO implements Partial<ProfileDTO> { }

export class ProfileView extends Profile {
    addressString: string = '';
    assistanceNumber: number = 0;
    conciliateur?: boolean = false;
    fullName?: string = '';
}