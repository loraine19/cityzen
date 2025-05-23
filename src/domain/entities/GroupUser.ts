import { Group } from './Group';
import { User } from './User';

export class GroupUser {
    Group: Group = {} as Group;
    groupId: number = 0;
    user: User = {} as User;
    userId: number = 0;
    role: Role = Role.MEMBER;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    constructor(init?: Partial<GroupUser>) {
        Object.assign(this, init);
    }
}

export class GroupUserDTO {
    groupId?: number;
    userId?: number;
    role?: Role;
}

export enum Role {
    MEMBER = 'MEMBER',
    MODO = 'MODO',
}