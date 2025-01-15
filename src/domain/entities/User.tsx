import { Profile } from './Profile'
import { GroupUser } from './GroupUser';

export enum UserStatus {
    ACTIVE,
    INACTIVE,
}

export class User {
    id: number = 0;
    email: string = '';
    password: string = '';
    Profile: Profile = new Profile();
    image: string | File = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    lastConnection: Date = new Date();
    status: UserStatus = UserStatus.INACTIVE;
    GroupUser: GroupUser = new GroupUser();
}



export class UserUpdateDTO implements Partial<User> { }
export class UserDTO implements Partial<User> {
    email: string = '';
    password: string = '';
    status?: UserStatus | undefined;
}