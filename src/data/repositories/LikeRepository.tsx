import { Like, LikeDTO } from "../../domain/entities/Like";
import { useApi, handleApiCall } from "../api/useApi";

const api = useApi();
const dataType = "likes";

export interface LikeRepository {
    getLikes(): Promise<Like[]>;
    getLikesByEvent(postId: number): Promise<Like[]>;
    postLike(like: LikeDTO): Promise<Like>;
    patchLike(id: number, like: LikeDTO): Promise<Like>;
    deleteLikeWoReq(userId: number, postId: number): Promise<Like>;
    deleteLike(postId: number): Promise<Like>;
}

export class LikeService implements LikeRepository {
    async getLikes(): Promise<Like[]> {
        return handleApiCall(() => api.get(dataType));
    }

    async getLikesByEvent(postId: number): Promise<Like[]> {
        return handleApiCall(() => api.get(`${dataType}/post/${postId}`));
    }
    async postLike(like: LikeDTO): Promise<Like> {
        return handleApiCall(() => api.post(dataType, like));
    }

    async patchLike(id: number, like: LikeDTO): Promise<Like> {
        return handleApiCall(() => api.patch(`${dataType}/${id}`, like));
    }

    async deleteLikeWoReq(userId: number, postId: number): Promise<Like> {
        return handleApiCall(() => api.delete(`${dataType}/user${userId}/post${postId}`));
    }

    async deleteLike(postId: number): Promise<Like> {
        return handleApiCall(() => api.delete(`${dataType}/post${postId}`));
    }

}



