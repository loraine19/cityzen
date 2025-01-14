import { useState, useCallback } from 'react';
import { ProfileService } from '../repositories/ProfileRepository';
import { Profile } from '../entities/Profile';
import { handleError } from './useCaseUtils';

export const useProfile = (): UseProfileReturn => {
    const profileService = new ProfileService();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [errorProfile, setErrorProfile] = useState<string | null>(null);
    const labelEntity: string = 'profil';

    const getProfile = useCallback(async () => {
        setLoadingProfile(true);
        try {
            const res = await profileService.getProfileMe();
            setProfile(res);
        }
        catch (error) { handleError(error, `lors de chargement du ${labelEntity}s`, setErrorProfile) }
        finally { setLoadingProfile(false) }
    }, [profileService]);

    const updateProfile = useCallback(async (newProfile: Profile) => {
        setLoadingProfile(true);
        try {
            const res = await profileService.patchProfile(newProfile);
            setProfile(res);
        }
        catch (error) { handleError(error, `lors de la mise à jour du ${labelEntity}`, setErrorProfile) }
        finally { setLoadingProfile(false); }
    }, [profileService]);

    const deleteProfile = useCallback(async (profileId: number) => {
        setLoadingProfile(true);
        try {
            await profileService.deleteProfile(profileId)
        }
        catch (error) { handleError(error, `lors de la suppression du ${labelEntity}`, setErrorProfile) }
        finally { setLoadingProfile(false); }
    }, [profileService]);

    return { getProfile, profile, updateProfile, deleteProfile, loadingProfile, errorProfile };
};

interface UseProfileReturn {
    profile: Profile | null;
    updateProfile: (newProfile: Profile) => Promise<void>;
    getProfile: () => Promise<void>;
    deleteProfile: (profileId: number) => Promise<void>;
    loadingProfile: boolean;
    errorProfile: string | null;
}