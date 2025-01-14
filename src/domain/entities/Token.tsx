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
}

export class Auth {
    accessToken: string = '';
    refreshToken: string = '';
}

export class TokenDTO {
    userId?: number;
    token?: string;
    type?: TokenType;
    createdAt?: Date;
    updatedAt?: Date;
    expiredAt?: Date;
}

export class AuthDTO {
    accessToken?: string;
    refreshToken?: string;
}