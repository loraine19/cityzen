import { GetUserUseCase } from '../../application/useCases/userCase/getUserMe.usecase'
import { useQuery } from '@tanstack/react-query';

export const userViewModel = ({ getUserUseCase }: { getUserUseCase: GetUserUseCase }) => {

  const { data: user, isLoading: loadingUser, error: errorUser } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => await getUserUseCase.execute(),
  })

  return { user, loadingUser, errorUser }
}