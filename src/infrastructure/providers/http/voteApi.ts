import { Vote } from "../../../domain/entities/Vote";
import { VoteDTO } from "../../DTOs/VoteDTO";
import { ApiServiceI, ApiService } from "./apiService";


export class VoteApi {
    private readonly dataType: string = 'Votes';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getVotes(): Promise<Vote[]> {
        return this.api.get(this.dataType)
    }

    async postVote(data: VoteDTO): Promise<Vote> {
        return this.api.post(this.dataType, data)
    }

    async updateVote(data: VoteDTO): Promise<Vote> {
        return this.api.patch(this.dataType, data)
    }

}