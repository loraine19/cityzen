import { Flag } from "./Flag";
import { Group } from "./Group";
import { Like } from "./Like";
import { User } from "./User";

export enum Share {
    EMAIL,
    PHONE,
    BOTH
}

export enum PostCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}
export const postCategory = Object.values(PostCategory).filter(category => typeof category === 'string');

export class Post {
    id: number = 0;
    content: string = '';
    User: User = {} as User;
    userId: number = 0;
    group: Group = {} as Group;
    groupId: number = 0;
    image: string | File = '';
    title: string = '';
    description: string = '';
    category: PostCategory = PostCategory.CATEGORY_1;
    share: Share = Share.EMAIL;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Likes: Like[] = [];
    Flags?: Flag[] = [];
}

export class PostDTO implements Partial<Post> {
    userId?: number;
    image?: string;
    title?: string;
    description?: string;
    category?: PostCategory;
    share?: Share;
}
export class PostUpdateDTO implements Partial<PostDTO> { }