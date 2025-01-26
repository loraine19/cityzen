import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ServiceUseCase } from '../../application/useCases/service.usecase';

export const serviceViewModel = ({ serviceUseCase }: { serviceUseCase: ServiceUseCase }) => {
  return (mine: boolean, type: string, step: string, category: string) => {

    // const { data: user, isLoading: loadingUser } = useQuery({
    //   queryKey: ['userMe'],
    //   queryFn: async () => await userUseCase.getUserMe()
    // })
    // const userId = loadingUser ? 0 : user?.id


    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['events', mine, type, step, category],
        queryFn: async ({ pageParam = 1 }) => await serviceUseCase.getServices(pageParam, mine, type, step, category) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined
      });

    //const events = eventService.getInfosInEvents(data?.pages.flat(), userId)
    const services = data?.pages.flat() || []

    return {
      services,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    };
  }
}

export const serviceIdViewModel = ({ serviceUseCase }: { serviceUseCase: ServiceUseCase }) => {
  return (id: number) => {

    //// TS CALL EVENT BY ID
    const { data: service, isLoading: loadingService, error: errorSerivce, refetch } = useQuery({
      queryKey: ['eventById', id],
      queryFn: async () => await serviceUseCase.getServiceById(id),
    })

    //// USING SERVICE
    // const userId = loadingUser ? 0 : user.id
    // const event = eventByIdData ? eventService.getInfosInEvent(eventByIdData, userId) : {} as Event;

    //// RETURN FORMATTED DATA
    return { service, loadingService, errorSerivce, refetch }
  }
}

// export const eventGetByIdViewModel = ({ serviceUseCase }: { serviceUseCase: serviceUseCase }) => {
//   return async (id: number) => {
//     const event = await serviceUseCase.getEventById(id)
//     return event
//   }
// }