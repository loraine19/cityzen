import { useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { NotifService } from './viewsEntities/notifService';


export const notifViewModel = ({ notifService }: { notifService: NotifService }) => {
  return () => {
    const getNotifs = DI.resolve('getNotifUseCase')
    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      queryFn: async () => await getNotifs.execute(),
    })
    const userId = userLoading ? 0 : user?.id

    const { data, isLoading, error, refetch }
      = useQuery({
        queryKey: ['notifs'],
        queryFn: async () => await getNotifs.execute() || [],
      })

    const notifs = notifService.getInfosInNotifs(data, userId)

    return {
      notifs,
      refetch,
      isLoading,
      error
    }
  }
}

