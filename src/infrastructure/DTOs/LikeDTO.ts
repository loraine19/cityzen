import { Like } from "../../domain/entities/Like";


export class LikeDTO implements Partial<Like> {
    postId: number = 0;
    userId?: number = 0;
    constructor(init?: Partial<LikeDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof LikeDTO];
                }
            });
        }
    }
}

