import { AccessDTO, Auth, VerifyDTO } from "../../domain/entities/Auth";
import { AuthRepositoryBase } from "../../domain/repositoriesBase/AuthRepositoryBase";

export class SignInUseCase {
    private authRepository: AuthRepositoryBase;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
    }

    public async execute(accessData: AccessDTO): Promise<Auth> {
        return this.authRepository.signIn(accessData);
    }
}

export class SignInVerifyUseCase {
    private authRepository: AuthRepositoryBase;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
    }

    public async execute(verifyData: VerifyDTO): Promise<any> {
        return this.authRepository.signInVerify(verifyData);
    }
}

export class SignUpUseCase {
    private authRepository: AuthRepositoryBase;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
    }

    public async execute(accessData: AccessDTO): Promise<{ message: string }> {
        return this.authRepository.signUp(accessData);
    }
}

