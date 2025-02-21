// src/data/repositories/UserRepository.tsx
import { UserDTO } from "../../infrastructure/DTOs/UserDTO";
import { User } from "../entities/User";

export abstract class UserRepositoryBase {
    abstract getUserMe(): Promise<User>;
    abstract getUsersModos(): Promise<User[]>;
    abstract getUserCount(): Promise<number>;
    abstract updateUser(dataDTO: UserDTO): Promise<User>;
    abstract deleteUser(id: number): Promise<void>;
}


