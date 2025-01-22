//src/presenter/views/authViewModel.tsx
import { useMutation } from '@tanstack/react-query';
import { ResetDTO } from '../../domain/entities/Auth';
import { ResetPasswordUseCase } from '../../application/useCases/resetPassword.useCase';

export const resetPasswordUpdateViewModel = ({ resetPasswordUseCase }: { resetPasswordUseCase: ResetPasswordUseCase }) => {
    return () => {
        //// TS MUTATION
        const { data: message, error: errorMessage, isSuccess: successMessage, mutateAsync: updatePassword } = useMutation({
            mutationKey: ['signUp'],
            mutationFn: async (data: ResetDTO) => await resetPasswordUseCase.resetPasswordUpdate(data)
        })
        return { updatePassword, message, errorMessage, successMessage };
    };
}

export const resetPasswordViewModel = ({ resetPasswordUseCase }: { resetPasswordUseCase: ResetPasswordUseCase }) => {
    return async (email: string) => {
        console.log('resetPasswordViewModel', email)
        const message = await resetPasswordUseCase.resetPassword(email)
        return message
    }
}