//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { User, UserDTO } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositories-ports/UserRepositoryBase";
import { UserApi } from '../providers/http/userApi';

const userApi = new UserApi();

export class UserRepositoryImpl implements UserRepositoryBase {


    async getUserMe(): Promise<User> {
        return userApi.getUserMe();
    }

    async getUserModos(): Promise<User[]> {
        return userApi.getUsersModos()
    }

    async getUsers(): Promise<User[]> {
        return userApi.getUsers();
    }

    async createUser(data: UserDTO): Promise<User> {
        return userApi.postUser(data)
    }

    async updateUser(data: UserDTO): Promise<User> {
        return userApi.patchUser(data)
    }

    async deleteUser(id: number): Promise<void> {
        return userApi.deleteUser(id)
    }
}

