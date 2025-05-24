import { Address } from "./Address";
import { GroupUser } from "./GroupUser";

export class Group {
    id: number = 0;
    name: string = '';
    Address: Address = {} as Address;
    addressId: number = 0;
    area: number = 0;
    rules: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    GroupUser: GroupUser[] = [];
    category: GroupCategory = GroupCategory.CATEGORY_1;
    constructor(data?: Partial<Group>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export class GroupDTO implements Partial<Group> {
    addressId: number = 0;
    area: number = 0;
    description: string = '';
    name: string = '';
    rules: string = '';
}
export class GroupUpdateDTO implements Partial<GroupDTO> { }

export enum GroupFilter {
    MINE = 'MINE',
    IMODO = 'IMODO',
    IMIN = 'IMIN'
}

export enum GroupCategory {
    CATEGORY_1 = 'Quartier',
    CATEGORY_2 = 'Copropriété',
    CATEGORY_3 = 'Arrondissement',
    CATEGORY_4 = 'Par activité',
    CATEGORY_5 = 'autre',
}

export type GroupPage = { groups: Group[], count: number };