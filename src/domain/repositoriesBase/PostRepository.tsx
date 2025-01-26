import { Post, PostDTO } from "../entities/Post";
import { createFormData, handleApiCall } from "../../infrastructure/providers/http/utilsApi";
import { useApi } from "../../infrastructure/providers/http/UseApi";

const api = useApi();
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
    getPosts = async (): Promise<Post[]> => handleApiCall(() => api.get(dataType));
    getPostsMore = async (): Promise<Post[]> => handleApiCall(() => api.get(dataType));
    getPostsByTag = async (category: string): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/${category}`));
    getPostById = async (id: number): Promise<Post> => handleApiCall(() => api.get(`${dataType}/${id}`));
    getPostsMines = async (): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/mines`));
    getPostsIlike = async (): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/ilike`));
    deletePost = async (id: number): Promise<Post> => handleApiCall(() => api.delete(`${dataType}/${id}`));

    patchPost = async (id: number, post: PostDTO): Promise<Post> => {
        const formData = createFormData(post);
        return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
    postPost = async (post: PostDTO): Promise<Post> => {
        const formData = createFormData(post);
        return handleApiCall(() => api.post(dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
}
