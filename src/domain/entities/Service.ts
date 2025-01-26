import { Address } from './Address';
import { User } from './User';
import { Flag } from './Flag';

export enum ServiceType {
    GET,
    DO
}
export const serviceType = Object.values(ServiceType).filter(type => typeof type === 'string');

export enum ServiceStep {
    STEP_0,
    STEP_1,
    STEP_2,
    STEP_3,
    STEP_4
}
export const serviceStep = Object.values(ServiceStep).filter(step => typeof step === 'string');

export enum SkillLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}

export enum HardLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}

export enum ServiceCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}
export const serviceCategory = Object.values(ServiceCategory).filter(category => typeof category === 'string');
export class Service {
    id: number = 0;
    name: string = '';
    description: string = '';
    address: Address = new Address();
    userId: number = 0;
    User: User = new User();
    image: string | File = '';
    title: string = '';
    category: ServiceCategory = ServiceCategory.CATEGORY_1;
    userIdResp: number = 0;
    UserResp: User = new User();
    type: ServiceType = ServiceType.GET;
    skill: SkillLevel = SkillLevel.LEVEL_0;
    hard: HardLevel = HardLevel.LEVEL_0;
    status: ServiceStep = ServiceStep.STEP_0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Flags?: Flag[] = [new Flag()];
}


export class ServiceDTO {
    description?: string;
    addressId?: number;
    image?: string | File;
    title?: string;
    category?: ServiceCategory;
    userIdResp?: number;
    type?: ServiceType;
    skill?: SkillLevel;
    hard?: HardLevel;
    status?: ServiceStep;
}

export enum ServiceUpdate {
    POST_RESP = 'POSTRESP',
    VALIDATE_RESP = 'VALIDATERESP',
    REFUSE_RESP = 'REFUSERESP',
    FINISH = 'FINISH',
}

export enum ServiceFilter {
    GET = 'GET',
    DO = 'DO',
    MINE = 'MINE'
}
