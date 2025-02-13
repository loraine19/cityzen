import { Auth } from "../../domain/entities/Auth";
import { MessageBack } from "../../domain/entities/frontEntities";
import { AuthRepositoryBase } from "../../domain/repositoriesBase/AuthRepositoryBase";
import { AccessDTO, VerifyDTO, DeleteDTO } from "../../infrastructure/DTOs/AuthDTO";
import { cryptedStorageI, cryptedStorage } from "../../infrastructure/services/storageService";


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
    ;

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;

    }

    public async execute(accessData: AccessDTO): Promise<{ message: string }> {
        return this.authRepository.signUp(accessData);
    }
}



export class LogOutUseCase {
    private authRepository: AuthRepositoryBase;
    private storage: cryptedStorageI

    constructor({ authRepository }: { authRepository: AuthRepositoryBase }) {
        this.authRepository = authRepository;
        this.storage = new cryptedStorage();
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

