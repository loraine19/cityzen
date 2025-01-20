import { useMutation, useQuery } from '@tanstack/react-query';
import { ProfileUseCase } from '../../application/useCases/profile.useCase';
import { ProfileDTO } from '../../domain/entities/Profile';


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

export const postProfileViewModel = ({ profileUseCase }: { profileUseCase: ProfileUseCase }) => {
    return () => {
        //// TS MUTATION
        const { data: profile, error: errorProfile, isSuccess: successProfile, mutateAsync: postProfile } = useMutation({
            mutationKey: ['postProfile'],
            mutationFn: async (data: ProfileDTO) => await profileUseCase.postProfile(data)
        })
        return { profile, errorProfile, successProfile, postProfile };
    };
}


export const updateProfileViewModel = ({ profileUseCase }: { profileUseCase: ProfileUseCase }) => {
    return () => {
        //// TS MUTATION
        const { data: profile, error: errorProfile, isSuccess: successProfile, mutateAsync: updateProfile } = useMutation({
            mutationKey: ['postProfile'],
            mutationFn: async (data: ProfileDTO) => await profileUseCase.updateProfile(data)
        })
        return { profile, errorProfile, successProfile, updateProfile };
    };
}