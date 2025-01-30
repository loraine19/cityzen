import { useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'

export const profileMeViewModel = () => {
    return () => {
        const getProfileMe = DI.resolve('getProfileMeUseCase')
        const { data: profileMe, error: errorProfileMe, isLoading: loadingProfileMe } = useQuery({
            queryKey: ['profileMe'],
            queryFn: async () => await getProfileMe.execute()
        })
        return { profileMe, errorProfileMe, loadingProfileMe };
    };
}
