import { ApiService } from "../../infrastructure/providers/http/apiService";
import { Post, PostDTO } from "../entities/Post";


const api: ApiService = new ApiService();
const dataType = "posts";

export interface PostRepository {
    getPosts: () => Promise<Post[]>;
    getPostsMore: () => Promise<Post[]>;
    getPostsByTag: (category: string) => Promise<Post[]>;
    getPostById: (id: number) => Promise<Post>;
    getPostsMines: () => Promise<Post[]>;
    getPostsIlike: () => Promise<Post[]>;
    deletePost: (id: number) => Promise<Post>;
    patchPost: (id: number, post: PostDTO) => Promise<Post>;
    postPost: (post: PostDTO) => Promise<Post>;
}

export class PostService implements PostRepository {
    getPosts = async (): Promise<Post[]> => api.get(dataType)
    getPostsMore = async (): Promise<Post[]> => api.get(dataType)
    getPostsByTag = async (category: string): Promise<Post[]> => api.get(`${dataType}/${category}`)
    getPostById = async (id: number): Promise<Post> => api.get(`${dataType}/${id}`)
    getPostsMines = async (): Promise<Post[]> => api.get(`${dataType}/mines`)
    getPostsIlike = async (): Promise<Post[]> => api.get(`${dataType}/ilike`)
    deletePost = async (id: number): Promise<Post> => api.delete(`${dataType}/${id}`)

    patchPost = async (id: number, post: PostDTO): Promise<Post> => {
        const formData = api.createFormData(post);
        return api.patch(`${dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
    postPost = async (post: PostDTO): Promise<Post> => {
        const formData = api.createFormData(post);
        return api.post(dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}
