import { useQuery } from '@tanstack/react-query';
import { GetEventsUseCase } from '../../application/useCases/getEvents.usecase';
import { EventService } from '../../infrastructure/services/eventService';
import { UserUseCase } from '../../application/useCases/user.usecase';

export const eventViewModel = ({ getEventsUseCase, userUseCase, eventService }: { getEventsUseCase: GetEventsUseCase, userUseCase: UserUseCase, eventService: EventService }) => {

  //// Get user id
  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => await userUseCase.getUserMe()
  })
  const userId = loadingUser ? 0 : user?.id

  //// Get all events and add infos
  const { data: eventsData, isLoading: loadingEvents, error: errorEvents } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await getEventsUseCase.execute(),
  });
  const events = eventService.getInfosInEvents(eventsData || [], userId);


  //// Get all events mine and add infos
  const { data: eventsMinesData, isLoading: loadingEventsMines, error: errorEventsMines } = useQuery({
    queryKey: ['eventsMines'],
    queryFn: async () => await getEventsUseCase.executeMines(),
  });
  const eventsMines = eventService.getInfosInEvents(eventsMinesData || [], userId)


  //// Get all events igos and add infos
  const { data: eventsIgoData, isLoading: loadingEventsIgo, error: errorEventsIgo } = useQuery({
    queryKey: ['eventsIgo'],
    queryFn: async () => await getEventsUseCase.executeIgo(),
  })
  const eventsIgo = eventService.getInfosInEvents(eventsIgoData || [], userId)


  //// Get all events validated and add infos
  const { data: eventsValidatedData, isLoading: loadingEventsValidated, error: errorEventsValidated } = useQuery({
    queryKey: ['eventsValidated'],
    queryFn: async () => await getEventsUseCase.executeValidated(),
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