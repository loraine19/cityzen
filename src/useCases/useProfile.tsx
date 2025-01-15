import { useState, useCallback } from 'react';
import { Profile, ProfileDTO } from '../domain/entities/Profile';
import { ProfileRepositoryImpl } from '../infrastructure/repositoriesImpl/ProfileRespositoryImpl';
import { ProfileApi } from '../infrastructure/api/profileApi';

export const useProfile = () => {
    const service = new ProfileRepositoryImpl(new ProfileApi());
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [errorProfile, setErrorProfile] = useState<string | null>(null);
    const labelEntity: string = 'profil';

    const getProfile = useCallback(async () => {
        try {
            setLoadingProfile(true);
            const result = await service.getProfileMe();
            setProfile(result);
        } catch (error) {
            setErrorProfile(`Erreur lors de chargement du '${labelEntity}': ${error}`);
        } finally {
            setLoadingProfile(false);
        }
    }, [service]);

    const updateProfile = useCallback(async (data: ProfileDTO) => {
        try {
            setLoadingProfile(true);
            const result = await service.updateProfile(data);
            setProfile(result);
        } catch (error) {
            setErrorProfile(`Erreur lors de chargement du ${labelEntity}: ${error}`);
        } finally {
            setLoadingProfile(false);
        }
    }, [service]);

    const deleteProfile = useCallback(async (id: number) => {
        try {
            setLoadingProfile(true);
            await service.deleteProfile(id);
            setProfile(null);
        } catch (error) {
            setErrorProfile(`Erreur lors de la suppression du ${labelEntity}: ${error}`);
        } finally {
            setLoadingProfile(false);
        }
    }, [service]);


    return { getProfile, profile, updateProfile, deleteProfile, loadingProfile, errorProfile };
};
