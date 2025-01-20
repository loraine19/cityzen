import { Auth, ResetDTO } from "../entities/Auth";

export interface ResetPasswordRepositoryBase {
    resetPassword(email: string): Promise<{ message: string }>;
    resetPasswordUpdate(dataDTO: ResetDTO): Promise<Auth>;
}

