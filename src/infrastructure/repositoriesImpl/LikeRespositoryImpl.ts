import { LikeRepositoryBase } from "../../domain/repositoriesBase/LikeRepositoryBase";
import { Like } from "../../domain/entities/Like";
import { LikeDTO } from "../DTOs/LikeDTO";

interface IData extends LikeRepositoryBase {
    api: any;
    dataType: any;
}

export class LikeRepositoryImpl implements LikeRepositoryBase {
    private likeData: IData;
    constructor({ likeData }: { likeData: IData }) { this.likeData = likeData }

    public async getLikes(): Promise<Like[]> {
        return this.likeData.getLikes();
    }

    public async postLike(dataDTO: LikeDTO): Promise<Like> {
        return this.likeData.postLike(dataDTO);
    }

    public async deleteLike(eventId: number): Promise<void> {
        return this.likeData.deleteLike(eventId);
    }
}
