import { useQuery } from '@tanstack/react-query';
import { GetNotifsUseCase } from '../../application/useCases/notifCase/getNotifs.usecase';
import NotifServiceImpl from '../../infrastructure/services/notifService';
import { GetUserUseCase } from '../../application/useCases/userCase/getUserMe.usecase'

export const notifsViewModel = ({ getNotifsUseCase, getUserUseCase }: { getNotifsUseCase: GetNotifsUseCase, getUserUseCase: GetUserUseCase }) => {

  const notifService = new NotifServiceImpl();
  const { data, isLoading: loadingNotifs, error: errorNotifs } = useQuery({
    queryKey: ['notifs'],
    queryFn: async () => await getNotifsUseCase.execute(),
  })

  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => await getUserUseCase.execute()
  })
  const userId = loadingUser ? 0 : user.id

  const notifs = notifService.loadNotifs(data, userId);
  return { notifs, loadingNotifs, errorNotifs }
}