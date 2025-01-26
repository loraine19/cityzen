//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { AuthRepositoryBase } from "../../domain/repositoriesBase/AuthRepositoryBase";
import { AccessDTO, Auth, VerifyDTO } from "../../domain/entities/Auth";

interface IData extends AuthRepositoryBase {
    api: any;
    dataType: any;
}

export class AuthRepositoryImpl implements AuthRepositoryBase {
    private authData: IData;
    constructor({ authData }: { authData: IData }) { this.authData = authData }

    public async signIn(credentials: AccessDTO): Promise<Auth> {
        return this.authData.signIn(credentials);
    }

    public async signInVerify(credentials: VerifyDTO): Promise<Auth> {
        return this.authData.signInVerify(credentials);
    }

    public async signUp(credentials: AccessDTO): Promise<{ message: string }> {
        return this.authData.signUp(credentials);
    }

}
