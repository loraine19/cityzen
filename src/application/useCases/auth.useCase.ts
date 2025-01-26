import { AccessDTO, Auth, VerifyDTO } from "../../domain/entities/Auth";
import { AuthRepositoryBase } from "../../domain/repositoriesBase/AuthRepositoryBase";

export class AuthUseCase {
    private authRepository: AuthRepositoryBase;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
    }

    public async signIn(accessData: AccessDTO): Promise<Auth> {
        return this.authRepository.signIn(accessData);
    }

    public async signInVerify(verifyData: VerifyDTO): Promise<any> {
        return this.authRepository.signInVerify(verifyData);
    }

    public async signUp(accessData: AccessDTO): Promise<{ message: string }> {
        return this.authRepository.signUp(accessData);
    }
}