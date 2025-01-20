//src/application/user/getUserMe.usecase.ts
import { User } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositories-ports/UserRepositoryBase";

export class UserUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async getUserMe(): Promise<any> {
        const user = await this.userRepository.getUserMe();
        return user;
    }

    public async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        return user;
    }

}

