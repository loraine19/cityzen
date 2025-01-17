//src/application/user/getUserMe.usecase.ts
import { User } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositories-ports/UserRepositoryBase";

export class GetUserUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(): Promise<User> {
        const user = await this.userRepository.getUserMe();
        // console.log('User', user);
        return user;
    }
}

