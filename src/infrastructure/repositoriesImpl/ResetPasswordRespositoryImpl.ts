//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { ResetPasswordRepositoryBase } from "../../domain/repositories-ports/ResetPasswordRepositoryBase";
import { Auth, ResetDTO } from "../../domain/entities/Auth";

interface IData extends ResetPasswordRepositoryBase {
    api: any;
    dataType: any;
}

export class ResetPasswordRepositoryImpl implements ResetPasswordRepositoryBase {
    private resetPasswordData: IData;
    constructor({ resetPasswordData }: { resetPasswordData: IData }) { this.resetPasswordData = resetPasswordData }

    public async resetPassword(email: string): Promise<{ message: string }> {
        return this.resetPassword(email);
    }

    public async resetPasswordUpdate(dataDTO: ResetDTO): Promise<Auth> {
        return this.resetPasswordData.resetPasswordUpdate(dataDTO);
    }
}
