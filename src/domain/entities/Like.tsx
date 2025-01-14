export class Like {
    postId: number = 0;
    userId: number = 0;
    updatedAt: Date = new Date();
}

export class LikeDTO implements Partial<Like> {
    postId: number = 0;
    userId?: number = 0;
}
export class LikeUpdateDTO implements Partial<LikeDTO> { }

