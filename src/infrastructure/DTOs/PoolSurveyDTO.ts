import { SurveyCategory } from "../../domain/entities/PoolSurvey";

export class SurveyDTO {
    description?: string;
    userId?: number;
    image?: string;
    title?: string;
    category?: SurveyCategory;
    groupId?: number;
    constructor(init?: Partial<SurveyDTO>) {
        if (init) {
            (Object.keys(init) as (keyof SurveyDTO)[]).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    (this as any)[key] = init[key];
                }
            });
        }
    }
}

export class PoolDTO {
    description?: string;
    name?: string;
    title?: string;
    userId?: number;
    userIdBenef: number;

    constructor(init: Partial<PoolDTO>) {
        this.userIdBenef = parseInt(init.userIdBenef?.toString() || '0');
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof PoolDTO];
                }
            });
        }
    }
}
