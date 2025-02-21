import { LikeDTO } from "../../infrastructure/DTOs/LikeDTO";
import { Like } from "../entities/Like";



export interface LikeRepositoryBase {
    getLikes: () => Promise<Like[]>;
    postLike: (Like: LikeDTO) => Promise<Like>;
    deleteLike: (eventId: number) => Promise<void>;
}






