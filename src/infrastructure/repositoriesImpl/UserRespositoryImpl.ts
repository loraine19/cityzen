//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { User, UserDTO } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositoriesBase/UserRepositoryBase";

export interface IUserData extends UserRepositoryBase {
    api: any;
    dataType: any;
}

export class UserRepositoryImpl implements UserRepositoryBase {
    private userData: IUserData;
    constructor({ userData }: { userData: IUserData }) { this.userData = userData }

    public async getUserMe(): Promise<User> {
        return this.userData.getUserMe();
    }

    public async getUserById(id: number): Promise<User> {
        return this.userData.getUserById(id);
    }

    public async getUsersModos(): Promise<User[]> {
        return this.userData.getUsersModos();
    }

    public async getUsers(): Promise<User[]> {
        return this.userData.getUsers();
    }

    public async updateUser(data: UserDTO): Promise<User> {
        return this.userData.updateUser(data);
    }

    public async deleteUser(id: number): Promise<void> {
        return this.userData.deleteUser(id);
    }
}
