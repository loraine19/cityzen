import { User } from "../../domain/entities/User";
import { Vote } from "./Vote";

export class Pool {
    createdAt: Date = new Date();
    description: string = '';
    id: number = 0;
    name: string = '';
    title: string = '';
    updatedAt: Date = new Date();
    userId: number = 0;
    userIdBenef: number = 0;
    User?: User = {} as User;
    UserBenef?: User = {} as User;
    Votes?: Vote[] = [new Vote()];
}

export class PoolDTO {
    description?: string;
    name?: string;
    title?: string;
    userId?: number;
    userIdBenef?: number;
}