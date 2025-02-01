import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { EventService } from './viewsServices/eventService';
import { Event } from '../../domain/entities/Event';
import DI from '../../di/ioc';
import { useUserStore } from '../../application/stores/user.store';


export const eventViewModel = ({ eventService }: { eventService: EventService }) => {
  return (filter?: string, category?: string) => {


    const getEvents = DI.resolve('getEventsUseCase')
    const userId = useUserStore(state => state.user.id)

    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['events', filter, category],
        queryFn: async ({ pageParam = 1 }) => await getEvents.execute(pageParam, filter, category) || { events: [], count: 0 },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.events?.length ? pages.length + 1 : undefined
      });
    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const events = eventService.getInfosInEvents(data?.pages.flat().map(page => page.events).flat(), userId)

    return {
      count,
      events,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    };
  }
}

export const eventIdViewModel = ({ eventService }: { eventService: EventService }) => {
  return (id: number) => {

    const userId = useUserStore(state => state.user.id)
    const getEventById = DI.resolve('getEventByIdUseCase')


    const { data: eventByIdData, isLoading: loadingEvent, error: errorEvent } = useQuery({
      queryKey: ['eventById', id],
      queryFn: async () => await getEventById.execute(id),
    })

    //// USING SERVICE
    const event = eventByIdData ? eventService.getInfosInEvent(eventByIdData, userId) : {} as Event;

    //// RETURN FORMATTED DATA
    return { event, loadingEvent, errorEvent }
  }
}

