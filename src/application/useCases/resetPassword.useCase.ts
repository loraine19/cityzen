//src/application/useCases/resetPassword.useCase.ts
import { ResetDTO } from "../../domain/entities/Auth";
import { MessageBack } from "../../domain/entities/frontEntities";
import { ResetPasswordRepositoryBase } from "../../domain/repositoriesBase/ResetPasswordRepositoryBase";

export class ResetPasswordUseCase {
    private resetPasswordRepository: ResetPasswordRepositoryBase;

    constructor({ resetPasswordRepository }: { resetPasswordRepository: ResetPasswordRepositoryBase }) {
        this.resetPasswordRepository = resetPasswordRepository;
    }

    public async resetPassword(email: string): Promise<MessageBack> {
        // return { message: 'resetPasswordUseCase' + email }
        console.log(this.resetPasswordRepository);
        return this.resetPasswordRepository.resetPassword(email);
    }

    public async resetPasswordUpdate(dataDTO: ResetDTO): Promise<MessageBack> {
        return this.resetPasswordRepository.resetPasswordUpdate(dataDTO);
    }


}