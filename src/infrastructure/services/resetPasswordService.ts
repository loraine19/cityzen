import { ResetPasswordUseCase } from "../../application/useCases/resetPassword.useCase";
import { MessageBack } from "../../domain/entities/frontEntities";

interface ReserPasswordServiceI {
    log: () => void
    sendResetPasswordEmail: (email: string) => Promise<MessageBack>

}
export class ResetPasswordService implements ReserPasswordServiceI {

    constructor(private resetPasswordUseCase: ResetPasswordUseCase) { }

    log = () => { console.log('test ' + this.resetPasswordUseCase) }

    async sendResetPasswordEmail(email: string): Promise<MessageBack> {
        return this.resetPasswordUseCase.resetPassword(email);
    }
}
