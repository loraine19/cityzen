// src/data/repositories/UserRepository.tsx
import { User, UserDTO } from "../../domain/entities/User";

export interface UserRepository {
    getUsers(): Promise<User[]>;
    getUserMe(): Promise<User>;
    getUserModos(): Promise<User[]>;
    createUser(data: UserDTO): Promise<User>;
    updateUser(data: UserDTO): Promise<User>;
    deleteUser(id: number): Promise<void>;
}


