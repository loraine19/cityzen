import { Post, PostCategory, Share } from "../../domain/entities/Post";

export class PostDTO implements Partial<Post> {
    share: Share = Share.EMAIL;
    userId?: number;
    image?: string;
    title?: string;
    description?: string;
    category?: PostCategory;

    constructor(init?: Partial<PostDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof PostDTO];
                }
            });
        }
    }
}