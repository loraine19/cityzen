//src/infrastructure/services/notifService.ts
import { Group, GroupCategory } from '../../../domain/entities/Group';
import { Role } from '../../../domain/entities/GroupUser';


export class GroupView extends Group {
    ImIn: boolean = false
    ImModo: boolean = false
    fullAddress: string = ''
    categoryS: string = ''
    constructor(group: Group, userId: number) {
        super(group);
        this.ImIn = group?.GroupUser?.find((gu) => gu.userId === userId) ? true : false
        this.ImModo = group?.GroupUser?.find((gu) => gu.userId === userId && gu.role === Role.MODO) ? true : false
        this.fullAddress = group?.Address?.address + ' ' + group?.Address?.zipcode + ' ' + group?.Address.city
        this.categoryS = GroupCategory[group?.category as string as keyof typeof GroupCategory]
    }


}


