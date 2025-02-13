//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { Auth } from "../../domain/entities/Auth";
import { MessageBack } from "../../domain/entities/frontEntities";
import { AuthRepositoryBase } from "../../domain/repositoriesBase/AuthRepositoryBase";
import { AccessDTO, VerifyDTO, DeleteDTO } from "../DTOs/AuthDTO";
import { ApiServiceI } from "../providers/http/apiService";

interface IData extends AuthRepositoryBase {
    api: ApiServiceI;
    dataType: string;
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

    public async logOut(): Promise<MessageBack> {
        console.log('repoImpl')
        return this.authData.logOut();
    }

    public async deleteAccount(): Promise<{ message: string }> {
        return this.authData.deleteAccount();
    }

    public async deleteAccountConfirm(data: DeleteDTO): Promise<{ message: string }> {
        return this.authData.deleteAccountConfirm(data);
    }

}
