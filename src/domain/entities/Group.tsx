import { Address } from "./Address";

export class Group {
    id: number = 0;
    name: string = '';
    description: string = '';
    address: Address = {} as Address;
    addressId: number = 0;
    area: number = 0;
    rules: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class GroupDTO implements Partial<Group> {
    addressId: number = 0;
    area: number = 0;
    description: string = '';
    name: string = '';
    rules: string = '';
}
export class GroupUpdateDTO implements Partial<GroupDTO> { }