//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { ResetPasswordRepositoryBase } from "../../domain/repositoriesBase/ResetPasswordRepositoryBase";
import { MessageBack } from "../../domain/entities/frontEntities";
import { ApiServiceI } from "../providers/http/apiService";
import { ResetDTO } from "../DTOs/AuthDTO";


interface IData extends ResetPasswordRepositoryBase {
    api: ApiServiceI;
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
