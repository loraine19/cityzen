import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Group } from '../../domain/entities/Group';
import { GroupView } from './viewsEntities/GroupViewEntity';


export const groupViewModel = () => {
  return (filter?: string) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getGroups = DI.resolve('getNearestGroupsUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['groups', filter],
        staleTime: 6000,
        refetchOnWindowFocus: true,
        queryFn: async ({ pageParam = 1 }) => await getGroups.execute(pageParam) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.groups?.length ? pages.length + 1 : undefined
      });
    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = data?.pages.flat().map(page => page.groups).flat()
    const groups = (userLoading || isLoading) ? [] : flat?.map((group: Group) => new GroupView(group, user.id))
    return {
      count,
      groups,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}
