import { useQuery } from '@tanstack/react-query';
import { EventUseCase } from '../../application/useCases/event.usecase';
import { EventService } from '../../infrastructure/services/eventService';
import { UserUseCase } from '../../application/useCases/user.usecase';

export const eventViewModel = ({ eventUseCase, userUseCase, eventService }: { eventUseCase: EventUseCase, userUseCase: UserUseCase, eventService: EventService }) => {

  //// Get user id
  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => await userUseCase.getUserMe()
  })
  const userId = loadingUser ? 0 : user?.id

  //// Get all events and add infos
  const { data: eventsData, isLoading: loadingEvents, error: errorEvents } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await eventUseCase.getEvents(),
  });
  const events = eventService.getInfosInEvents(eventsData || [], userId);


  //// Get all events mine and add infos
  const { data: eventsMinesData, isLoading: loadingEventsMines, error: errorEventsMines } = useQuery({
    queryKey: ['eventsMines'],
    queryFn: async () => await eventUseCase.getEventsMines(),
  });
  const eventsMines = eventService.getInfosInEvents(eventsMinesData || [], userId)


  //// Get all events igos and add infos
  const { data: eventsIgoData, isLoading: loadingEventsIgo, error: errorEventsIgo } = useQuery({
    queryKey: ['eventsIgo'],
    queryFn: async () => await eventUseCase.getEventsIgo(),
  })
  const eventsIgo = eventService.getInfosInEvents(eventsIgoData || [], userId)


  //// Get all events validated and add infos
  const { data: eventsValidatedData, isLoading: loadingEventsValidated, error: errorEventsValidated } = useQuery({
    queryKey: ['eventsValidated'],
    queryFn: async () => await eventUseCase.getEventsValidated(),
  })
  const eventsValidated = eventService.getInfosInEvents(eventsValidatedData || [], userId)




  return {
    events,
    loadingEvents,
    errorEvents,
    eventsMines,
    loadingEventsMines,
    errorEventsMines,
    eventsIgo,
    loadingEventsIgo,
    errorEventsIgo,
    eventsValidated,
    loadingEventsValidated,
    errorEventsValidated,
  };
};


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
    console.log('eventGetByIdViewModel', id)
    const event = await eventUseCase.getEventById(id)
    console.log('eventGetByIdViewModel', event)
    return event
  }
}