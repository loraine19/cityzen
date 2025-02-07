import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ServiceService } from './viewsEntities/serviceService';
import { ServiceView } from '../../domain/entities/Service';
import DI from '../../di/ioc'

export const serviceViewModel = ({ serviceService }: { serviceService: ServiceService }) => {
  return (mine: boolean, type: string, step: string, category: string) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })
    const userId = user?.id


    const getServices = DI.resolve('getServicesUseCase')

    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['events', mine, type, step, category],
        queryFn: async ({ pageParam = 1 }) => await getServices.execute(pageParam, mine, type, step, category) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.services?.length ? pages.length + 1 : undefined
      });
    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const services = userLoading ? [] : serviceService.getInfosInServices(data?.pages.flat().map(page => page.services).flat(), userId)

    return {
      count,
      services,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    };
  }
}

export const serviceIdViewModel = ({ serviceService }: { serviceService: ServiceService }) => {
  return (id: number) => {
    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })
    const userId = user?.id
    const getServiceById = DI.resolve('getServiceByIdUseCase')

    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['eventById', id],
      queryFn: async () => await getServiceById.execute(id),
    })

    const service = userLoading ? {} : data ? serviceService.getInfosInService(data, userId) : {} as ServiceView;
    return { service, isLoading, error, refetch }
  }
}

