//src/infrastructure/services/serviceService.ts
import { User } from "../../../domain/entities/User";
import { Pool, PoolSurveyStatus, Survey, SurveyCategory } from "../../../domain/entities/PoolSurvey";
import { Vote, VoteOpinion, VoteTarget } from "../../../domain/entities/Vote";
import { Flag } from "../../../domain/entities/Flag";


export class PoolSurveyView {
    id: number = 0;
    flagged: boolean = false;
    mine: boolean = false;
    IVoted: boolean = false;
    myOpinion?: VoteOpinion | null = null;
    typeS: VoteTarget = VoteTarget.POOL;
    pourcent: number = 0;
    needed: number = 0;
    title: string = '';
    description: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Votes: Vote[] = [];
    User: User = {} as User;
    userId: number = 0;
    UserBenef?: User = {} as User;
    userIdBenef?: number = 0;
    image?: string = '';
    category?: SurveyCategory = SurveyCategory.CATEGORY_1;
    categoryS?: string = SurveyCategory[SurveyCategory.CATEGORY_1 as string as keyof typeof SurveyCategory];
    Flags?: Flag[] = [];
    status?: PoolSurveyStatus = PoolSurveyStatus.PENDING;

    constructor
        (base: Pool | Survey, user: User, userCount: number) {
        if ('userIdBenef' in base) {
            Object.assign(this, base);
            this.flagged = false;
            this.typeS = VoteTarget.POOL;
        }
        if ('category' in base) {
            Object.assign(this, base);
            this.flagged = base?.Flags?.some(flag => flag?.userId === user?.id);
            this.typeS = VoteTarget.SURVEY;
            this.categoryS = SurveyCategory[base.category as string as keyof typeof SurveyCategory];
        }
        this.mine = base.userId === user?.id || false;
        this.pourcent = Math.round(base.Votes.filter(vote => vote.opinion === VoteOpinion.OK).length / (userCount / 2) * 100);
        this.needed = base.status === PoolSurveyStatus.PENDING ? Math.round(userCount / 2) - base.Votes.filter(vote => vote.opinion === VoteOpinion.OK).length : 0;
        this.IVoted = base?.Votes?.some(vote => vote.userId === user?.id);
        this.myOpinion = base?.Votes?.find(vote => vote.userId === user?.id)?.opinion || null;

    }

}

