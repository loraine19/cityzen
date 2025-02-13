import { Post, PostCategory, Share } from "../../domain/entities/Post";


export class PostDTO implements Partial<Post> {
    userId?: number;
    image?: string;
    title?: string;
    description?: string;
    category?: PostCategory;
    share?: Share;
}
export class PostUpdateDTO implements Partial<PostDTO> { }