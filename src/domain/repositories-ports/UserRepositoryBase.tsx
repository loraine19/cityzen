// src/data/repositories/UserRepository.tsx
import { User, UserDTO } from "../entities/User";

export abstract class UserRepositoryBase {
    abstract getUsers(): Promise<User[]>;
    abstract getUserMe(): Promise<User>;
    abstract getUserModos(): Promise<User[]>;
    abstract createUser(dataDTO: UserDTO): Promise<User>;
    abstract updateUser(dataDTO: UserDTO): Promise<User>;
    abstract deleteUser(id: number): Promise<void>;
}


