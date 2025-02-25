import { SurveyCategory } from "../../domain/entities/PoolSurvey";

export class SurveyDTO {
    name?: string;
    description?: string;
    userId?: number;
    image?: string;
    title?: string;
    category?: SurveyCategory;
    constructor(init?: Partial<SurveyDTO>) {
        Object.assign(this, init);
    }
}

export class PoolDTO {
    description?: string;
    name?: string;
    title?: string;
    userId?: number;
    userIdBenef?: number;

    constructor(init?: Partial<PoolDTO>) {
        Object.assign(this, init);
    }
}
