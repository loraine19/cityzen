//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { PostRepositoryBase } from "../../domain/repositoriesBase/PostRepositoryBase";
import { Post, PostFindParams, PostPage } from "../../domain/entities/Post";
import { ApiServiceI } from "../providers/http/apiService";
import { AddressDTO } from "../DTOs/AddressDTO";
import { PostDTO } from "../DTOs/PostDTO";

interface IData extends PostRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class PostRepositoryImpl implements PostRepositoryBase {
    private postData: IData;
    constructor({ postData }: { postData: IData }) { this.postData = postData }

    public async getPosts(page?: number, params?: PostFindParams): Promise<PostPage> {
        return await this.postData.getPosts(page, params);
    }

    public async getPostById(id: number): Promise<Post> {
        return this.postData.getPostById(id);
    }

    public async postPost(data: PostDTO, address?: AddressDTO): Promise<Post> {
        return this.postData.postPost(data, address);
    }

    public async updatePost(id: number, data: PostDTO, address?: AddressDTO): Promise<Post> {
        return this.postData.updatePost(id, data, address);
    }

    public async deletePost(id: number): Promise<void> {
        return this.postData.deletePost(id);
    }
}
