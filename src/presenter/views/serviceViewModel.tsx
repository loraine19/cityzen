import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ServiceUseCase } from '../../application/useCases/service.usecase';
import { UserUseCase } from '../../application/useCases/user.usecase';
import { ServiceService } from '../../infrastructure/services/serviceService';
import { ServiceView } from '../../domain/entities/Service';

export const serviceViewModel = ({ serviceUseCase, userUseCase, serviceService }: { serviceUseCase: ServiceUseCase, userUseCase: UserUseCase, serviceService: ServiceService }) => {
  return (mine: boolean, type: string, step: string, category: string) => {


    const { data: user, isLoading: loadingUser } = useQuery({
      queryKey: ['userMe'],
      queryFn: async () => await userUseCase.getUserMe()
    })
    const userId = loadingUser ? 0 : user?.id


    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['events', mine, type, step, category],
        queryFn: async ({ pageParam = 1 }) => await serviceUseCase.getServices(pageParam, mine, type, step, category) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined
      });

    //const events = eventService.getInfosInEvents(data?.pages.flat(), userId)
    const services = serviceService.getInfosInServices(data?.pages.flat(), userId)

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

export const serviceIdViewModel = ({ serviceUseCase, serviceService, userUseCase }: { serviceUseCase: ServiceUseCase, serviceService: ServiceService, userUseCase: UserUseCase }) => {
  return (id: number) => {

    const { data: user, isLoading: loadingUser } = useQuery({
      queryKey: ['userMe'],
      queryFn: async () => await userUseCase.getUserMe()
    })
    const userId = loadingUser ? 0 : user?.id

    //// TS CALL EVENT BY ID
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['eventById', id],
      queryFn: async () => await serviceUseCase.getServiceById(id),
    })


    //// RETURN FORMATTED DATA
    const service = data ? serviceService.getInfosInService(data, userId) : {} as ServiceView;
    return { service, isLoading, error, refetch }
  }
}

