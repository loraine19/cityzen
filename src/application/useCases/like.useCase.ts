import { Like } from "../../domain/entities/Like";
import { LikeRepositoryBase } from "../../domain/repositoriesBase/LikeRepositoryBase";
import { LikeDTO } from "../../infrastructure/DTOs/LikeDTO";
import { Post } from "../../domain/entities/Post";

export class GetLikesUseCase {
    private likeRepository: LikeRepositoryBase;

    constructor({ likeRepository }: { likeRepository: LikeRepositoryBase }) {
        this.likeRepository = likeRepository;
    }

    public async execute(): Promise<Like[]> {
        return await this.likeRepository.getLikes();
    }
}

export class PostLikeUseCase {
    private likeRepository: LikeRepositoryBase;

    constructor({ likeRepository }: { likeRepository: LikeRepositoryBase }) {
        this.likeRepository = likeRepository;
    }

    public async execute(dataDTO: LikeDTO): Promise<Like> {
        return await this.likeRepository.postLike(dataDTO);
    }
}

export class DeleteLikeUseCase {
    private likeRepository: LikeRepositoryBase;

    constructor({ likeRepository }: { likeRepository: LikeRepositoryBase }) {
        this.likeRepository = likeRepository;
    }

    public async execute(postId: number): Promise<void> {
        return await this.likeRepository.deleteLike(postId);
    }
}

export class ToogleLikeUseCase {
    private likeRepository: LikeRepositoryBase;

    constructor({ likeRepository }: { likeRepository: LikeRepositoryBase }) {
        this.likeRepository = likeRepository;
    }

    public async execute(post: Post, postId: number, userId: number): Promise<boolean> {
        const isLike: Like | undefined = (post?.Likes.find((p: Like) => p.userId === userId))
        if (isLike) {
            await this.likeRepository.deleteLike(postId)
            return true
        }
        else {
            await this.likeRepository.postLike({ postId, userId })
            return true
        }
    }
}

