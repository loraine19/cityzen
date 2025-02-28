import { VoteRepositoryBase } from "../../domain/repositoriesBase/VoteRepositoryBase";
import { Vote } from "../../domain/entities/Vote";
import { VoteDTO } from "../DTOs/VoteDTO";
import { ApiServiceI } from "../providers/http/apiService";

interface IData extends VoteRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class VoteRepositoryImpl implements VoteRepositoryBase {
    private voteData: IData;
    constructor({ voteData }: { voteData: IData }) { this.voteData = voteData }

    public async getVotes(): Promise<Vote[]> {
        return this.voteData.getVotes();
    }

    public async postVote(dataDTO: VoteDTO): Promise<Vote> {
        return this.voteData.postVote(dataDTO);
    }

    public async updateVote(dataDTO: VoteDTO): Promise<Vote> {
        return this.voteData.updateVote(dataDTO);
    }
}
