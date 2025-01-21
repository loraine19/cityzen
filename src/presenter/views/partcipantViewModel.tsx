import { useQuery } from '@tanstack/react-query';
import { ParticipantUseCase } from '../../application/useCases/participants.useCase';
import { ParticipantDTO } from '../../domain/entities/Participant';

export const participantViewModel = ({ participantUseCase }: { participantUseCase: ParticipantUseCase }) => {

    //// TS CALL 
    console.log('participantViewModel')
    const { data: participants, isLoading, error } = useQuery({
        queryKey: ['participants'],
        queryFn: async () => await participantUseCase.getParticipants(),
    });

    return {
        isLoading,
        error,
        participants
    }

};

export const participantPostViewModel = ({ participantUseCase }: { participantUseCase: ParticipantUseCase }) => {
    return async (data: ParticipantDTO) => {
        return await participantUseCase.postParticipant(data)
    }
}

export const participantDeleteViewModel = ({ participantUseCase }: { participantUseCase: ParticipantUseCase }) => {
    return async (id: number) => {
        await participantUseCase.deleteParticipant(id)
    }
}
