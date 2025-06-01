import { Auth } from "../../domain/entities/Auth";
import { MessageBack } from "../../domain/entities/frontEntities";
import { AuthRepositoryBase } from "../../domain/repositoriesBase/AuthRepositoryBase";
import { AccessDTO, VerifyDTO, DeleteDTO } from "../../infrastructure/DTOs/AuthDTO";
import { cryptedCookie, cryptedCookieI } from "../../infrastructure/services/cookiService";


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

    public async execute(verifyData: VerifyDTO): Promise<Auth> {
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

export class GoogleAuthUseCase {
    private authRepository: AuthRepositoryBase;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
    }

    public async execute(): Promise<void> {
        await this.authRepository.googleAuth();
    }
}



export class LogOutUseCase {
    private authRepository: AuthRepositoryBase;
    private storage: cryptedCookieI

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
        this.storage = new cryptedCookie();
    }

    public async execute(): Promise<MessageBack> {
        this.storage.clear();
        return this.authRepository.logOut();
    }
}

export class DeleteAccountUseCase {
    private authRepository: AuthRepositoryBase;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
    }

    public async execute(): Promise<{ message: string }> {
        return this.authRepository.deleteAccount();
    }
}

export class DeleteAccountConfirmUseCase {
    private authRepository: AuthRepositoryBase;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
    }

    public async execute(data: DeleteDTO): Promise<{ message: string }> {
        return this.authRepository.deleteAccountConfirm(data);
    }
}


