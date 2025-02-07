import { ResetPasswordUseCase } from "../../application/useCases/resetPassword.useCase";
import { MessageBack } from "../../domain/entities/frontEntities";

interface ResetPasswordServiceI {
    sendResetPasswordEmail: (email: string) => Promise<MessageBack>

}
export class ResetPasswordService implements ResetPasswordServiceI {

    constructor(private resetPasswordUseCase: ResetPasswordUseCase) { }

    log = () => { console.log('test ' + this.resetPasswordUseCase) }

    async sendResetPasswordEmail(email: string): Promise<MessageBack> {
        return this.resetPasswordUseCase.execute(email);
    }
}
