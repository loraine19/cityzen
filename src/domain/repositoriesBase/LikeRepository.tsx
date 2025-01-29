import { ApiService } from "../../infrastructure/providers/http/UseApi";
import { Like, LikeDTO } from "../entities/Like";

const api: ApiService = new ApiService();
const dataType = "likes"

export interface LikeRepository {
    getLikes(): Promise<Like[]>;
    getLikesByEvent(postId: number): Promise<Like[]>;
    postLike(like: LikeDTO): Promise<Like>;
    patchLike(id: number, like: LikeDTO): Promise<Like>;
    deleteLikeWoReq(userId: number, postId: number): Promise<void>;
    deleteLike(postId: number): Promise<void>;
}

export class LikeService implements LikeRepository {
    async getLikes(): Promise<Like[]> {
        return api.get(dataType);
    }

    async getLikesByEvent(postId: number): Promise<Like[]> {
        return api.get(`${dataType}/post/${postId}`);
    }
    async postLike(like: LikeDTO): Promise<Like> {
        return api.post(dataType, like);
    }

    async patchLike(id: number, like: LikeDTO): Promise<Like> {
        return api.patch(`${dataType}/${id}`, like);
    }

    async deleteLikeWoReq(userId: number, postId: number): Promise<void> {
        return api.delete(`${dataType}/user${userId}/post${postId}`);
    }

    async deleteLike(postId: number): Promise<void> {
        return api.delete(`${dataType}/post${postId}`);
    }

}



