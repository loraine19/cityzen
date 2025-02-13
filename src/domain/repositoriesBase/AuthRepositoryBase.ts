import { AccessDTO, VerifyDTO, DeleteDTO } from "../../infrastructure/DTOs/AuthDTO";
import { Auth } from "../entities/Auth";
import { MessageBack } from "../entities/frontEntities";

export interface AuthRepositoryBase {
    signIn(credentials: AccessDTO): Promise<Auth>;
    signInVerify(credentials: VerifyDTO): Promise<Auth>;
    signUp(credentials: AccessDTO): Promise<{ message: string }>
    logOut(): Promise<MessageBack>
    deleteAccount(): Promise<{ message: string }>
    deleteAccountConfirm(data: DeleteDTO): Promise<{ message: string }>
}

