import { Post, PostDTO } from "../../types/class";
import { createFormData, handleApiCall, useApi } from "./useApi";

const api = useApi();
const dataType = "posts";

export const getPosts = async (): Promise<Post[]> => handleApiCall(() => api.get(dataType));

export const getPostsMore = async (): Promise<Post[]> => handleApiCall(() => api.get(dataType));

export const getPostsByTag = async (category: string): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/${category}`));

export const getPostById = async (id: number): Promise<Post> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getPostsMines = async (): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/mines`));
export const getPostsIlike = async (): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/ilike`));
export const getPostByLikeId = async (id: number): Promise<Post> => handleApiCall(() => api.get(`${dataType}/like/${id}`));

export const getPostsByUser = async (id: number): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/user/${id}`));

export const searchPosts = async (elementToSearch: string): Promise<Post[]> => handleApiCall(() => api.get(`${dataType}/search?q=${elementToSearch}`));

//// ACTIONS
export const deletePost = async (id: number): Promise<Post> => handleApiCall(() => api.delete(`${dataType}/${id}`));

export const patchPost = async (id: number, profile: PostDTO): Promise<Post> => {
    const formData = createFormData(profile);
    return handleApiCall(() => api.patch(`${dataType}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

export const postPost = async (profile: PostDTO): Promise<Post> => {
    const formData = createFormData(profile);
    return handleApiCall(() => api.post(dataType, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }));
};

