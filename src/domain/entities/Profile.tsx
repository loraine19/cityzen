import { Address } from "./Address";
import { User } from "./User";

export enum AssistanceLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
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
