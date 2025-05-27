import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Pool, Survey } from '../../domain/entities/PoolSurvey';
import { PoolSurveyView } from './viewsEntities/poolSurveyViewEntity';

export const voteViewModel = () => {
  return (filter: string, step: string) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })


    const getPoolsSurveys = DI.resolve('getPoolsSurveysUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['poolsSurveys', filter, step],
        queryFn: async ({ pageParam = 1 }) => await getPoolsSurveys.execute(pageParam, filter, step) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.poolsSurveys?.length ? pages.length + 1 : undefined
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = data?.pages.flat().map(page => page.poolsSurveys).flat()
    const poolsSurveys = userLoading || isLoading || !flat ? [] : flat?.map((base: Pool | Survey) => new PoolSurveyView(base, user))

    return {
      count,
      poolsSurveys,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    };
  }
}

export const poolIdViewModel = () => {
  return (id: number) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getPoolById = DI.resolve('getPoolByIdUseCase')
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['poolById', id],
      staleTime: 600000,
      queryFn: async () => await getPoolById.execute(id),
    })

    const pool = userLoading || data ? new PoolSurveyView(data, user) : {} as PoolSurveyView;
    return { pool, isLoading, error, refetch }
  }
}

export const surveyIdViewModel = () => {
  return (id: number) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getSurveyById = DI.resolve('getSurveyByIdUseCase')
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['surveyById', id],
      staleTime: 600000,
      queryFn: async () => await getSurveyById.execute(id),
    })

    const survey = userLoading || data ? new PoolSurveyView(data, user) : {} as PoolSurveyView;
    return { survey, isLoading, error, refetch }
  }
}

