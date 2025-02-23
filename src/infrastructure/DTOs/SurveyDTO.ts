export enum SurveyCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}
export const surveyCategory = Object.values(SurveyCategory).filter(category => typeof category === 'string');


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
