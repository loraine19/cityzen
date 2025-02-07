import { TokenType } from "../../domain/entities/Auth";

export class AccessDTO {
    email: string;
    password: string;

    constructor(email: string = '', password: string = '') {
        this.email = email;
        this.password = password;
    }
}


export class AuthDTO {
    refreshToken?: string;

    constructor(refreshToken?: string) {
        this.refreshToken = refreshToken;
    }
}


export class DeleteDTO {
    email: string;
    verifyToken: string;

    constructor(email: string = '', verifyToken: string = '') {
        this.email = email;
        this.verifyToken = verifyToken;
    }
}


export class ResetDTO {
    email: string;
    password: string;
    resetToken: string;

    constructor(email: string = '', password: string = '', resetToken: string = '') {
        this.email = email;
        this.password = password;
        this.resetToken = resetToken;
    }
}


export class TokenDTO {
    token: string;
    type: TokenType;
    expiredAt?: Date;

    constructor(token: string, type: TokenType, expiredAt?: Date) {
        this.token = token;
        this.type = type;
        this.expiredAt = expiredAt;
    }
}

export class VerifyDTO {
    email: string;
    password: string;
    verifyToken: string;

    constructor(email: string = '', password: string = '', verifyToken: string = '') {
        this.email = email;
        this.password = password;
        this.verifyToken = verifyToken;
    }
}
