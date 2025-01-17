//src/infrastructure/api/userApi.tsx
import { Profile } from "../../../domain/entities/Profile";
import { User, UserDTO } from "../../../domain/entities/User";
import { Api, useApi } from "./useApi";
import { handleApiCall } from "./useApi";

export const ProfileTest: Profile = {
    user: {} as any,
    addressId: 1,
    addressShared: false,
    assistance: 0,
    phone: 'test',
    points: 0,
    skills: ['test'],
    userIdSp: 1,
    userId: 1,
    firstName: 'test',
    lastName: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'test',
    Address: { lat: 0, lng: 0, address: 'test', zipcode: 'test', city: 'test', id: 1, createdAt: new Date(), updatedAt: new Date() },
}
export const userTest: User = { id: 1, email: 'test', password: 'pass', createdAt: new Date(), updatedAt: new Date(), Profile: ProfileTest, lastConnection: new Date(), status: 0, image: '', GroupUser: {} as any }

export class UserApi {
    private readonly api: Api;
    private readonly dataType: string = 'users';

    constructor() { this.api = useApi() }
    async getUsers(): Promise<User[]> {
        return handleApiCall(() => this.api.get(this.dataType));
    }


    async getUsersModos(): Promise<User[]> {
        return this.api.get(`${this.dataType}/modos`);
    }

    // async getUserMe(): Promise<User> {
    //     return handleApiCall(() => this.api.get(`${this.dataType}/me`));
    // }

    async getUserMe(): Promise<User> {
        const response = await this.api.get(`${this.dataType}/me`);
        console.log('API response:', response.data);
        return response.data;
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

