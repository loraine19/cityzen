import { useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Notif } from '../../domain/entities/Notif';
import { NotifView } from './viewsEntities/notifViewEntity';


export const notifViewModel = () => {
  return () => {
    const getNotifs = DI.resolve('getNotifUseCase')
    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await getNotifs.execute(),
    })
    const userId = userLoading ? 0 : user?.id

    const { data, isLoading, error, refetch }
      = useQuery({
        queryKey: ['notifs'],
        staleTime: 600000,
        queryFn: async () => await getNotifs.execute() || [],
      })

    const notifs = userLoading ? [] : data.map((notif: Notif) => new NotifView(notif, userId))

    return {
      notifs,
      refetch,
      isLoading,
      error
    }
  }
}

