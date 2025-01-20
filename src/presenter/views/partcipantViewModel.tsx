import { useQuery } from '@tanstack/react-query';
import { ParticipantUseCase } from '../../application/useCases/participants.useCase';

export const participantViewModel = ({ participantUseCase }: { participantUseCase: ParticipantUseCase }) => {

    //// TS CALL 
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