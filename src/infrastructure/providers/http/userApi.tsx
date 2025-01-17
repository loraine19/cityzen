//src/infrastructure/api/userApi.tsx
import { User, UserDTO } from "../../../domain/entities/User";
import { Api, useApi } from "./useApi";
import { handleApiCall } from "./useApi";


export class UserApi {
    private readonly api: Api;
    private readonly dataType: string = 'users';

    constructor() { this.api = useApi(); }

    async getUsers(): Promise<User[]> {
        return handleApiCall(() => this.api.get(this.dataType));
    }

    async getUsersModos(): Promise<User[]> {
        return handleApiCall(() => this.api.get(`${this.dataType}/modos`));
    }

    async getUserMe(): Promise<User> {
        return handleApiCall(() => this.api.get(`${this.dataType}/me`));
    }

    async deleteUser(id: number): Promise<void> {
        return handleApiCall(() => this.api.delete(`${this.dataType}/${id}`));
    }

    async patchUser(data: UserDTO): Promise<User> {
        return handleApiCall(() => this.api.patch(`${this.dataType}`, data));
    }

    async postUser(data: UserDTO): Promise<User> {
        return handleApiCall(() => this.api.post(`${this.dataType}`, data));
    }
}

