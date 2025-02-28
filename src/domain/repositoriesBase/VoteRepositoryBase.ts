import { VoteDTO } from "../../infrastructure/DTOs/VoteDTO";
import { Vote } from "../entities/Vote";


export interface VoteRepositoryBase {
    getVotes: () => Promise<Vote[]>;
    postVote: (data: VoteDTO) => Promise<Vote>;
    updateVote: (data: VoteDTO) => Promise<Vote>;
}


