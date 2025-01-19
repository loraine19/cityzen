//src/application/user/getUserMe.usecase.ts
import { UserRepositoryBase } from "../../../domain/repositories-ports/UserRepositoryBase";

export class GetUserUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(): Promise<any> {
        const user = await this.userRepository.getUserMe();
        return user;
    }

}

