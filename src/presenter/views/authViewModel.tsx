//src/presenter/views/authViewModel.tsx
import { useMutation } from '@tanstack/react-query';
import { AuthUseCase } from '../../application/useCases/auth.useCase';
import { AccessDTO, VerifyDTO } from '../../domain/entities/Auth';


export const authSignInViewModel = ({ authUseCase }: { authUseCase: AuthUseCase }) => {
    return () => {
        //// TS MUTATION
        const { data: auth, error: errorAuth, isSuccess: successAuth, mutateAsync: signIn } = useMutation({
            mutationKey: ['signIn'],
            mutationFn: async (data: AccessDTO) => await authUseCase.signIn(data)
        })
        return { auth, errorAuth, successAuth, signIn };
    };
}

export const authSignInVerifyViewModel = ({ authUseCase }: { authUseCase: AuthUseCase }) => {
    return () => {
        //// TS MUTATION
        const { data: authVerify, error: errorAuthVerify, isSuccess: successAuthVerify, mutateAsync: signInVerify } = useMutation({
            mutationKey: ['signInVerify'],
            mutationFn: async (data: VerifyDTO) => await authUseCase.signInVerify(data)
        })
        return { authVerify, errorAuthVerify, successAuthVerify, signInVerify };
    };
}


export const authSignUpViewModel = ({ authUseCase }: { authUseCase: AuthUseCase }) => {
    return () => {
        //// TS MUTATION
        const { data: messageSignUp, error: errorSignUp, isSuccess: successSignUp, mutateAsync: signUp } = useMutation({
            mutationKey: ['signUp'],
            mutationFn: async (data: AccessDTO) => await authUseCase.signUp(data)
        })
        return { messageSignUp, errorSignUp, successSignUp, signUp };
    };
}