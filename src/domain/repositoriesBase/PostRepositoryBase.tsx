import { AddressDTO } from "../../infrastructure/DTOs/AddressDTO";
import { PostDTO } from "../../infrastructure/DTOs/PostDTO";
import { PostPage, Post } from "../entities/Post";

export abstract class PostRepositoryBase {
    abstract getPosts(page?: number, filter?: string, category?: string): Promise<PostPage>;
    abstract getPostById(id: number): Promise<Post>;
    abstract postPost(data: PostDTO, address?: AddressDTO): Promise<Post>;
    abstract updatePost(id: number, data: PostDTO, address?: AddressDTO): Promise<Post>;
    abstract deletePost(id: number): Promise<void>;
}