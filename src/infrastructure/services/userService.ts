// src/infrastructure/services/userService.tsx
import { User, UserStatus } from "../../domain/entities/User";

interface UserServiceI {
    isUserValidated(user: User): boolean;
}

export class UserService implements UserServiceI {
    constructor() { }

    isUserValidated(user: User): boolean {
        return user.status === UserStatus.ACTIVE;
    }
}




