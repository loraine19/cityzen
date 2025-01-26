//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { ResetPasswordRepositoryBase } from "../../domain/repositoriesBase/ResetPasswordRepositoryBase";
import { ResetDTO } from "../../domain/entities/Auth";
import { MessageBack } from "../../domain/entities/frontEntities";
import { Api } from "../providers/http/UseApi";

interface IData extends ResetPasswordRepositoryBase {
    api: Api;
    dataType: string;
}

export class ResetPasswordRepositoryImpl implements ResetPasswordRepositoryBase {
    private resetPasswordData: IData;
    constructor({ resetPasswordData }: { resetPasswordData: IData }) { this.resetPasswordData = resetPasswordData }

    public async resetPassword(email: string): Promise<MessageBack> {
        return this.resetPasswordData.resetPassword(email);
    }

    public async resetPasswordUpdate(dataDTO: ResetDTO): Promise<MessageBack> {
        console.log('resetPasswordRepositoryIMPL')
        return this.resetPasswordData.resetPasswordUpdate(dataDTO);
    }
}
