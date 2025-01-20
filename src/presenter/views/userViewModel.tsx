import { UserUseCase } from '../../application/useCases/user.usecase'
import { useMutation, useQuery } from '@tanstack/react-query';

export const userViewModel = ({ userUseCase }: { userUseCase: UserUseCase }) => {

  const { data: user, isLoading: loadingUser, error: errorUser } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => await userUseCase.getUserMe(),
  })

  return { user, loadingUser, errorUser }
}

export const userIdViewModel = ({ userUseCase }: { userUseCase: UserUseCase }) => {
  return () => {
    //// TS MUTATION
    const { data: user, error: errorUser, isSuccess: successUser, mutateAsync: getUserById } = useMutation({
      mutationKey: ['userId'],
      mutationFn: async (id: number) => await userUseCase.getUserById(id)
    })
    return { user, errorUser, successUser, getUserById };
  };
}