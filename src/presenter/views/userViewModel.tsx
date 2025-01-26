import { UserUseCase } from '../../application/useCases/user.usecase'
import { useQuery } from '@tanstack/react-query';

export const userViewModel = ({ userUseCase }: { userUseCase: UserUseCase }) => {
  const { data: user, isLoading: loadingUser, error: errorUser } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => await userUseCase.getUserMe(),
  })

  return { user, loadingUser, errorUser }
}
