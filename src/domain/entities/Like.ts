export class Like {
    postId: number = 0;
    userId: number = 0;
    updatedAt: Date = new Date();
    constructor(data?: Partial<Like>) {
        if (data) {
            Object.assign(this, data);
        }
    }

}


