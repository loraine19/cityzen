import { Role } from "../../domain/entities/GroupUser";



export class GroupUserDTO {
    groupId?: number;
    role?: Role = Role.MEMBER;
    constructor(init?: Partial<GroupUserDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof GroupUserDTO];
                }
            });
        }
    }

}

