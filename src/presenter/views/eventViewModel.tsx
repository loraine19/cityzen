import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { EventUseCase } from '../../application/useCases/event.usecase';
import { EventService } from '../../infrastructure/services/eventService';
import { UserUseCase } from '../../application/useCases/user.usecase';
import { Event } from '../../domain/entities/Event';


export const eventViewModel = ({ eventUseCase, userUseCase, eventService }: { eventUseCase: EventUseCase, userUseCase: UserUseCase, eventService: EventService }) => {
  return (filter?: string, category?: string) => {

    //// Get user id
    const { data: user, isLoading: loadingUser } = useQuery({
      queryKey: ['userMe'],
      queryFn: async () => await userUseCase.getUserMe()
    })
    const userId = loadingUser ? 0 : user?.id

    //// Get all events and add infos
    const { data, isLoading: loadingEvents, error: errorEvents, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['events', filter, category],
        queryFn: async ({ pageParam = 1 }) => await eventUseCase.getEvents(pageParam, filter, category) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined
      });

    const events = eventService.getInfosInEvents(data?.pages.flat(), userId)

    return {
      events,
      refetch,
      fetchNextPage,
      hasNextPage,
      loadingEvents,
      errorEvents,
    };
  }
}

export const eventIdViewModel = ({ eventUseCase, userUseCase, eventService }: { eventUseCase: EventUseCase, userUseCase: UserUseCase, eventService: EventService }) => {
  return (id: number) => {

    //// TS CALL USER CONNECTED 
    const { data: user, isLoading: loadingUser } = useQuery({
      queryKey: ['userMe'],
      queryFn: async () => await userUseCase.getUserMe()
    })

    //// TS CALL EVENT BY ID
    const { data: eventByIdData, isLoading: loadingEvent, error: errorEvent } = useQuery({
      queryKey: ['eventById', id],
      queryFn: async () => await eventUseCase.getEventById(id),
    })

    //// USING SERVICE
    const userId = loadingUser ? 0 : user.id
    const event = eventByIdData ? eventService.getInfosInEvent(eventByIdData, userId) : {} as Event;

    //// RETURN FORMATTED DATA
    return { event, loadingEvent, errorEvent }
  }
}

export const eventGetByIdViewModel = ({ eventUseCase }: { eventUseCase: EventUseCase }) => {
  return async (id: number) => {
    const event = await eventUseCase.getEventById(id)
    return event
  }
}