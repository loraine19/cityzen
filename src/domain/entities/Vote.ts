import { Pool } from "./PoolSurvey";
import { User } from "./User";

export enum VoteTarget {
    SURVEY = 'SURVEY',
    POOL = 'POOL'
}

export enum VoteOpinion {
    OK = 'OK',
    NO = 'NO',
    WO = 'WO'
}

export class Vote {
    id: number = 0;
    pool: Pool = new Pool();
    poolId: number = 0;
    user: User = new User();
    userId: number = 0;
    targetId: number = 0;
    target: VoteTarget = VoteTarget.POOL;
    opinion: VoteOpinion = VoteOpinion.OK;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    User?: User = new User();
}


