// src/data/repositories/UserRepository.tsx
import { User, UserDTO } from "../entities/User";

export abstract class UserRepositoryBase {
    abstract getUserMe(): Promise<User>;
    abstract getUserById(id: number): Promise<User>;
    abstract getUsers(): Promise<User[]>;
    abstract getUsersModos(): Promise<User[]>;
    abstract updateUser(dataDTO: UserDTO): Promise<User>;
    abstract deleteUser(id: number): Promise<void>;
}


