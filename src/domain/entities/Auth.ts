import { User } from "./User";

export enum TokenType {
    REFRESH,
    RESET,
    VERIFY
}

export class Token {
    userId: number = 0;
    token: string = '';
    type: TokenType = TokenType.REFRESH;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    expiredAt: Date = new Date();

    constructor(data?: Partial<Token>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export class Auth {
    refreshToken: string = '';
    user?: User = {} as User;
    constructor() {
        this.refreshToken = '';
    }
}




