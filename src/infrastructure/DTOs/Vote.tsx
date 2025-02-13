import { User } from "../../domain/entities/User";
import { Pool } from "./Pool";


export enum VoteTarget {
    SURVEY,
    POOL
}

export enum VoteOpinion {
    OK,
    NO,
    WO
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

export class VoteDTO {
    id?: number;
    poolId?: number;
    userId?: number;
    targetId?: number;
    target?: VoteTarget;
    opinion?: VoteOpinion;
}
