import { useState } from "react";
import { Profile } from "../entities/Profile";
import { ProfileService } from "../../data/repositories/ProfileRepository";

export const useProfile = () => {
    const profileService = new ProfileService();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (newProfile: Profile) => {
        setLoading(true);
        try {
            const res = await profileService.patchProfile(newProfile);
            setProfile(res);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    const getProfileById = async (id: number) => {
        setLoading(true);
        try {
            const res = await profileService.getProfileById(id);
            setProfile(res);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    return { profile, updateProfile, getProfileById, loading, error }
}