// src/data/repositories/UserRepository.tsx
import { handleApiCall, useApi } from "../../api/useApi";
import { User, UserDTO } from "../../domain/entities/User";


const api = useApi();
const dataType = "users";

export interface UserRepository {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserMe(): Promise<User>;
    getUserModos(): Promise<User[]>;
    createUser(userDto: UserDTO): Promise<User>;
    updateUser(id: number, userDto: UserDTO): Promise<User>;
    deleteUser(id: number): Promise<void>;
}

export class UserService implements UserRepository {
    async getUsers(): Promise<User[]> {
        return handleApiCall(() => api.get(`${dataType}`));
    }
    async getUserById(id: number): Promise<User> {
        return handleApiCall(() => api.get(`${dataType}/${id}`));
    }
    async getUserMe(): Promise<User> {
        return handleApiCall(() => api.get(`${dataType}/me`));
    }
    async getUserModos(): Promise<User[]> {
        return handleApiCall(() => api.get(`${dataType}/modos`));
    }
    async createUser(userDto: UserDTO): Promise<User> {
        return handleApiCall(() => api.post(`${dataType}`, userDto));
    }
    async updateUser(id: number, userDto: UserDTO): Promise<User> {
        return handleApiCall(() => api.put(`${dataType}/${id}`, userDto));
    }
    async deleteUser(id: number): Promise<void> {
        return handleApiCall(() => api.delete(`${dataType}/${id}`));
    }
}

