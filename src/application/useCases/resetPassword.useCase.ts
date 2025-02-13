//src/application/useCases/resetPassword.useCase.ts
import { MessageBack } from "../../domain/entities/frontEntities";
import { ResetPasswordRepositoryBase } from "../../domain/repositoriesBase/ResetPasswordRepositoryBase";
import { ResetDTO } from "../../infrastructure/DTOs/AuthDTO";


export class ResetPasswordUseCase {
    private resetPasswordRepository: ResetPasswordRepositoryBase;

    constructor({ resetPasswordRepository }: { resetPasswordRepository: ResetPasswordRepositoryBase }) {
        this.resetPasswordRepository = resetPasswordRepository;
    }

    public async execute(email: string): Promise<MessageBack> {
        return this.resetPasswordRepository.resetPassword(email);
    }
}

export class ResetPasswordUpdateUseCase {
    private resetPasswordRepository: ResetPasswordRepositoryBase;

    constructor({ resetPasswordRepository }: { resetPasswordRepository: ResetPasswordRepositoryBase }) {
        this.resetPasswordRepository = resetPasswordRepository;
    }

    public async execute(dataDTO: ResetDTO): Promise<MessageBack> {
        return this.resetPasswordRepository.resetPasswordUpdate(dataDTO);
    }
}

