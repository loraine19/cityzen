import { Flag } from "./Flag";
import { User } from "./User";
import { Vote } from "./Vote";

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
}

export class Survey {
    id: number = 0;
    User: User = new User();
    userId: number = 0;
    title: string = '';
    description: string = '';
    image: string = '';
    category: SurveyCategory = SurveyCategory.CATEGORY_1;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Votes: Vote[] = [new Vote()]
    Flags: Flag[] = [new Flag()]
}