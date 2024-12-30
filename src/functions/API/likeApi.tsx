import { Like, LikeDTO } from "../../types/class";
import { handleApiCall, useApi } from "./useApi";

const api = useApi();
const dataType = "likes";

export const getLikes = async (): Promise<Like[]> => handleApiCall(() => api.get(dataType));
export const getLikesByEvent = async (postId: number): Promise<Like[]> => handleApiCall(() => api.get(`${dataType}/post/${postId}`));


//// ACTIONS
export const postLike = async (like: LikeDTO): Promise<Like> => handleApiCall(() => api.post(dataType, like));

export const patchLike = async (id: number, like: LikeDTO): Promise<Like> => handleApiCall(() => api.patch(`${dataType}/${id}`, like));

export const deleteLikeWoReq = async (userId: number, postId: number): Promise<Like> => handleApiCall(() => api.delete(`${dataType}/user${userId}/post${postId}`));

export const deleteLike = async (postId: number): Promise<Like> => handleApiCall(() => api.delete(`${dataType}/post${postId}`));


