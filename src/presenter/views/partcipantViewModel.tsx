import { useQuery } from '@tanstack/react-query';
import { ParticipantUseCase } from '../../application/useCases/participantCase.ts/participants.useCase';

export const participantViewModel = ({ participantUseCase }: { participantUseCase: ParticipantUseCase }) => {

    //// Get all events and add infos
    const { data: participants, isLoading, error } = useQuery({
        queryKey: ['participants'],
        queryFn: async () => await participantUseCase.executeGetParticipants(),
    });


    return {
        isLoading,
        error,
        participants
    };
};