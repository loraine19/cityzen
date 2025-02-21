import { Like } from "../../../domain/entities/Like";
import { LikeDTO } from "../../DTOs/LikeDTO";
import { ApiServiceI, ApiService } from "./apiService";


export class LikeApi {
    private readonly dataType: string = 'Likes';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getLikes(): Promise<Like[]> {
        return this.api.get(this.dataType)
    }

    async postLike(dataDTO: LikeDTO): Promise<Like> {
        return this.api.post(this.dataType, dataDTO)
    }

    async deleteLike(postId: number): Promise<void> {
        return this.api.delete(`${this.dataType}/post${postId}`)
    }

}