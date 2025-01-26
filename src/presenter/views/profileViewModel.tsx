import { useQuery } from '@tanstack/react-query';
import { ProfileUseCase } from '../../application/useCases/profile.useCase';



export const profileMeViewModel = ({ profileUseCase }: { profileUseCase: ProfileUseCase }) => {
    return () => {
        //// TS CALL PROFILE ME
        const { data: profileMe, error: errorProfileMe, isLoading: loadingProfileMe } = useQuery({
            queryKey: ['profileMe'],
            queryFn: async () => await profileUseCase.getProfileMe()
        })
        return { profileMe, errorProfileMe, loadingProfileMe };
    };
}
