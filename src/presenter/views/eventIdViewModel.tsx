//src/presenter/views/eventIdViewModel.tsx
import { useQuery } from '@tanstack/react-query';
import { EventService } from '../../infrastructure/services/eventService';
import { UserUseCase } from '../../application/useCases/user.usecase';
import { GetEventsUseCase } from '../../application/useCases/getEvents.usecase';

export const eventIdViewModel = ({ getEventsUseCase, userUseCase, eventService }: { getEventsUseCase: GetEventsUseCase, userUseCase: UserUseCase, eventService: EventService }) => {
  return (id: number) => {

    //// TS CALL USER CONNECTED 
    const { data: user, isLoading: loadingUser } = useQuery({
      queryKey: ['userMe'],
      queryFn: async () => await userUseCase.getUserMe()
    })

    //// TS CALL EVENT BY ID
    const { data: eventByIdData, isLoading: loadingEvent, error: errorEvent } = useQuery({
      queryKey: ['eventById', id],
      queryFn: async () => await getEventsUseCase.executeById(id),
    })

    //// USING SERVICE
    const userId = loadingUser ? 0 : user.id
    const event = eventByIdData ? eventService.getInfosInEvent(eventByIdData, userId) : {} as Event;

    //// RETURN FORMATTED DATA
    return { event, loadingEvent, errorEvent }
  }

}