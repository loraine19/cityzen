import { useInfiniteQuery } from '@tanstack/react-query';
import DI from '../../di/ioc';


export const userViewModel = () => {
  return (groupeId: number) => {

    const getEvents = DI.resolve('getUsersUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['users', groupeId],
        staleTime: 600000,
        queryFn: async ({ pageParam = 1 }) => await getEvents.execute(pageParam, groupeId),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.length ? pages.length + 1 : undefined
      })

    console.log("data", data)
    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = !data || error || isLoading ? [] : data?.pages.flat().map(page => page.events).flat()
    const users = (isLoading || !data) ? [] : flat?.map(user => user)


    return {
      count,
      users,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}