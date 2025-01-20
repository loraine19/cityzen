import { useQuery } from '@tanstack/react-query';
import { UserUseCase } from '../../application/useCases/user.usecase'
import { NotifService } from '../../infrastructure/services/notifService';
import { NotifUseCase } from '../../application/useCases/notif.usecase';
import { Notif } from '../../domain/entities/Notif';

export const notifsViewModel = ({ notifUseCase, userUseCase, notifService }: { notifUseCase: NotifUseCase, userUseCase: UserUseCase, notifService: NotifService }) => {


  const { data, isLoading: loadingNotifs, error: errorNotifs } = useQuery({
    queryKey: ['notifs'],
    queryFn: async () => await notifUseCase.getNotifs(),
  })

  const { data: user, isLoading: loadingUser, error: errorUser } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => await userUseCase.getUserMe()
  })

  ////USING SERVICE
  const userId = user?.id
  const notifs = (!loadingUser && !errorUser) ? notifService.loadNotifs(data, userId) : [] as Notif[];

  return { notifs, loadingNotifs, errorNotifs }
}