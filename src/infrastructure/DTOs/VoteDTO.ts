import { VoteOpinion, VoteTarget } from "../../domain/entities/Vote";


export class VoteDTO {
    id?: number;
    userId?: number;
    targetId?: number;
    target?: VoteTarget;
    opinion?: VoteOpinion;
    constructor(init?: Partial<VoteDTO>) {
        Object.assign(this, init);
    }
}
