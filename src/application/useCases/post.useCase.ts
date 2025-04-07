import { Post } from "../../domain/entities/Post"
import { PostPage } from "../../domain/entities/Post";
import { PostRepositoryBase } from "../../domain/repositoriesBase/PostRepositoryBase";
import { PostDTO } from "../../infrastructure/DTOs/PostDTO";

export class GetPostsUseCase {
    private postRepository: PostRepositoryBase;

    constructor({ postRepository }: { postRepository: PostRepositoryBase }) {
        this.postRepository = postRepository;
    }

    public async execute(page?: number, filter?: string, category?: string): Promise<PostPage> {
        return this.postRepository.getPosts(page, filter, category);
    }
}

export class GetPostByIdUseCase {
    private postRepository: PostRepositoryBase;

    constructor({ postRepository }: { postRepository: PostRepositoryBase }) {
        this.postRepository = postRepository
    }

    public async execute(id: number): Promise<Post> {

        const data = await this.postRepository.getPostById(id)
        return data;
    }
}

export class PostPostUseCase {
    private postRepository: PostRepositoryBase;

    constructor({ postRepository }: { postRepository: PostRepositoryBase }) {
        this.postRepository = postRepository;
    }

    public async execute(data: PostDTO): Promise<Post> {
        return this.postRepository.postPost(data);
    }
}

export class UpdatePostUseCase {
    private postRepository: PostRepositoryBase;

    constructor({ postRepository }: { postRepository: PostRepositoryBase }) {
        this.postRepository = postRepository;
    }

    public async execute(id: number, data: PostDTO): Promise<Post> {
        return this.postRepository.updatePost(id, data);
    }
}

export class DeletePostUseCase {
    private postRepository: PostRepositoryBase;

    constructor({ postRepository }: { postRepository: PostRepositoryBase }) {
        this.postRepository = postRepository;
    }

    public async execute(id: number): Promise<void> {
        return this.postRepository.deletePost(id);
    }
}


