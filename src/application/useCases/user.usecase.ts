//src/application/user/getUserMe.usecase.ts
import { User } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositoriesBase/UserRepositoryBase";

export class UserUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async getUserMe(): Promise<User> {
        return this.userRepository.getUserMe();
    }


}

