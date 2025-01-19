//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { User, UserDTO } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositories-ports/UserRepositoryBase";

export interface IUserData {
    api: any;
    dataType: any;
    getUserMe(): Promise<User>;
    getUsersModos(): Promise<User[]>;
    getUsers(): Promise<User[]>;
    postUser(data: UserDTO): Promise<User>;
    patchUser(data: UserDTO): Promise<User>;
    deleteUser(id: number): Promise<void>;
}

export class UserRepositoryImpl implements UserRepositoryBase {
    private userData: IUserData;
    constructor({ userData }: { userData: IUserData }) { this.userData = userData }

    public async getUserMe(): Promise<User> {
        return this.userData.getUserMe();
    }

    public async getUsersModos(): Promise<User[]> {
        return this.userData.getUsersModos();
    }

    public async getUsers(): Promise<User[]> {
        return this.userData.getUsers();
    }

    public async createUser(data: UserDTO): Promise<User> {
        return this.userData.postUser(data);
    }

    public async updateUser(data: UserDTO): Promise<User> {
        return this.userData.patchUser(data);
    }

    public async deleteUser(id: number): Promise<void> {
        return this.userData.deleteUser(id);
    }
}
