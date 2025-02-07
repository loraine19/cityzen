import { useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { ProfileView } from './viewsEntities/profileViewEntity';


export const profileMeViewModel = () => {
    return () => {
        const getProfileMe = DI.resolve('getProfileMeUseCase')
        const { data, error: errorProfileMe, isLoading: loadingProfileMe } = useQuery({
            queryKey: ['profileMe'],
            queryFn: async () => await getProfileMe.execute()
        })

        const myProfile = new ProfileView(data)
        return { myProfile, errorProfileMe, loadingProfileMe };
    };
}
