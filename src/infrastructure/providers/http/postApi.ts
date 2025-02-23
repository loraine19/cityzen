import { Post, PostPage } from "../../../domain/entities/Post";
import { PostDTO } from "../../DTOs/PostDTO";

import { ApiServiceI, ApiService } from "./apiService";

export class PostApi {
    private readonly dataType: string = 'posts';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getPosts(page?: number, filter?: string, category?: string): Promise<PostPage> {
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        const categoryR = category ? `&category=${category}` : '';
        return this.api.get(`${this.dataType}${pageR}${filterR}${categoryR}`);
    }

    async getPostById(id: number): Promise<Post> {
        return this.api.get(`${this.dataType}/${id}`);
    }

    async postPost(Post: PostDTO): Promise<Post> {
        const formData = this.api.createFormData(Post);
        return this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async updatePost(id: number, Post: PostDTO): Promise<Post> {
        const formData = this.api.createFormData(Post);
        return this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async deletePost(id: number): Promise<Post> {
        return this.api.delete(`${this.dataType}/${id}`);
    }
}