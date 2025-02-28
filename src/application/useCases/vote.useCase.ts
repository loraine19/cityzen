import { Vote } from "../../domain/entities/Vote";
import { VoteRepositoryBase } from "../../domain/repositoriesBase/VoteRepositoryBase";
import { VoteDTO } from "../../infrastructure/DTOs/VoteDTO";


export class GetVotesUseCase {
    private voteRepository: VoteRepositoryBase;

    constructor({ voteRepository }: { voteRepository: VoteRepositoryBase }) {
        this.voteRepository = voteRepository;
    }

    public async execute(): Promise<Vote[]> {
        return await this.voteRepository.getVotes();
    }
}

export class PostVoteUseCase {
    private voteRepository: VoteRepositoryBase;

    constructor({ voteRepository }: { voteRepository: VoteRepositoryBase }) {
        this.voteRepository = voteRepository;
    }

    public async execute(dataDTO: VoteDTO): Promise<Vote> {
        return await this.voteRepository.postVote(dataDTO);
    }
}

export class UpdateVoteUseCase {
    private voteRepository: VoteRepositoryBase;

    constructor({ voteRepository }: { voteRepository: VoteRepositoryBase }) {
        this.voteRepository = voteRepository;
    }

    public async execute(dataDTO: VoteDTO): Promise<Vote> {
        return await this.voteRepository.updateVote(dataDTO);
    }

}

