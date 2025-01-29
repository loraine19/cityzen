import { Profile } from './Profile'
import { GroupUser } from './GroupUser';

export enum UserStatus {
    ACTIVE,
    INACTIVE,
}

export class User {
    id: number;
    email: string;
    password: string;
    Profile: Profile;
    image: string | File;
    createdAt: Date;
    updatedAt: Date;
    lastConnection: Date;
    status: UserStatus;
    GroupUser: GroupUser;

    constructor() {
        this.id = 0;
        this.email = '';
        this.password = '';
        this.Profile = new Profile();
        this.image = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.lastConnection = new Date();
        this.status = UserStatus.INACTIVE;
        this.GroupUser = new GroupUser();
    }
}


export class UserUpdateDTO implements Partial<User> { }
export class UserDTO implements Partial<User> {
    email: string = '';
    password: string = '';
    status?: UserStatus | undefined;
}

