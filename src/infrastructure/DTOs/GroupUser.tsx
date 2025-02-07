import { Group } from './Group';
import { User } from './User';

export class GroupUser {
    id: number = 0;
    group: Group = new Group();
    groupId: number = 0;
    user: User = new User();
    userId: number = 0;
    role: Role = Role.MEMBER;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class GroupUserDTO {
    id?: number;
    groupId?: number;
    userId?: number;
    role?: Role;
}

export enum Role {
    MEMBER,
    GUEST,
    MODO
}