import { User } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositories-ports/UserRepositoryBase";

export class GetUserMeUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(): Promise<User> {
        return this.userRepository.getUserMe();
    }
}
