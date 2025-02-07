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

    constructor(init?: Event) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof Event];
                }
            });
        }
    }
}

export class Auth {
    refreshToken: string = '';
    constructor() {
        this.refreshToken = '';
    }
}




