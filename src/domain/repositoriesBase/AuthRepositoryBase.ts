import { AccessDTO, VerifyDTO, DeleteDTO } from "../../infrastructure/DTOs/AuthDTO";
import { Auth } from "../entities/Auth";

export interface AuthRepositoryBase {
    signIn(credentials: AccessDTO): Promise<Auth>;
    signInVerify(credentials: VerifyDTO): Promise<Auth>;
    signUp(credentials: AccessDTO): Promise<{ message: string }>
    deleteAccount(): Promise<{ message: string }>
    deleteAccountConfirm(data: DeleteDTO): Promise<{ message: string }>
}

