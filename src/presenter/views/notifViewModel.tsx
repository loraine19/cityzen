import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Notif } from '../../domain/entities/Notif';
import { NotifView } from './viewsEntities/notifViewEntity';


export const notifViewModel = () => {
  return (filter?: string) => {

    const getNotifs = DI.resolve('getNotifUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['notifs', filter],
        staleTime: 600000,
        queryFn: async ({ pageParam = 1 }) => await getNotifs.execute(pageParam, filter) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.notifs?.length ? pages.length + 1 : undefined
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = data?.pages.flat().map(page => page.notifs).flat()
    const notifs = isLoading ? [] : flat?.map((notif: Notif) => new NotifView(notif))

    return {
      count,
      notifs,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}

export const notifMapViewModel = () => {
  return () => {
    const map = true;
    const getNotifs = DI.resolve('getNotifUseCase')
    const { data, isLoading, error, refetch }
      = useQuery({
        queryKey: ['notifsMap'],
        staleTime: 600000,
        queryFn: async () => await getNotifs.execute(0, '', map) || [],
      })

    const count = isLoading ? 0 : (data?.count)
    console.log(48 + 'view', data)
    const notifsMap = isLoading ? [] : data?.notifs.map((notif: Notif) => new NotifView(notif))

    return {
      count,
      notifsMap,
      refetch,
      isLoadingMap: isLoading,
      error
    }
  }
}

