//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { User, UserDTO } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories-ports/UserRepositoryBase";
import { UserApi } from "../providers/http/userApi";


export class UserRepositoryImpl implements UserRepository {
    constructor(private userApi: UserApi) { }
    async getUsers(): Promise<User[]> {
        return this.userApi.getUsers()
    }

    async getUserMe(): Promise<User> {
        return this.userApi.getUserMe()
    }

    async getUserModos(): Promise<User[]> {
        return this.userApi.getUsersModos()
    }

    async createUser(data: UserDTO): Promise<User> {
        return this.userApi.postUser(data)
    }

    async updateUser(data: UserDTO): Promise<User> {
        return this.userApi.patchUser(data)
    }

    async deleteUser(id: number): Promise<void> {
        return this.userApi.deleteUser(id)
    }
}


// Example usage
//const userRepository = new UserRepositoryImpl();
//userRepository.getUserMe().then(user => console.log(user));