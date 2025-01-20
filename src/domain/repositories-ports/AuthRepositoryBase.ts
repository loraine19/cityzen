import { AccessDTO, Auth, VerifyDTO } from "../entities/Auth";

export interface AuthRepositoryBase {
    signIn(credentials: AccessDTO): Promise<Auth>;
    signInVerify(credentials: VerifyDTO): Promise<Auth>;
    signUp(credentials: AccessDTO): Promise<{ message: string }>;

}

