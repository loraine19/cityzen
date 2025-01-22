import { ResetDTO } from "../entities/Auth";
import { MessageBack } from "../entities/frontEntities";

export interface ResetPasswordRepositoryBase {
    resetPassword(email: string): Promise<MessageBack>;
    resetPasswordUpdate(dataDTO: ResetDTO): Promise<MessageBack>;
}

