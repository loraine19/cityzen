//src/presenter/views/eventIdViewModel.tsx
import { useQuery } from '@tanstack/react-query';
import { GetEventsUseCase } from '../../application/useCases/eventCase/getEvents.usecase';
import { EventService } from '../../infrastructure/services/eventService';
import { GetUserUseCase } from '../../application/useCases/userCase/getUserMe.usecase';

export const eventIdViewModel = ({ getEventsUseCase, getUserUseCase, eventService }: { getEventsUseCase: GetEventsUseCase, getUserUseCase: GetUserUseCase, eventService: EventService }) => {
  return (id: number) => {

    //// Get user id
    const { data: user, isLoading: loadingUser } = useQuery({
      queryKey: ['userMe'],
      queryFn: async () => await getUserUseCase.execute()
    })
    const userId = loadingUser ? 0 : user.id

    //// Get event by id and add infos
    const { data: eventByIdData, isLoading: loadingEvent, error: errorEvent } = useQuery({
      queryKey: ['eventById', id],
      queryFn: async () => await getEventsUseCase.executeById(id),
    })
    const event = eventByIdData ? eventService.getInfosInEvent(eventByIdData, userId) : {} as Event;
    return { event, loadingEvent, errorEvent }
  }

}