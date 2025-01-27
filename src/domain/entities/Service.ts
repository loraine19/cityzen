import { Address } from './Address';
import { User } from './User';
import { Flag } from './Flag';
import { Label } from './frontEntities';
import { getCategories } from '../../infrastructure/services/utilsService';

export enum ServiceType {
    GET = 'GET',
    DO = 'DO'
}
export const serviceType = Object.values(ServiceType).filter(type => typeof type === 'string');

export enum ServiceStep {
    STEP_0 = "nouveau",
    STEP_1 = "en attente",
    STEP_2 = "en cours",
    STEP_3 = "terminé",
    STEP_4 = "litige"
}
export const serviceSteps: Label[] = getCategories(ServiceStep);


export enum SkillLevel {
    LEVEL_0 = 0,
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    LEVEL_4 = 4
}

export enum HardLevel {
    LEVEL_0 = 0,
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    LEVEL_4 = 4
}

export enum ServiceCategory {
    CATEGORY_1 = 'bricolage',
    CATEGORY_2 = 'cours',
    CATEGORY_3 = 'animaux',
    CATEGORY_4 = 'blob',
    CATEGORY_5 = 'autre',
}

export const serviceCategoriesS: Label[] = getCategories(ServiceCategory, true);
export const serviceCategories: Label[] = getCategories(ServiceCategory);


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
    categoryS: any = '';
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

export class ServiceRespDTO {
    userIdResp?: number;
}

export enum ServiceUpdate {
    POST_RESP = 'POST_RESP',
    VALID_RESP = 'VALIDATE_RESP',
    CANCEL_RESP = 'CANCEL_RESP',
    FINISH = 'FINISH',
}

export enum ServiceFilter {
    GET = 'GET',
    DO = 'DO',
    MINE = 'MINE'
}

export enum ServiceStepFilter {
    STEP_0 = 'STEP_0',
    STEP_1 = 'STEP_1',
    STEP_2 = 'STEP_2',
    STEP_3 = 'STEP_3',
    STEP_4 = 'STEP_4'

}


export interface ServiceView extends Service {
    actif?: boolean;
    IResp: boolean;
    categoryS: string;
    typeS?: string;
    flagged: boolean;
    mine: boolean;
    isLate: boolean;
    points: number[];
    statusS: string;
    toogleResp: () => Promise<ServiceView>;
}