import { User, UserStatus } from "../../domain/entities/User";

export class UserDTO implements Partial<User> {
    email: string = '';
    password: string = '';
    status?: UserStatus | undefined;
    constructor(init?: UserDTO) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof UserDTO];
                }
            });
        }
    }
}