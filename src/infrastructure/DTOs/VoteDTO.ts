import { VoteOpinion, VoteTarget } from "../../domain/entities/Vote";


export class VoteDTO {
    userId?: number;
    targetId?: number;
    target: VoteTarget = VoteTarget.POOL;
    opinion: VoteOpinion = VoteOpinion.OK;

    constructor(init?: Partial<VoteDTO>) {
        if (init) {
            console.log("Initializing VoteDTO with values:", init, new Date().getTime());
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof VoteDTO];
                }
            });
        }
    }
}
